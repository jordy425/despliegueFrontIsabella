import { useMemo, useState } from "react";
import { loginValidate, create } from "../../../config/Api/api";
import { ErrorValidate } from "../../../components/Alerts/error.alert";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode"

const LoginForm = () => {
   const [formData, setFormData] = useState({
      documento: "",
      password: "",
      forgotPassword: "",
      newPassword: ""
   });


   const [errorBD, setErrorBD] = useState({
      error: "",
      label: "",
      status: true,
   });

   const [recoveryPassword, setRecoveryPassword] = useState(false);
   const [showRecoveryInputs, setShowRecoveryInputs] = useState(false);

   const [validations, setValidations] = useState({
      vDocumento: {
         valid: 0,
         msg: "",
      },
      vPassword: {
         valid: 0,
         msg: "",
      },
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if ((!showRecoveryInputs ? formData.documento : formData.forgotPassword) === "" || (!showRecoveryInputs ? formData.password : formData.newPassword) === "") {
         const errorChanges = { ...validations };
         if ((!showRecoveryInputs ? formData.documento : formData.forgotPassword) === "") {
            errorChanges.vDocumento.msg = "El DOCUMENTO no debe ir vacío";
            errorChanges.vDocumento.valid = 2;
         } else {
            errorChanges.vDocumento.msg = "";
            errorChanges.vDocumento.valid = 1;
         }
         if ((!showRecoveryInputs ? formData.password : formData.newPassword) === "") {
            errorChanges.vPassword.msg = "La CONTRASEÑA no debe ir vacía";
            errorChanges.vPassword.valid = 2;
         } else {
            errorChanges.vPassword.msg = "";
            errorChanges.vPassword.valid = 1;
         }
         setValidations(errorChanges);
      } else {
         try {
            loginValidate({
               documento: formData.documento,
               password: formData.password
            })
               .then((auth) => {
                  if (auth.status === false) {
                     console.log(auth);
                     const errorChanges = { ...validations };
                     if (auth.label === (!showRecoveryInputs ? "documento" : "forgotPassword")) {
                        errorChanges.vDocumento.msg = `${auth.error}`;
                        errorChanges.vDocumento.valid = 2;
                        errorChanges.vPassword.msg = "";
                        errorChanges.vPassword.valid = 0;
                        setFormData({
                           ...formData,
                           password: "",
                        });
                     }
                     if (auth.label === (!showRecoveryInputs ? "password" : "newPassword")) {
                        errorChanges.vDocumento.msg = "";
                        errorChanges.vDocumento.valid = 1;
                        errorChanges.vPassword.msg = `${auth.error}`;
                        errorChanges.vPassword.valid = 2;
                        setFormData({
                           ...formData,
                           password: "",
                        });
                     }
                     setValidations(errorChanges);
                     return setErrorBD(auth);
                  } else {
                     localStorage.setItem("tokenJWT", auth.token);

                     const decodeToken = jwt_decode(auth.token);
                     const tokenExpired = decodeToken.exp;

                     localStorage.setItem("tokenExpired", JSON.stringify(tokenExpired))
                     window.location.href = "/";
                  }
               })
               .catch((auth) => console.log(auth));
         } catch (error) {
            console.log(error);
         }
      }
   };

   const GetCodeRecoveryPassword = async () => {
      const { documento } = formData

      try {
         console.log("probando ", documento)
         const { message } = await create("acceso/recuperar", { documento });
         console.log("es correcto ", message)
         //alerta
         if (message.includes("Código")) {

            await Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Correo enviado con éxito',
               showConfirmButton: false,
               timer: 1500
            })

            setShowRecoveryInputs(true)
            setFormData({ forgotPassword: "" })
         } else if (message.includes("no")) {
            await Swal.fire({
               position: 'center',
               icon: 'error',
               title: message,
               showConfirmButton: false,
               timer: 2500
            })

         }

      } catch (error) {
         console.log("este es el error ", error);
         await Swal.fire({
            position: 'center',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 2500
         })

      }

   };

   const updatePassword = async () => {

      try {
         console.log("probando ")
         const { message } = await create("acceso/reestablecer", {

            forgotPassword: formData.forgotPassword,
            newPassword: formData.newPassword


         });
         console.log("reestablecer ", message)
         //alerta
         if (message.includes("actualizada")) {

            await Swal.fire({
               position: 'center',
               icon: 'success',
               title: message,
               showConfirmButton: false,
               timer: 1500
            })

            setShowRecoveryInputs(true)
            window.location.reload()
         } else if (message.includes("no")) {
            await Swal.fire({
               position: 'center',
               icon: 'error',
               title: message,
               showConfirmButton: false,
               timer: 2500
            })

         }

      } catch (error) {
         console.log("este es el error ", error);
         await Swal.fire({
            position: 'center',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500
         })
      }
   }
      ;


   const afterFocus = (name, value) => {
      const errorChanges = { ...validations };
      if (name === (!showRecoveryInputs ? "documento" : "forgotPassword")) {
         if (value === "") {
            errorChanges.vDocumento.msg = ` El ${!showRecoveryInputs ? "Documento" : "Código"} no debe de ir vacío`;
            errorChanges.vDocumento.valid = 2;
         } else if (value.length < 7 || value.length > 12) {
            errorChanges.vDocumento.msg = "Debes escribir min-7 / max-12 dígitos";
            errorChanges.vDocumento.valid = 2;
         } else {
            errorChanges.vDocumento.msg = "";
            errorChanges.vDocumento.valid = 1;
         }
      }
      if (name === (!showRecoveryInputs ? "password" : "newPassword")) {
         if (value === "") {
            errorChanges.vPassword.msg = "La Contraseña no debe ir vacía";
            errorChanges.vPassword.valid = 2;
         } else if (value.length < 7) {
            errorChanges.vPassword.msg = "Debes escribir min-7 dígitos";
            errorChanges.vPassword.valid = 2;
         } else {
            errorChanges.vPassword.msg = "";
            errorChanges.vPassword.valid = 1;
         }
      }
      setValidations(errorChanges);
   };

   const validated = useMemo(() => {
      return validations;
   }, [validations]);

   const alertLogin = useMemo(() => {
      return errorBD;
   }, [errorBD]);

   return (
      <>
         {alertLogin.error !== "" ? (
            <ErrorValidate message={alertLogin.error} />
         ) : null}
         {alertLogin.error !== "" &&
            setTimeout(() => {
               setErrorBD({
                  error: "",
                  label: "",
                  status: true,
               });
            }, 1000)}
         <form onSubmit={handleSubmit} className="w-full form-floating">
            <h1
               className="font-semibold py-2 px-1"
               style={{ letterSpacing: "1px" }}
            >
               {!showRecoveryInputs ? "Inicie sesión" : "Recuperar Contraseña"}

            </h1>
            <div className="form-group">
               <input
                  type={!showRecoveryInputs ? "number" : "text"}
                  value={!showRecoveryInputs ? formData.documento : formData.forgotPassword}
                  name={!showRecoveryInputs ? "documento" : "forgotPassword"}
                  id={!showRecoveryInputs ? "documento" : "forgotPassword"}
                  onChange={handleChange}
                  onBlur={(e) => afterFocus(e.target.name, e.target.value)}
                  placeholder={!showRecoveryInputs ? "Documento" : "Código:"}
                  className={`form-control ${validated.vDocumento.valid === 2 && "is-invalid"
                     } ${validated.vDocumento.valid === 1 && "is-valid"}`}
               />
               {validated.vDocumento.msg !== "" && (
                  <span className="text-xs text-red-600">
                     {validated.vDocumento.msg}
                  </span>
               )}
            </div>
            {!recoveryPassword && (
               <div className="form-group">
                  <input
                     type="password"
                     value={formData.password}
                     name="password"
                     id="password"
                     onChange={handleChange}
                     onBlur={(e) => afterFocus(e.target.name, e.target.value)}
                     placeholder="Contraseña:"
                     className={`form-control ${validated.vPassword.valid === 2 && "is-invalid"
                        } ${validated.vPassword.valid === 1 && "is-valid"}`}
                  />
                  {validated.vPassword.msg !== "" && (
                     <span className="text-xs text-red-600">
                        {validated.vPassword.msg}
                     </span>
                  )}
               </div>
            )}


            {showRecoveryInputs && (
               <div>
                  <div className="form-group">
                     <input
                        type="password"
                        value={formData.newPassword}
                        name="newPassword"
                        id="newPassword"
                        onChange={handleChange}
                        onBlur={(e) => afterFocus(e.target.name, e.target.value)}
                        placeholder="Nueva Contraseña:"
                        className={`form-control ${validated.vPassword.valid === 2 && "is-invalid"
                           } ${validated.vPassword.valid === 1 && "is-valid"}`}
                     />
                     {validated.vPassword.msg !== "" && (
                        <span className="text-xs text-red-600">
                           {validated.vPassword.msg}
                        </span>
                     )}
                  </div>
               </div>


            )}




            <div className="form-group">
               {
                  !recoveryPassword && (
                     <button type="submit" className="btn btn-success bg-success w-full" >

                        Iniciar Sesión
                     </button>
                  )
               }

               {
                  recoveryPassword && (
                     <button type="button" className="btn btn-success bg-success w-full" onClick={!showRecoveryInputs ? GetCodeRecoveryPassword : updatePassword}>
                        Confirmar
                     </button>
                  )
               }
               <div
                  className="w-full flex mt-2 justify-center"
                  onClick={() => {
                     setRecoveryPassword((estadoAnterior) => !estadoAnterior);
                  }}
               >
                  <a className="text-sm text-muted" >
                     {!recoveryPassword ? '¿Olvidaste tu contraseña?' : 'Volver al Inicio'}
                  </a>
               </div>
            </div>
         </form>
      </>
   );


};

