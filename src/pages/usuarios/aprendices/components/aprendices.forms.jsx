import React, { Fragment, useState, useEffect } from "react";
import { create, get, update } from "../../../../config/Api/api";
import Swal from "sweetalert2";

const CreateAprendiz = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      documento: "",
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      tipoDocumentoAprendiz: "",
      rolAprendiz: "6",
      fichaAprendiz: "",
   });

   const [errors, setErrors] = useState({
      documento: false,
      nombre: false,
      apellidos: false,
      email: false,
      telefono: false,
      tipoDocumentoAprendiz: false,
      fichaAprendiz: false,
   });


   const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      let newErrors = { ...errors };

      if (value.trim() === "") {
         newErrors[name] = "Campo requerido";
      } else {
         newErrors[name] = false;
      }

      if (name === "documento") {
         if (!/^\d{7,13}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-13 dígitos)";
         } else {
            const aprendices = await get("aprendices");

            console.log(aprendices);

            console.log(value);

            if (aprendices.some(aprendiz => aprendiz.documento == value)) {
               newErrors[name] = "El documento ya está registrado";
            }
         }
      }
      if (name === "nombre" || name === "apellidos") {
         if (/^\d+$/.test(value)) {
            newErrors[name] = "No se permiten números";
         }
      }

      if (name === "email") {
         if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors[name] = "Ingrese un correo válido";
         } else {
            const emails = await get("aprendices");
            if (emails.some(aprendiz => aprendiz.email == value)) {
               newErrors[name] = "El correo ya está registrado";
            }
         }
      }

      setErrors(newErrors);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const hasErrors = Object.values(errors).some((error) => error);
      if (hasErrors) {
         console.log("Existen errores en el formulario.");
         return;
      } else {
         try {
            const data = await create("aprendices", formData);
            await Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Registro exitoso',
               showConfirmButton: false,
               timer: 1500
             })
             cancelForm();
            others.reloadData();
            console.log(data);
            //window.location.reload()
         } catch (error) {
            console.log(error);
         }

      }

   };

   const cancelForm = () => {
      setFormData({
         documento: "",
         nombre: "",
         apellidos: "",
         email: "",
         telefono: "",
         tipoDocumentoAprendiz: "",
         rolAprendiz: "6",
         fichaAprendiz: "",
      });
      setErrors({
         documento: false,
         nombre: false,
         apellidos: false,
         email: false,
         telefono: false,
         tipoDocumentoAprendiz: false,
         fichaAprendiz: false,
      });
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div className="col-12">
               <div className="row justify-content-between">
               <div className="form-group col-md-4">
                  <label htmlFor="tipoDocumentoAprendiz">
                     Tipo Documento: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                     value={formData.tipoDocumentoAprendiz}
                     onChange={handleChange}
                     name="tipoDocumentoAprendiz"
                     id="tipoDocumentoAprendiz"
                     className={`form-control ${errors.tipoDocumentoAprendiz ? "is-invalid" : ""}`}
                     required
                  >
                     <option value="">Seleccionar</option>
                     {claves.tipoDoc.map((i) => (
                        <option key={i.idTipoDocumento} value={i.idTipoDocumento}>
                           {i.nombreTipoDocumento}
                        </option>
                     ))}
                  </select>
                  {errors.tipoDocumentoAprendiz && (
                     <span className="invalid-feedback">{errors.tipoDocumentoAprendiz}</span>
                  )}
               </div>
               <div className="form-group col-4">
                  <label htmlFor="documento">
                     Documento: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.documento}
                     onChange={handleChange}
                     name="documento"
                     type="number"
                     className={`form-control ${errors.documento ? "is-invalid" : ""}`}
                     id="documento"
                     required
                  />
                  {errors.documento && <span className="invalid-feedback">{errors.documento}</span>}
               </div>
               <div className="form-group col-4">
                  <label htmlFor="fichaAprendiz">
                     Ficha: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                     value={formData.fichaAprendiz}
                     onChange={handleChange}
                     name="fichaAprendiz"
                     id="fichaAprendiz"
                     className={`form-control ${errors.fichaAprendiz ? "is-invalid" : ""}`}
                     required
                  >
                     <option value="">Seleccionar Ficha</option>
                     {claves.fichas.map((i) => (
                        <option key={i.idFicha} value={i.idFicha}>
                           {i.codigoFicha} - {i.programaFicha.nombrePF}
                        </option>
                     ))}
                  </select>
                  {errors.fichaAprendiz && (
                     <span className="invalid-feedback">{errors.fichaAprendiz}</span>
                  )}
               </div>
            </div>
            <div className="form-row">
               <div className="form-group col-md-6">
                  <label htmlFor="nombre">
                     Nombre: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.nombre}
                     onChange={handleChange}
                     name="nombre"
                     type="text"
                     className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                     id="nombre"
                     required
                  />
                  {errors.nombre && <span className="invalid-feedback">{errors.nombre}</span>}
               </div>
               <div className="form-group col-md-6">
                  <label htmlFor="apellidos">
                     Apellidos: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.apellidos}
                     onChange={handleChange}
                     name="apellidos"
                     type="text"
                     className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                     id="apellidos"
                     required
                  />
                  {errors.apellidos && <span className="invalid-feedback">{errors.apellidos}</span>}
               </div>
            </div>
            <div className="form-row">
               <div className="form-group col-md-6">
                  <label htmlFor="telefono">
                     Teléfono: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.telefono}
                     onChange={handleChange}
                     name="telefono"
                     type="number"
                     className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                     id="telefono"
                     required
                  />
                  {errors.telefono && <span className="invalid-feedback">{errors.telefono}</span>}
               </div>
               <div className="form-group col-md-6">
                  <label htmlFor="email">
                     Correo: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.email}
                     onChange={handleChange}
                     name="email"
                     type="text"
                     className={`form-control ${errors.email ? "is-invalid" : ""}`}
                     id="email"
                     required
                  />
                  {errors.email && <span className="invalid-feedback">{errors.email}</span>}
               </div>
            </div>
            <div className="col d-flex justify-content-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" onClick={cancelForm} data-dismiss="modal">
                  Cancelar
               </button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" 
               className="smc-success rounded p-2">Crear</button>
            </div>
            </div>
         </form>
      </Fragment>
   )
}