export { LoginForm };



// import { useMemo, useState } from "react"
// import { loginValidate } from "../../../config/Api/api"
// import { ErrorValidate } from "../../../components/Alerts/error.alert"
// import jwt_decode from "jwt-decode";

// const LoginForm = () => {
//    const [formData, setFormData] = useState({
//       documento: "",
//       password: "",
//    })
//    const [errorBD, setErrorBD] = useState({
//       error: "",
//       label: "",
//       status: true,
//    })
//    const [validations, setValidations] = useState({
//       vDocumento: {
//          valid: 0,
//          msg: "",
//       },
//       vPassword: {
//          valid: 0,
//          msg: "",
//       }
//    })

//    const handleChange = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//    }

//    const handleSubmit = (e) => {
//       e.preventDefault()
//       if (formData.documento === "" || formData.password === "") {
//          const errorChanges = { ...validations }
//          if (formData.documento === "") {
//             errorChanges.vDocumento.msg = "El DOCUMENTO no debe ir vacío"
//             errorChanges.vDocumento.valid = 2
//          } else {
//             errorChanges.vDocumento.msg = ""
//             errorChanges.vDocumento.valid = 1
//          }
//          if (formData.password === "") {
//             errorChanges.vPassword.msg = "La CONTRASEÑA no debe ir vacía"
//             errorChanges.vPassword.valid = 2
//          } else {
//             errorChanges.vPassword.msg = ""
//             errorChanges.vPassword.valid = 1
//          }
//          setValidations(errorChanges)
//       } else {
//          try {
//             loginValidate(formData)
//                .then(auth => {
//                   if (auth.status === false) {
//                      console.log(auth)
//                      const errorChanges = { ...validations }
//                      if (auth.label === "documento") {
//                         errorChanges.vDocumento.msg = `${auth.error}`
//                         errorChanges.vDocumento.valid = 2
//                         errorChanges.vPassword.msg = ""
//                         errorChanges.vPassword.valid = 0
//                         setFormData({
//                            ...formData,
//                            password: "",
//                         })
//                      }
//                      if (auth.label === "password") {
//                         errorChanges.vDocumento.msg = ""
//                         errorChanges.vDocumento.valid = 1
//                         errorChanges.vPassword.msg = `${auth.error}`
//                         errorChanges.vPassword.valid = 2
//                         setFormData({
//                            ...formData,
//                            password: ""
//                         })
//                      }
//                      setValidations(errorChanges)
//                      return setErrorBD(auth)
//                   } else {
//                      localStorage.setItem("tokenJWT", auth.token);
//                      const decodeToken = jwt_decode(auth.token);
//                      const tokenExpired = decodeToken.exp;

//                      localStorage.setItem("tokenExpired", JSON.stringify(tokenExpired))
//                      window.location.href = "/"
//                   }
//                })
//                .catch(auth => console.log(auth))
//          } catch (error) {
//             console.log(error)
//          }
//       }
//    }

//    const afterFocus = (name, value) => {
//       const errorChanges = { ...validations }
//       if (name === "documento") {
//          if (value === "") {
//             errorChanges.vDocumento.msg = "El DOCUMENTO no debe ir vacío"
//             errorChanges.vDocumento.valid = 2
//          } else if (value.length < 7 || value.length > 12) {
//             errorChanges.vDocumento.msg = "Debes escribir min-7 / max-12 dígitos"
//             errorChanges.vDocumento.valid = 2
//          } else {
//             errorChanges.vDocumento.msg = ""
//             errorChanges.vDocumento.valid = 1
//          }
//       }
//       if (name === "password") {
//          if (value === "") {
//             errorChanges.vPassword.msg = "La CONTRASEÑA no debe ir vacía"
//             errorChanges.vPassword.valid = 2
//          } else if (value.length < 7) {
//             errorChanges.vPassword.msg = "Debes escribir min-7 dígitos"
//             errorChanges.vPassword.valid = 2
//          } else {
//             errorChanges.vPassword.msg = ""
//             errorChanges.vPassword.valid = 1
//          }
//       }
//       setValidations(errorChanges)
//    }