const UpdateAprendiz = ({ aprendiz, claves, others }) => {
   const [formData, setFormData] = useState({
     documento: aprendiz.documento,
     nombre: aprendiz.nombre,
     apellidos: aprendiz.apellidos,
     email: aprendiz.email,
     telefono: aprendiz.telefono,
     tipoDocumentoAprendiz: aprendiz.tipoDocumentoAprendiz.idTipoDocumento,
     fichaAprendiz : aprendiz.fichaAprendiz.idFicha
     
   });

 
   const [errors, setErrors] = useState({
      documento: "",
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      tipoDocumentoAprendiz: "",
      fichaAprendiz : ""
   });
   const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      let newErrors = { ...errors };

      if (value.trim() === "") {
         newErrors[name] = "Campo requerido";
      } else {
         newErrors[name] = false;
      }

      if (name === "documento") {
         if (!/^\d{7,13}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-13 dígitos)";
         } else {
            const aprendices = await get("aprendices");

            if (aprendices.some(aprendiz => aprendiz.documento == value)) {
               newErrors[name] = "El documento ya está registrado";
            }
         }
      }

      if (name === "nombre" || name === "apellidos") {
         if (/^\d+$/.test(value)) {
            newErrors[name] = "No se permiten números";
         }
      }

      if (name === "email") {
         if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors[name] = "Ingrese un correo válido";
         } else {
            const emails = await get("aprendices");
            if (emails.some(aprendiz => aprendiz.email == value)) {
               newErrors[name] = "El correo ya está registrado";
            }
         }
      }

      if (name === "telefono") {
         if (!/^\d{7,10}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-10 dígitos)";
         }
      }

      setErrors(newErrors);
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      let newErrors = { ...errors };

      // Validaciones
      if (formData.documento.trim() === "") {
         newErrors.documento = "Campo requerido";
      } else if (!/^\d{7,13}$/.test(formData.documento)) {
         newErrors.documento = "Ingrese un número válido (7-13 dígitos)";
      } 

      if (formData.nombre.trim() === "") {
         newErrors.nombre = "Campo requerido";
      } else if (/^\d+$/.test(formData.nombre)) {
         newErrors.nombre = "No se permiten números";
      }

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
         console.log("Existen errores en el formulario.");
         return;
      }

      try {
         const data = await update(`aprendices/${aprendiz.idAprendiz}`, formData);
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Actualización exitosa",
            showConfirmButton: false,
            timer: 1500,
          });
          others.reloadData();
         console.log(data);
        // window.location.reload();
      } catch (error) {
         console.log(error);
      }
   };


   const cancelForm = () => {
      setFormData({
         documento: aprendiz.documento,
         nombre: aprendiz.nombre,
         apellidos: aprendiz.apellidos,
         email: aprendiz.email,
         telefono: aprendiz.telefono,
         tipoDocumentoAprendiz: aprendiz.tipoDocumentoAprendiz.idTipoDocumento,
         fichaAprendiz : aprendiz.fichaAprendiz.idFicha
      });

      setErrors({
         documento: "",
         nombre: "",
         apellidos: "",
         email: "",
         telefono: "",
         tipoDocumentoAprendiz: "",
         fichaAprendiz : ""
      });
   };

 
   return (
     <Fragment>
         {/* //{console.log("holaaaaaaaaaaa", aprendiz)} */}
       <div className="modal-body">
       <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="documento">Documento:</label>
                        <input
                           value={formData.documento}
                           onChange={handleChange}
                           name="documento"
                           type="number"
                           className={`form-control ${errors.documento ? "is-invalid" : ""}`}
                           id="documento"
                           required
                        />
                        {errors.documento && <span className="invalid-feedback">{errors.documento}</span>}
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="tipoDocumentoAprendiz">Tipo Documento:</label>
                        <select
                           value={formData.tipoDocumentoAprendiz}
                           onChange={handleChange}
                           name="tipoDocumentoAprendiz"
                           id="tipoDocumentoAprendiz"
                           className={`form-control ${errors.tipoDocumentoAprendiz ? "is-invalid" : ""}`}
                           required
                        >
                           <option value="">Seleccionar</option>
                           {claves.tipoDoc.map((i) => (
                              <option key={i.idTipoDocumento} value={i.idTipoDocumento}>
                                 {i.nombreTipoDocumento}
                              </option>
                           ))}
                        </select>
                        {errors.tipoDocumentoAprendiz && <span className="invalid-feedback">{errors.tipoDocumentoAprendiz}</span>}
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="fichaAprendiz">Ficha:</label>
                        <select
                           value={formData.fichaAprendiz}
                           onChange={handleChange}
                           name="fichaAprendiz"
                           id="fichaAprendiz"
                           className={`form-control ${errors.fichaAprendiz ? "is-invalid" : ""}`}
                           required
                        >
                           <option>Seleccionar ficha</option>
                           {claves.fichas.map((i) => (
                              <option key={i.idFicha} value={i.idFicha}>
                                 {i.codigoFicha} - {i.programaFicha.nombrePF}
                              </option>
                           ))}
                        </select>
                        {errors.fichaAprendiz && <span className="invalid-feedback">{errors.fichaAprendiz}</span>}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                           value={formData.nombre}
                           onChange={handleChange}
                           name="nombre"
                           type="text"
                           className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                           id="nombre"
                           required
                        />
                        {errors.nombre && <span className="invalid-feedback">{errors.nombre}</span>}
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                           value={formData.apellidos}
                           onChange={handleChange}
                           name="apellidos"
                           type="text"
                           className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                           id="apellidos"
                           required
                        />
                        {errors.apellidos && <span className="invalid-feedback">{errors.apellidos}</span>}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="email">Correo:</label>
                        <input
                           value={formData.email}
                           onChange={handleChange}
                           name="email"
                           type="text"
                           className={`form-control ${errors.email ? "is-invalid" : ""}`}
                           id="email"
                           required
                        />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="telefono">Telefono:</label>
                        <input
                           value={formData.telefono}
                           onChange={handleChange}
                           name="telefono"
                           type="number"
                           className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                           id="telefono"
                           required
                        />
                        {errors.telefono && <span className="invalid-feedback">{errors.telefono}</span>}
                     </div>
                  </div>
               </div>
               <div className="col d-flex justify-content-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm} >
                  Cancelar
               </button>
               <button 
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="smc-success rounded p-2">
                  Crear
            </button>
               </div>
            </form>
       </div>
     </Fragment>
   );
 };

 const ConsultarAprendiz = ({ aprendiz }) => {
   return (
     <Fragment>
       <div className="container">
         <div className="row">
           <div className="col-md-4">
             <div className="form-group">
               <label htmlFor="documento">Documento:</label>
               <p className="font-bold">{aprendiz.documento}</p>
             </div>
           </div>
           <div className="col-md-4">
             <div className="form-group">
               <label htmlFor="tipoDocumentoAprendiz">Tipo de Documento:</label>
               <p className="font-bold">{aprendiz.tipoDocumentoAprendiz.nombreTipoDocumento}</p>
             </div>
           </div>
           <div className="col-md-4">
             <div className="form-group">
               <label htmlFor="fichaAprendiz">Ficha:</label>
               <p className="font-bold">{aprendiz.fichaAprendiz.codigoFicha}</p>
             </div>
           </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <div className="form-group">
               <label htmlFor="nombre">Nombre:</label>
               <p className="font-bold">{aprendiz.nombre}</p>
             </div>
           </div>
           <div className="col-md-6">
             <div className="form-group">
               <label htmlFor="apellidos">Apellidos:</label>
               <p className="font-bold">{aprendiz.apellidos}</p>
             </div>
           </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <div className="form-group">
               <label htmlFor="email">Correo Electrónico:</label>
               <p className="font-bold">{aprendiz.email}</p>
             </div>
           </div>
           <div className="col-md-6">
             <div className="form-group">
               <label htmlFor="telefono">Teléfono:</label>
               <p className="font-bold">{aprendiz.telefono}</p>
             </div>
           </div>
         </div>
       </div>
     </Fragment>
   );
 };

 const ConvertirB64Modal = ({ others }) => {
   const [files, setFiles] = useState([]);

   const handleFileChange = (e) => {
      const selectedFiles = e.target.files;
      setFiles(selectedFiles);
   };

   const mostrarError = ({ message }) => {
      Swal.fire({
         position: 'top-end',
         icon: 'error',
         title: 'ERROR',
         text: `${message}`,
         showConfirmButton: false,
         timer: 1500
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         let hasData = false; // Variable para verificar si se encontró información en algún campo
         for (const file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = async function () {
               let arrayauxiliar = [];
               const base64 = reader.result;
               arrayauxiliar = base64.split(',');
               const formData = {
                  data: null
               }

               try {
                  // Llama a la función existente para enviar el archivo
                  // return console.log(arrayauxiliar[1])
                  formData.data = arrayauxiliar[1]
                  const response = await create("aprendices/ficha/cargar", formData);
                  if (response && response.estudiantesNoProcesados && response.estudiantesNoProcesados.length > 0) {
                  //Itera sobre los estudiantes no procesados
                  response.estudiantesNoProcesados.forEach((estudiante) => {
                     if (Object.keys(estudiante).length > 0) {
                       // Si el objeto tiene al menos un campo, muestra una alerta
                        const mensaje = estudiante.causa;
                        console.log(`Mensaje:`, mensaje);
                        hasData = true; // Establece la bandera en verdadero
                     }
                  });
               }
               
               if (hasData) {
                 // Itera nuevamente sobre los estudiantes no procesados para mostrar alertas de error
                  response.estudiantesNoProcesados.forEach((estudiante, index) => {
                     if (Object.keys(estudiante).length > 0) {
                        const mensaje = estudiante.causa;
                     //   Muestra una alerta por cada dato que venga en el arreglo
                        Swal.fire({
                           position: 'top-end',
                           icon: 'error',
                           title: `Error en algunos registros`,
                           showConfirmButton: false,
                           timer: 2000
                        });
                     }
                     window.location.href = '/aprendices'
                  });
               } else if (!hasData) {
                 // Muestra una alerta de éxito si no se encontró información en ningún campo
                  await Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: 'El archivo se procesó con éxito',
                     showConfirmButton: false,
                     timer: 1500
                  });
                   window.location.href = '/aprendices'
               }

                  
               } catch (error) {
                  console.error('Error al procesar el archivo:', error.message);
                  mostrarError('Error al procesar el archivo');
               }
            };
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div>
               <input type="file" multiple onChange={handleFileChange} />
            </div>
            <div className="col d-flex justify-content-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal">
                  Cancelar
               </button>
               <button type="submit" className="smc-success rounded p-2">
                  Crear
               </button>
            </div>
         </form>
      </Fragment>
   );
};

// const ConvertirB64Modal = ({ others }) => {
//    const [files, setFiles] = useState([]);

//    const handleFileChange = (e) => {
//       const selectedFiles = e.target.files;
//       setFiles(selectedFiles);
//    };

//    const mostrarError = ({ message }) => {
//       Swal.fire({
//          position: 'top-end',
//          icon: 'error',
//          title: 'ERROR',
//          text: `${message}`,
//          showConfirmButton: false,
//          timer: 1500
//       });
//    };


// //    const handleSubmit = async (e) => {
// //       e.preventDefault();
// //       try {
// //          let hasData = false; // Variable para verificar si se encontró información en algún campo

// //          for (const file of files) {
// //             const reader = new FileReader();
// //             reader.readAsDataURL(file);

// //             reader.onload = async function () {
// //                let arrayauxiliar = [];
// //                const base64 = reader.result;
// //                arrayauxiliar = base64.split(',');
// //                const formData = {
// //                   data: null
// //                }

// //                try {
// //                   // Llama a la función existente para enviar el archivo
// //                   formData.data = arrayauxiliar[1]
// //                   const response = await create("aprendices/ficha/cargar", formData);
// //                   console.log("response normal: ", response);

// //                   if (response) {
// //                      console.log('Archivo procesado con éxito');
// //                      await Swal.fire({
// //                         position: 'center',
// //                         icon: 'success',
// //                         title: 'Registro exitoso',
// //                         showConfirmButton: false,
// //                         timer: 1500
// //                      });   
// //                   }
// //                   else if (response && response.estudiantesNoProcesados && response.estudiantesNoProcesados.length > 0) {
// //                      // Itera sobre los estudiantes no procesados
// //                      response.estudiantesNoProcesados.forEach((estudiante, index) => {
// //                         if (Object.keys(estudiante).length > 0) {
// //                            // Si el objeto tiene al menos un campo, muestra una alerta
// //                            console.log(`El archivo contiene información en el campo ${index + 1}`);
// //                            hasData = true; // Establece la bandera en verdadero
// //                         }
// //                      });
// //                   }
// //                   if (hasData) {
// //                   // Muestra una alerta general si se encontró información en algún campo
// //                   await Swal.fire({
// //                      position: 'top-end',
// //                      icon: 'error',
// //                      title: 'El archivo contiene información en uno o más campos',
// //                      showConfirmButton: false,
// //                      timer: 1500
// //                   });
// //                } 
// //                // else {
// //                //    console.log('Archivo procesado con éxito');
// //                //    await Swal.fire({
// //                //       position: 'center',
// //                //       icon: 'success',
// //                //       title: 'Registro exitoso',
// //                //       showConfirmButton: false,
// //                //       timer: 1500
// //                //    });
// //                // }
// //             } catch (error) {
// //                console.error('Error al procesar el archivo:', error.message);
// //                mostrarError('Error al procesar el archivo');
// //             }
// //          };
// //       }
// //       } catch (error) {
// //       console.error(error);
// //    }
// // };

// const handleSubmit = async (e) => {
//    e.preventDefault();
//    try {
//       let hasData = false; // Variable para verificar si se encontró información en algún campo

//       for (const file of files) {
//          const reader = new FileReader();
//          reader.readAsDataURL(file);

//          reader.onload = async function () {
//             let arrayauxiliar = [];
//             const base64 = reader.result;
//             arrayauxiliar = base64.split(',');
//             const formData = {
//                data: null
//             }

//             try {
//                // Llama a la función existente para enviar el archivo
//                formData.data = arrayauxiliar[1]
//                const response = await create("aprendices/ficha/cargar", formData);
//                console.log("response normal: ", response);

//                if (response && response.estudiantesNoProcesados && response.estudiantesNoProcesados.length > 0) {
//                   // Itera sobre los estudiantes no procesados
//                   response.estudiantesNoProcesados.forEach((estudiante) => {
//                      if (Object.keys(estudiante).length > 0) {
//                         // Si el objeto tiene al menos un campo, muestra una alerta
//                         const mensaje = estudiante.causa;
//                         console.log(`Mensaje:`, mensaje);
//                         hasData = true; // Establece la bandera en verdadero
//                      }
//                   });
//                }
               
//                if (hasData) {
//                   // Itera nuevamente sobre los estudiantes no procesados para mostrar alertas de error
//                   response.estudiantesNoProcesados.forEach((estudiante, index) => {
//                      if (Object.keys(estudiante).length > 0) {
//                         const mensaje = estudiante.causa;
//                         // Muestra una alerta por cada dato que venga en el arreglo
//                         Swal.fire({
//                            position: 'top-end',
//                            icon: 'error',
//                            title: `Error en algunos registros`,
//                            showConfirmButton: false,
//                            timer: 2000
//                         });
//                         window.location.href = '/aprendices'
//                      }
//                   });
//                } else if (!hasData) {
//                   // Muestra una alerta de éxito si no se encontró información en ningún campo
//                   await Swal.fire({
//                      position: 'top-end',
//                      icon: 'success',
//                      title: 'El archivo se procesó con éxito',
//                      showConfirmButton: false,
//                      timer: 1500
//                   });
//                    //window.location.href = '/aprendices'
//                }
//             } catch (error) {
//                console.error('Error al procesar el archivo:', error.message);
//                mostrarError('Error al procesar el archivo');
//             }
//          };
//       }
      
      
//    } catch (error) {
//       console.error(error);
//    }

   
// };




// return (
//    <Fragment>
//       <form onSubmit={handleSubmit}>
//          <div>
//             <input type="file" multiple onChange={handleFileChange} />
//          </div>
//          <div className="col d-flex justify-content-end">
//             <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal">
//                Cancelar
//             </button>
//             <button type="submit" className="smc-success rounded p-2">
//                Crear
//             </button>
//          </div>
//       </form>
//    </Fragment>
// );
// };

export {
   CreateAprendiz,
   UpdateAprendiz, 
   ConsultarAprendiz,
   ConvertirB64Modal
}