//    const validated = useMemo(() => {
//       return validations
//    }, [validations])

//    const alertLogin = useMemo(() => {
//       return errorBD
//    }, [errorBD])

//    return (
//       <>
//          {alertLogin.error !== "" ? (
//             <ErrorValidate message={alertLogin.error} />
//          ) : null}
//          {alertLogin.error !== "" && (
//             setTimeout(() => {
//                setErrorBD({
//                   error: "",
//                   label: "",
//                   status: true,
//                })
//             }, 1000)
//          )}
//          <form onSubmit={handleSubmit} className="w-full form-floating">
//             <h1 className="font-semibold py-2 px-1" style={{ letterSpacing: '1px' }}>Inicie sesión</h1>
//             <div className="form-group">
//                <input type="number" value={formData.documento} name="documento" id="documento" onChange={handleChange} onBlur={(e) => afterFocus(e.target.name, e.target.value)} placeholder="Documento:" className={`form-control ${validated.vDocumento.valid === 2 && 'is-invalid'} ${validated.vDocumento.valid === 1 && 'is-valid'}`} />
//                {validated.vDocumento.msg !== "" && (
//                   <span className="text-xs text-red-600">{validated.vDocumento.msg}</span>
//                )}
//             </div>
//             <div className="form-group">
//                <input type="password" value={formData.password} name="password" id="password" onChange={handleChange} onBlur={(e) => afterFocus(e.target.name, e.target.value)} placeholder="Contraseña:" className={`form-control ${validated.vPassword.valid === 2 && 'is-invalid'} ${validated.vPassword.valid === 1 && 'is-valid'}`} />
//                {validated.vPassword.msg !== "" && (
//                   <span className="text-xs text-red-600">{validated.vPassword.msg}</span>
//                )}
//             </div>
//             <div className="form-group">
//                <button type="submit" className="btn btn-success bg-success w-full">Iniciar Sesión</button>
//                <div className="w-full flex mt-2 justify-center">
//                   <a className="text-sm text-muted" href="/">¿Olvidaste tu contraseña?</a>
//                </div>
//             </div>
//          </form>
//       </>
//    )
// }

// const RecoverPassword = () => {

// }

// export {
//    LoginForm,
//    RecoverPassword
// }