// // import React, { useEffect, useState, Fragment, useMemo } from 'react';
// // import { create, get, update } from '../../../../config/Api/api';
// // import jwt_decode from "jwt-decode"
// // import Swal from 'sweetalert2';
// // import * as XLSX from 'xlsx';


// // const CreateQueja = ({ decision,observa, claves }) => {
// //    // eslint-disable-next-line
// //    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
// //    const [user, setUser] = useState(token.userInfo);
// //    // console.log(user)
// //    const [formData, setFormData] = useState({
// //       fichas: "",
// //       trimestre: "",
// //       aprendizQueja: "",
// //       usuarioQueja: user.idUsuario,
// //       descripcionMotivo: "",
// //       motivoQueja: "",
// //       estadoQueja: 1,
// //       competenciaQueja: "",
// //       resultadoAQueja: "",
// //    })


// //    const [fichaEncontrada, setFichaEncontrada] = useState([])
// //    const [competencias, setCompetencias] = useState([])
// //    const [aprendicesF, setAprendizF] = useState([])
// //    const [resultadosA, setResultadosA] = useState([])
// //    const [validations, setValidations] = useState({
// //       cF: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cApre: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cComp: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cTri: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cRA: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cMC: {
// //          valid: 0,
// //          msg: "",
// //       },
// //       cDesc: {
// //          valid: 0,
// //          msg: "",
// //       }

// //    })

// //    const handleChange = (e) => {
// //       setFormData({
// //          ...formData,
// //          [e.target.name]: e.target.value,
// //       })
// //    }

// //    const handleChange2 = (e) => {
// //       setFormData({
// //          ...formData,
// //          [e.target.name]: e.target.value,
// //       })
// //       handleFicha()
// //    }

// //    const handleChange3 = (e) => {
// //       setFormData({
// //          ...formData,
// //          [e.target.name]: e.target.value,
// //       })
// //       handleResultados()
// //    }
   

// //    const handleResultados = async () => {
// //       try {
// //          var comp = document.querySelector("#competenciaQueja").value
// //          const data = await get(`resultado-aprendizaje/competencia/${comp}`)
// //          setResultadosA(data)
// //       } catch (error) {
// //          console.error(error)
// //       }
// //    }

// //    const handleFicha = async () => {
// //       try {
// //          var f = document.querySelector("#fichas").value
// //          const data = await get(`fichas/${f}`)
// //          setFichaEncontrada(data)

// //          var comp = await get(`competencias/programa/${data.programaFicha.idProgramaFormativo}`)
// //          setCompetencias(comp)

// //          var aprendices = await get(`aprendices/ficha/${f}`)
// //          setAprendizF(aprendices)
// //       } catch (error) {
// //          console.error(error)
// //       }
// //    }

// //    const handleSubmit = async () => {
// //       try {
// //          const errorChanges = { ...validations }
// //          if (formData.fichas === '' || formData.aprendizQueja === '' || formData.competenciaQueja === '' || formData.trimestre === '' || formData.resultadoAQueja === '' || formData.motivoQueja === '' || formData.descripcionMotivo === '') {
// //             if (formData.fichas === '') {
// //                errorChanges.cF.msg = 'El Campo de Ficha  es Obligatorio'
// //                errorChanges.cF.valid = 2
// //             } else {
// //                errorChanges.cF.msg = ''
// //                errorChanges.cF.valid = 1
// //             }
// //             if (formData.aprendizQueja === '') {
// //                errorChanges.cApre.msg = 'El Campo de Aprendiz es Obligatorio';
// //                errorChanges.cApre.valid = 2
// //             } else {
// //                errorChanges.cApre.msg = '';
// //                errorChanges.cApre.valid = 1
// //             }
// //             if (formData.competenciaQueja === '') {
// //                errorChanges.cComp.msg = 'El Campo de Competencia es Obligatorio';
// //                errorChanges.cComp.valid = 2
// //             } else {
// //                errorChanges.cComp.msg = '';
// //                errorChanges.cComp.valid = 1
// //             }
// //             if (formData.trimestre === '') {
// //                errorChanges.cTri.msg = 'El Campo de Trimestre es Obligatorio';
// //                errorChanges.cTri.valid = 2
// //             } else {
// //                errorChanges.cTri.msg = '';
// //                errorChanges.cTri.valid = 1
// //             }
// //             if (formData.resultadoAQueja === '') {
// //                errorChanges.cRA.msg = 'El Campo de Resultado de Aprendizaje es Obligatorio';
// //                errorChanges.cRA.valid = 2
// //             } else {
// //                errorChanges.cRA.msg = '';
// //                errorChanges.cRA.valid = 1
// //             }
// //             if (formData.motivoQueja === '') {
// //                errorChanges.cMC.msg = 'El Campo de Motivo es Obligatorio';
// //                errorChanges.cMC.valid = 2
// //             } else {
// //                errorChanges.cMC.msg = '';
// //                errorChanges.cMC.valid = 1
// //             }
// //             if (formData.descripcionMotivo === '') {
// //                errorChanges.cDesc.msg = 'El Campo Descripción es Obligatorio';
// //                errorChanges.cDesc.valid = 2
// //             } else {
// //                errorChanges.cDesc.msg = '';
// //                errorChanges.cDesc.valid = 1
// //             }
// //             return setValidations(errorChanges)
// //          } else {
// //             errorChanges.cF.msg = '';
// //             errorChanges.cF.valid = 1
// //             errorChanges.cApre.msg = '';
// //             errorChanges.cApre.valid = 1
// //             errorChanges.cComp.msg = '';
// //             errorChanges.cComp.valid = 1
// //             errorChanges.cTri.msg = '';
// //             errorChanges.cTri.valid = 1
// //             errorChanges.cRA.msg = '';
// //             errorChanges.cRA.valid = 1
// //             errorChanges.cMC.msg = '';
// //             errorChanges.cMC.valid = 1
// //             errorChanges.cDesc.msg = '';
// //             errorChanges.cDesc.valid = 1
// //             setValidations(errorChanges)

// //             const clearData = {
// //                trimestre: formData.trimestre,
// //                aprendizQueja: formData.aprendizQueja,
// //                usuarioQueja: user.idUsuario,
// //                descripcionMotivo: formData.descripcionMotivo,
// //                motivoQueja: formData.motivoQueja,
// //                estadoQueja: 1,
// //                competenciaQueja: formData.competenciaQueja,
// //                resultadoAQueja: formData.resultadoAQueja,
// //             }

// //             const data = await create("quejas", clearData)
// //             console.log(data)
// //                Swal.fire({
// //                   position: 'center',
// //                   icon: 'success',
// //                   title: 'Queja Exitosa',
// //                   showConfirmButton: false,
// //                   timer: 1800
// //                })
            
// //                window.location.reload()
            
// //          }
// //       } catch (error) {
// //          console.log(error)
// //       }
// //    }

// //    const validated = useMemo(() => {
// //       return validations
// //    }, [validations])

// //    const cancelForm = () => {
// //       setFormData({
// //          trimestre: "",
// //          aprendizQueja: "",
// //          usuarioQueja: user.idUsuario,
// //          descripcionMotivo: "",
// //          motivoQueja: "",
// //          estadoQueja: 1,
// //          competenciaQueja: "",
// //          resultadoAQueja: "",
// //       })
// //    }

// //    return (
// //       <Fragment>
// //          <div className="w-f">
// //             <form className="crearQueja">
// //                <div className='col' style={{ width: "100%" }}>
// //                   <div className='row justify-content-between'>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="fichas">Ficha: <font color="red">*</font></label>
// //                         <select value={formData.fichas} onChange={handleChange2} name="fichas" id="fichas" className={`form-control ${validated.cF.valid === 2 && 'is-invalid'} ${validated.cF.valid === 1 && 'is-valid'}`} >
// //                            <option value="">Seleccionar</option>
// //                            {claves.fichas.map((i, index) => {
// //                               return (
// //                                  <option key={index} data-toggle="tooltip" value={i.codigoFicha}>{i.codigoFicha} - {i.programaFicha.nombrePF}</option>
// //                               )
// //                            })}
// //                         </select>
// //                         {
// //                            validated.cF.msg !== "" && (
// //                               <span className='text-xs text-red-600'>{validated.cF.msg}</span>
// //                            )
// //                         }
// //                      </div>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="aprendizQueja">Aprendiz: <font color="red">*</font></label>
// //                         <select value={formData.aprendizQueja} onChange={handleChange} name="aprendizQueja" id="aprendizQueja" className={`form-control ${validated.cApre.valid === 2 && 'is-invalid'} ${validated.cApre.valid === 1 && 'is-valid'}`} required>
// //                            <option value="">Seleccionar</option>
// //                            {aprendicesF.map((i, index) => {
// //                               return (
// //                                  <option key={index} data-toggle="tooltip" value={i.idAprendiz}>{i.nombre} {i.apellidos}</option>
// //                               )
// //                            })}
// //                         </select>
// //                         {validated.cApre.msg !== "" && (<span className='text-xs text-red-600'>{validated.cApre.msg}</span>)}
// //                      </div>
// //                   </div>
// //                   <div className='row justify-content-between'>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="competenciaQueja">Competencia: <font color="red">*</font></label>
// //                         <select value={formData.competenciaQueja} onChange={handleChange3} name="competenciaQueja" id="competenciaQueja" className={`form-control ${validated.cComp.valid === 2 && 'is-invalid'} ${validated.cComp.valid === 1 && 'is-valid'}`} required>
// //                            <option value="">Seleccionar</option>
// //                            {competencias.map((i) => {
// //                               return (
// //                                  <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
// //                               )
// //                            })}
// //                         </select>
// //                         {
// //                            validated.cComp.msg !== "" && (
// //                               <span className='text-xs text-red-600'>{validated.cComp.msg}</span>
// //                            )
// //                         }
// //                      </div>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="trimestre">Trimestre: <font color="red">*</font></label>
// //                         <select value={formData.trimestre} onChange={handleChange} name="trimestre" id="trimestre" className={`form-control ${validated.cTri.valid === 2 && 'is-invalid'} ${validated.cTri.valid === 1 && 'is-valid'}`} required>
// //                            <option value="">Seleccionar</option>
// //                            {fichaEncontrada.programaFicha ? (
// //                               Array.from({ length: parseInt(fichaEncontrada.programaFicha.trimestres) }, (_, index) => (
// //                                  <option key={index + 1} value={index + 1}>
// //                                     Trimestre {index + 1}
// //                                  </option>
// //                               ))
// //                            ) : (
// //                               ''
// //                            )}
// //                         </select>
// //                         {
// //                            validated.cTri.msg !== "" && (
// //                               <span className='text-xs text-red-600'>{validated.cTri.msg}</span>
// //                            )
// //                         }
// //                      </div>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="resultadoAQueja">Resultado de Aprendizaje: <font color="red">*</font></label>
// //                         <select value={formData.resultadoAQueja} onChange={handleChange} name="resultadoAQueja" id="resultadoAQueja" className={`form-control ${validated.cRA.valid === 2 && 'is-invalid'} ${validated.cRA.valid === 1 && 'is-valid'}`} required>
// //                            <option value="">Seleccionar</option>
// //                            {Array.isArray(resultadosA) &&
// //                               resultadosA.map((i) => {
// //                                  return (
// //                                     <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
// //                                  );
// //                               })}
// //                         </select>
// //                         {
// //                            validated.cRA.msg !== "" && (
// //                               <span className='text-xs text-red-600'>{validated.cRA.msg}</span>
// //                            )
// //                         }
// //                      </div>
// //                      <div className="form-group col-6">
// //                         <label htmlFor="motivoQueja">Motivo Comité: <font color="red">*</font></label>
// //                         <select value={formData.motivoQueja} onChange={handleChange} name="motivoQueja" id="motivoQueja" className={`form-control ${validated.cMC.valid === 2 && 'is-invalid'} ${validated.cMC.valid === 1 && 'is-valid'}`} required>
// //                            <option value="">Seleccionar</option>
// //                            {claves.motivosQ.map((i) => {
// //                               return (
// //                                  <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
// //                               )
// //                            })}
// //                         </select>
// //                         {
// //                            validated.cMC.msg !== "" && (
// //                               <span className='text-xs text-red-600'>{validated.cMC.msg}</span>
// //                            )
// //                         }
// //                      </div>
// //                   </div>
// //                   <div className='form-group'>
// //                      <label htmlFor='descripcionMotivo'>Descripción Motivo: <font color="red">*</font></label>
// //                      <textarea value={formData.descripcionMotivo} name='descripcionMotivo' id='descripcionMotivo' onChange={handleChange} className={`form-control ${validated.cDesc.valid === 2 && 'is-invalid'} ${validated.cDesc.valid === 1 && 'is-valid'}`} rows="3" required />
// //                      {
// //                         validated.cDesc.msg !== "" && (
// //                            <span className='text-xs text-red-600'>{validated.cDesc.msg}</span>
// //                         )
// //                      }
// //                   </div>
// //                </div>
// //             </form>
// //          </div>
// //          <div className="col d-flex justify-content-end">
// //             <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
// //             <button type="submit" className="smc-success rounded p-2" onClick={handleSubmit}>Crear</button>
// //          </div>
// //       </Fragment>
// //    )
// // }

// // const ConsultarQuejas = ({ queja }) => {
// //    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
// //    const [user, setUser] = useState(token.userInfo);
// //    const [Quejas, setQuejas] = useState(queja)
// //    const [formData, setFormData] = useState({
// //       aprendiz: Quejas.aprendizQueja,
// //       ficha: Quejas.aprendizQueja.fichaAprendiz.codigoFicha,
// //       motivo: Quejas.motivoQueja.nombreMotivo,
// //       programa: Quejas.competenciaQueja.programasCompetencia,
// //       descripcion: Quejas.descripcionMotivo,

// //    })

// //    const handleChange = (e) => {
// //       setFormData({
// //          ...formData,
// //          [e.target.name]: e.target.value,
// //       })
// //    }


// //    return (
// //       <Fragment>
// //          <form>
// //             {/* <input type='hidden' name="ficha" id="ficha" value={ficha.idFicha} className="form-control mb-2" disabled /> */}
// //             {/* <input type='hidden' name="motivos" id="motivos" value={motivos.idMotivoComite} className="form-control mb-2" disabled /> */}
// //             {/* <input type='hidden' name="programaF" id="programaF" value={programaF.idProgramaFormativo} className="form-control mb-2" disabled /> */}
// //             {/* <input type='hidden' name="aprendiz" id="aprendiz" value={aprendizQ.idAprendiz} className="form-control mb-2" disabled /> */}
// //             <input type="hidden" name="usuario" id="usuario" value={user.idUsuario} className="form-control mb-2" disabled />
// //             {/* <input type="hidden" name="competencia" id="competencia" value={competencia} className="form-control mb-2" disabled /> */}
// //             <div >
// //                <div className='col'>
// //                   <div className='row justify-content-between'>
// //                      <div className="form-group col-4">
// //                         <label>Aprendiz:</label>
// //                         <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{formData.aprendiz.nombre} {formData.aprendiz.apellidos}</p>
// //                      </div>
// //                      <div className="form-group col-4">
// //                         <label>Instructor:</label>
// //                         <p className="font-bold">{user.nombre} {user.apellidos}</p>
// //                      </div>
// //                      <div className="form-group col-4">
// //                         <label>ficha:</label>
// //                         <p className="font-bold" value={formData.ficha} onChange={handleChange} >{formData.ficha}</p>
// //                      </div>
// //                      <div className="form-group col-4">
// //                         <label>Motivos:</label>
// //                         <p className="font-bold" value={formData.motivo} onChange={handleChange} >{formData.motivo}</p>
// //                      </div>
// //                      <div className="form-group col-4">
// //                         <label>Programa Formativo:</label>
// //                         <p className="font-bold" value={formData.programa} onChange={handleChange} >{formData.programa.nombrePF}</p>
// //                      </div>
// //                      <div className="form-group col-4">
// //                         <label>Descripcion:</label>
// //                         <p className="font-bold" value={formData.descripcion} onChange={handleChange}  >{formData.descripcion}</p>
// //                      </div>
// //                   </div>
// //                </div>
// //                <div className="col d-flex justify-content-end">
// //                   <button type="button" className="btn btn-danger mr-2 bg-danger" data-dismiss="modal">Cerrar</button>
// //                </div>
// //             </div>
// //          </form>
// //       </Fragment>
// //    )
// // }



// // export {
// //    CreateQueja,
// //    ConsultarQuejas
// // }

// import React, { useEffect, useState, Fragment, useMemo } from 'react';
// import { create, get, update } from '../../../../config/Api/api';
// import jwt_decode from "jwt-decode"
// import Swal from 'sweetalert2';
// import * as XLSX from 'xlsx';


// const CreateQueja = ({ decision, observa, claves }) => {
//    // eslint-disable-next-line
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    // console.log(user)
//    const [formData, setFormData] = useState({
//       fichas: "",
//       trimestre: "",
//       aprendizQueja: "",
//       usuarioQueja: user.idUsuario,
//       descripcionMotivo: "",
//       motivoQueja: "",
//       estadoQueja: 1,
//       competenciaQueja: "",
//       resultadoAQueja: "",
//    })


//    const [fichaEncontrada, setFichaEncontrada] = useState([])
//    const [competencias, setCompetencias] = useState([])
//    const [aprendicesF, setAprendizF] = useState([])
//    const [resultadosA, setResultadosA] = useState([])
//    const [validations, setValidations] = useState({
//       cF: {
//          valid: 0,
//          msg: "",
//       },
//       cApre: {
//          valid: 0,
//          msg: "",
//       },
//       cComp: {
//          valid: 0,
//          msg: "",
//       },
//       cTri: {
//          valid: 0,
//          msg: "",
//       },
//       cRA: {
//          valid: 0,
//          msg: "",
//       },
//       cMC: {
//          valid: 0,
//          msg: "",
//       },
//       cDesc: {
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

//    const handleChange2 = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       handleFicha()
//    }

//    const handleChange3 = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       handleResultados()
//    }


//    const handleResultados = async () => {
//       try {
//          var comp = document.querySelector("#competenciaQueja").value
//          const data = await get(`resultado-aprendizaje/competencia/${comp}`)
//          setResultadosA(data)
//       } catch (error) {
//          console.error(error)
//       }
//    }

//    const handleFicha = async () => {
//       try {
//          var f = document.querySelector("#fichas").value
//          const data = await get(`fichas/${f}`)
//          setFichaEncontrada(data)

//          var comp = await get(`competencias/programa/${data.programaFicha.idProgramaFormativo}`)
//          setCompetencias(comp)

//          var aprendices = await get(`aprendices/ficha/${f}`)
//          setAprendizF(aprendices)
//       } catch (error) {
//          console.error(error)
//       }
//    }

//    const handleSubmit = async () => {
//       try {
//          const errorChanges = { ...validations }
//          if (formData.fichas === '' || formData.aprendizQueja === '' || formData.competenciaQueja === '' || formData.trimestre === '' || formData.resultadoAQueja === '' || formData.motivoQueja === '' || formData.descripcionMotivo === '') {
//             if (formData.fichas === '') {
//                errorChanges.cF.msg = 'El Campo de Ficha  es Obligatorio'
//                errorChanges.cF.valid = 2
//             } else {
//                errorChanges.cF.msg = ''
//                errorChanges.cF.valid = 1
//             }
//             if (formData.aprendizQueja === '') {
//                errorChanges.cApre.msg = 'El Campo de Aprendiz es Obligatorio';
//                errorChanges.cApre.valid = 2
//             } else {
//                errorChanges.cApre.msg = '';
//                errorChanges.cApre.valid = 1
//             }
//             if (formData.competenciaQueja === '') {
//                errorChanges.cComp.msg = 'El Campo de Competencia es Obligatorio';
//                errorChanges.cComp.valid = 2
//             } else {
//                errorChanges.cComp.msg = '';
//                errorChanges.cComp.valid = 1
//             }
//             if (formData.trimestre === '') {
//                errorChanges.cTri.msg = 'El Campo de Trimestre es Obligatorio';
//                errorChanges.cTri.valid = 2
//             } else {
//                errorChanges.cTri.msg = '';
//                errorChanges.cTri.valid = 1
//             }
//             if (formData.resultadoAQueja === '') {
//                errorChanges.cRA.msg = 'El Campo de Resultado de Aprendizaje es Obligatorio';
//                errorChanges.cRA.valid = 2
//             } else {
//                errorChanges.cRA.msg = '';
//                errorChanges.cRA.valid = 1
//             }
//             if (formData.motivoQueja === '') {
//                errorChanges.cMC.msg = 'El Campo de Motivo es Obligatorio';
//                errorChanges.cMC.valid = 2
//             } else {
//                errorChanges.cMC.msg = '';
//                errorChanges.cMC.valid = 1
//             }
//             if (formData.descripcionMotivo === '') {
//                errorChanges.cDesc.msg = 'El Campo Descripción es Obligatorio';
//                errorChanges.cDesc.valid = 2
//             } else {
//                errorChanges.cDesc.msg = '';
//                errorChanges.cDesc.valid = 1
//             }
//             return setValidations(errorChanges)
//          } else {
//             errorChanges.cF.msg = '';
//             errorChanges.cF.valid = 1
//             errorChanges.cApre.msg = '';
//             errorChanges.cApre.valid = 1
//             errorChanges.cComp.msg = '';
//             errorChanges.cComp.valid = 1
//             errorChanges.cTri.msg = '';
//             errorChanges.cTri.valid = 1
//             errorChanges.cRA.msg = '';
//             errorChanges.cRA.valid = 1
//             errorChanges.cMC.msg = '';
//             errorChanges.cMC.valid = 1
//             errorChanges.cDesc.msg = '';
//             errorChanges.cDesc.valid = 1
//             setValidations(errorChanges)

//             const clearData = {
//                trimestre: formData.trimestre,
//                aprendizQueja: formData.aprendizQueja,
//                usuarioQueja: user.idUsuario,
//                descripcionMotivo: formData.descripcionMotivo,
//                motivoQueja: formData.motivoQueja,
//                estadoQueja: 1,
//                competenciaQueja: formData.competenciaQueja,
//                resultadoAQueja: formData.resultadoAQueja,
//             }

//             const data = await create("quejas", clearData)
//             console.log(data)
//             Swal.fire({
//                position: 'center',
//                icon: 'success',
//                title: 'Queja Exitosa',
//                showConfirmButton: false,
//                timer: 1800
//             })

//             // window.location.reload()

//          }
//       } catch (error) {
//          console.log(error)
//       }
//    }

//    const validated = useMemo(() => {
//       return validations
//    }, [validations])

//    const cancelForm = () => {
//       setFormData({
//          trimestre: "",
//          aprendizQueja: "",
//          usuarioQueja: user.idUsuario,
//          descripcionMotivo: "",
//          motivoQueja: "",
//          estadoQueja: 1,
//          competenciaQueja: "",
//          resultadoAQueja: "",
//       })
//    }

//    return (
//       <Fragment>
//          <div className="w-f">
//             <form className="crearQueja">
//                <div className='col' style={{ width: "100%" }}>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-6">
//                         <label htmlFor="fichas">Ficha: <font color="red">*</font></label>
//                         <select value={formData.fichas} onChange={handleChange2} name="fichas" id="fichas" className={`form-control ${validated.cF.valid === 2 && 'is-invalid'} ${validated.cF.valid === 1 && 'is-valid'}`} >
//                            <option value="">Seleccionar</option>
//                            {claves.fichas.map((i, index) => {
//                               return (
//                                  <option key={index} data-toggle="tooltip" value={i.codigoFicha}>{i.codigoFicha} - {i.programaFicha.nombrePF}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cF.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cF.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="aprendizQueja">Aprendiz: <font color="red">*</font></label>
//                         <select value={formData.aprendizQueja} onChange={handleChange} name="aprendizQueja" id="aprendizQueja" className={`form-control ${validated.cApre.valid === 2 && 'is-invalid'} ${validated.cApre.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {aprendicesF.map((i, index) => {
//                               return (
//                                  <option key={index} data-toggle="tooltip" value={i.idAprendiz}>{i.nombre} {i.apellidos}</option>
//                               )
//                            })}
//                         </select>
//                         {validated.cApre.msg !== "" && (<span className='text-xs text-red-600'>{validated.cApre.msg}</span>)}
//                      </div>
//                   </div>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-6">
//                         <label htmlFor="competenciaQueja">Competencia: <font color="red">*</font></label>
//                         <select value={formData.competenciaQueja} onChange={handleChange3} name="competenciaQueja" id="competenciaQueja" className={`form-control ${validated.cComp.valid === 2 && 'is-invalid'} ${validated.cComp.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {competencias.map((i) => {
//                               return (
//                                  <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cComp.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cComp.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="trimestre">Trimestre: <font color="red">*</font></label>
//                         <select value={formData.trimestre} onChange={handleChange} name="trimestre" id="trimestre" className={`form-control ${validated.cTri.valid === 2 && 'is-invalid'} ${validated.cTri.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {fichaEncontrada.programaFicha ? (
//                               Array.from({ length: parseInt(fichaEncontrada.programaFicha.trimestres) }, (_, index) => (
//                                  <option key={index + 1} value={index + 1}>
//                                     Trimestre {index + 1}
//                                  </option>
//                               ))
//                            ) : (
//                               ''
//                            )}
//                         </select>
//                         {
//                            validated.cTri.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cTri.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="resultadoAQueja">Resultado de Aprendizaje: <font color="red">*</font></label>
//                         <select value={formData.resultadoAQueja} onChange={handleChange} name="resultadoAQueja" id="resultadoAQueja" className={`form-control ${validated.cRA.valid === 2 && 'is-invalid'} ${validated.cRA.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {Array.isArray(resultadosA) &&
//                               resultadosA.map((i) => {
//                                  return (
//                                     <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
//                                  );
//                               })}
//                         </select>
//                         {
//                            validated.cRA.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cRA.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="motivoQueja">Motivo Comité: <font color="red">*</font></label>
//                         <select value={formData.motivoQueja} onChange={handleChange} name="motivoQueja" id="motivoQueja" className={`form-control ${validated.cMC.valid === 2 && 'is-invalid'} ${validated.cMC.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {claves.motivosQ.map((i) => {
//                               return (
//                                  <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cMC.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cMC.msg}</span>
//                            )
//                         }
//                      </div>
//                   </div>
//                   <div className='form-group'>
//                      <label htmlFor='descripcionMotivo'>Descripción Motivo: <font color="red">*</font></label>
//                      <textarea value={formData.descripcionMotivo} name='descripcionMotivo' id='descripcionMotivo' onChange={handleChange} className={`form-control ${validated.cDesc.valid === 2 && 'is-invalid'} ${validated.cDesc.valid === 1 && 'is-valid'}`} rows="3" required />
//                      {
//                         validated.cDesc.msg !== "" && (
//                            <span className='text-xs text-red-600'>{validated.cDesc.msg}</span>
//                         )
//                      }
//                   </div>
//                </div>
//             </form>
//          </div>
//          <div className="col d-flex justify-content-end">
//             <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
//             <button type="submit" className="s-button-success rounded p-2" onClick={handleSubmit}>Crear</button>
//          </div>
//       </Fragment>
//    )
// }

// const ConsultarQuejas = ({ queja }) => {
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    const [Quejas, setQuejas] = useState(queja)
//    const [formData, setFormData] = useState({
//       aprendiz: Quejas.aprendizQueja,
//       ficha: Quejas.aprendizQueja.fichaAprendiz.codigoFicha,
//       motivo: Quejas.motivoQueja.nombreMotivo,
//       programa: Quejas.competenciaQueja.programasCompetencia,
//       descripcion: Quejas.descripcionMotivo,
//       archivoQueja: Quejas.archivoQueja,
//    })

//    const handleChange = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//    }


//    return (
//       <Fragment>
//          <form>
//             {/* <input type='hidden' name="ficha" id="ficha" value={ficha.idFicha} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="motivos" id="motivos" value={motivos.idMotivoComite} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="programaF" id="programaF" value={programaF.idProgramaFormativo} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="aprendiz" id="aprendiz" value={aprendizQ.idAprendiz} className="form-control mb-2" disabled /> */}
//             <input type="hidden" name="usuario" id="usuario" value={user.idUsuario} className="form-control mb-2" disabled />
//             {/* <input type="hidden" name="competencia" id="competencia" value={competencia} className="form-control mb-2" disabled /> */}
//             <div >
//                <div className='col'>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-4">
//                         <label>Aprendiz:</label>
//                         <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{formData.aprendiz.nombre} {formData.aprendiz.apellidos}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Instructor:</label>
//                         <p className="font-bold">{user.nombre} {user.apellidos}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>ficha:</label>
//                         <p className="font-bold" value={formData.ficha} onChange={handleChange} >{formData.ficha}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Motivos:</label>
//                         <p className="font-bold" value={formData.motivo} onChange={handleChange} >{formData.motivo}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Programa Formativo:</label>
//                         <p className="font-bold" value={formData.programa} onChange={handleChange} >{formData.programa.nombrePF}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Descripcion:</label>
//                         <p className="font-bold" value={formData.descripcion} onChange={handleChange}  >{formData.descripcion}</p>
//                      </div>

//                      <div className="form-group col-4">
//                         <label>Archivo:</label>
//                         <p className="font-bold" value={formData.archivoQueja} onChange={handleChange}>Hola</p>
//                      </div>
//                   </div>
//                </div>
//                <div className="col d-flex justify-content-end">
//                   <button type="c" className="s-button-cancel rounded p-2" data-dismiss="modal">Cerrar</button>
//                </div>
//             </div>
//          </form>
//       </Fragment>
//    )
// }

// const CargaMasivaQuejas = () => {
//    const [jsonData, setJsonData] = useState([]);

//    const handleFileUpload = (e) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//          const data = event.target.result;
//          const workbook = XLSX.read(data, { type: 'binary' });
//          const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
//          const sheet = workbook.Sheets[sheetName];
//          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//          // Assuming the first row contains column headers
//          const headers = json[0];
//          const rows = json.slice(1);

//          const jsonDataArray = rows.map((row) => {
//             const jsonObject = {};
//             headers.forEach((header, index) => {
//                jsonObject[header] = row[index];
//             });
//             return jsonObject;
//          });

//          setJsonData(jsonDataArray);
//       };

//       reader.readAsBinaryString(file);
//    };

//    const mostrarEnConsola = () => {
//       console.log(jsonData);
//    };

//    return (
//       <>
//          <div className="container">
//             <div className="row">
//                <div className="col">
//                   <h1>Subir archivo Excel y mostrar en consola como JSON</h1>
//                   <form>
//                      <div className="form-group">
//                         <input
//                            type="file"
//                            className="form-control-file"
//                            id="excelFile"
//                            accept=".xlsx, .xls"
//                            onChange={handleFileUpload}
//                         />
//                      </div>
//                      <button
//                         type="button"
//                         className="btn btn-success bg-success"
//                         onClick={mostrarEnConsola}
//                      >
//                         Mostrar en Consola
//                      </button>
//                   </form>
//                </div>
//             </div>
//          </div>
//       </>
//    );
// };


// // const  CargaMasivaQuejas = () => {
// //   const [jsonData, setJsonData] = useState([]);
  
// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     const reader = new FileReader();

// //     reader.onload = (event) => {
// //       const data = event.target.result;
// //       const workbook = XLSX.read(data, { type: 'binary' });
// //       const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
// //       const sheet = workbook.Sheets[sheetName];
// //       const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
// //       // Assuming the first row contains column headers
// //       const headers = json[0];
// //       const rows = json.slice(1);

// //       const jsonDataArray = rows.map((row) => {
// //         const jsonObject = {};
// //         headers.forEach((header, index) => {
// //           jsonObject[header] = row[index];
// //         });
// //         return jsonObject;
// //       });

// //       setJsonData(jsonDataArray);
// //     };

// //     reader.readAsBinaryString(file);
// //   };

// //   return (
// //     <Container>
// //       <Row>
// //         <Col>
// //           <h1>Subir archivo Excel y mostrar en consola como JSON</h1>
// //           <Form>
// //             <Form.Group>
// //               <Form.File 
// //                 id="excelFile"
// //                 label="Selecciona un archivo Excel"
// //                 accept=".xlsx, .xls"
// //                 onChange={handleFileUpload}
// //               />
// //             </Form.Group>
// //           </Form>
// //           <Button onClick={() => console.log(jsonData)}>Mostrar en Consola</Button>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }



// export {
//    CreateQueja,
//    ConsultarQuejas,
//    CargaMasivaQuejas
// }

// import React, { useEffect, useState, Fragment, useMemo } from 'react';
// import { create, get, update } from '../../../../config/Api/api';
// import jwt_decode from "jwt-decode"
// import Swal from 'sweetalert2';
// import * as XLSX from 'xlsx';


// const CreateQueja = ({ decision,observa, claves }) => {
//    // eslint-disable-next-line
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    // console.log(user)
//    const [formData, setFormData] = useState({
//       fichas: "",
//       trimestre: "",
//       aprendizQueja: "",
//       usuarioQueja: user.idUsuario,
//       descripcionMotivo: "",
//       motivoQueja: "",
//       estadoQueja: 1,
//       competenciaQueja: "",
//       resultadoAQueja: "",
//    })


//    const [fichaEncontrada, setFichaEncontrada] = useState([])
//    const [competencias, setCompetencias] = useState([])
//    const [aprendicesF, setAprendizF] = useState([])
//    const [resultadosA, setResultadosA] = useState([])
//    const [validations, setValidations] = useState({
//       cF: {
//          valid: 0,
//          msg: "",
//       },
//       cApre: {
//          valid: 0,
//          msg: "",
//       },
//       cComp: {
//          valid: 0,
//          msg: "",
//       },
//       cTri: {
//          valid: 0,
//          msg: "",
//       },
//       cRA: {
//          valid: 0,
//          msg: "",
//       },
//       cMC: {
//          valid: 0,
//          msg: "",
//       },
//       cDesc: {
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

//    const handleChange2 = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       handleFicha()
//    }

//    const handleChange3 = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       handleResultados()
//    }
   

//    const handleResultados = async () => {
//       try {
//          var comp = document.querySelector("#competenciaQueja").value
//          const data = await get(`resultado-aprendizaje/competencia/${comp}`)
//          setResultadosA(data)
//       } catch (error) {
//          console.error(error)
//       }
//    }

//    const handleFicha = async () => {
//       try {
//          var f = document.querySelector("#fichas").value
//          const data = await get(`fichas/${f}`)
//          setFichaEncontrada(data)

//          var comp = await get(`competencias/programa/${data.programaFicha.idProgramaFormativo}`)
//          setCompetencias(comp)

//          var aprendices = await get(`aprendices/ficha/${f}`)
//          setAprendizF(aprendices)
//       } catch (error) {
//          console.error(error)
//       }
//    }

//    const handleSubmit = async () => {
//       try {
//          const errorChanges = { ...validations }
//          if (formData.fichas === '' || formData.aprendizQueja === '' || formData.competenciaQueja === '' || formData.trimestre === '' || formData.resultadoAQueja === '' || formData.motivoQueja === '' || formData.descripcionMotivo === '') {
//             if (formData.fichas === '') {
//                errorChanges.cF.msg = 'El Campo de Ficha  es Obligatorio'
//                errorChanges.cF.valid = 2
//             } else {
//                errorChanges.cF.msg = ''
//                errorChanges.cF.valid = 1
//             }
//             if (formData.aprendizQueja === '') {
//                errorChanges.cApre.msg = 'El Campo de Aprendiz es Obligatorio';
//                errorChanges.cApre.valid = 2
//             } else {
//                errorChanges.cApre.msg = '';
//                errorChanges.cApre.valid = 1
//             }
//             if (formData.competenciaQueja === '') {
//                errorChanges.cComp.msg = 'El Campo de Competencia es Obligatorio';
//                errorChanges.cComp.valid = 2
//             } else {
//                errorChanges.cComp.msg = '';
//                errorChanges.cComp.valid = 1
//             }
//             if (formData.trimestre === '') {
//                errorChanges.cTri.msg = 'El Campo de Trimestre es Obligatorio';
//                errorChanges.cTri.valid = 2
//             } else {
//                errorChanges.cTri.msg = '';
//                errorChanges.cTri.valid = 1
//             }
//             if (formData.resultadoAQueja === '') {
//                errorChanges.cRA.msg = 'El Campo de Resultado de Aprendizaje es Obligatorio';
//                errorChanges.cRA.valid = 2
//             } else {
//                errorChanges.cRA.msg = '';
//                errorChanges.cRA.valid = 1
//             }
//             if (formData.motivoQueja === '') {
//                errorChanges.cMC.msg = 'El Campo de Motivo es Obligatorio';
//                errorChanges.cMC.valid = 2
//             } else {
//                errorChanges.cMC.msg = '';
//                errorChanges.cMC.valid = 1
//             }
//             if (formData.descripcionMotivo === '') {
//                errorChanges.cDesc.msg = 'El Campo Descripción es Obligatorio';
//                errorChanges.cDesc.valid = 2
//             } else {
//                errorChanges.cDesc.msg = '';
//                errorChanges.cDesc.valid = 1
//             }
//             return setValidations(errorChanges)
//          } else {
//             errorChanges.cF.msg = '';
//             errorChanges.cF.valid = 1
//             errorChanges.cApre.msg = '';
//             errorChanges.cApre.valid = 1
//             errorChanges.cComp.msg = '';
//             errorChanges.cComp.valid = 1
//             errorChanges.cTri.msg = '';
//             errorChanges.cTri.valid = 1
//             errorChanges.cRA.msg = '';
//             errorChanges.cRA.valid = 1
//             errorChanges.cMC.msg = '';
//             errorChanges.cMC.valid = 1
//             errorChanges.cDesc.msg = '';
//             errorChanges.cDesc.valid = 1
//             setValidations(errorChanges)

//             const clearData = {
//                trimestre: formData.trimestre,
//                aprendizQueja: formData.aprendizQueja,
//                usuarioQueja: user.idUsuario,
//                descripcionMotivo: formData.descripcionMotivo,
//                motivoQueja: formData.motivoQueja,
//                estadoQueja: 1,
//                competenciaQueja: formData.competenciaQueja,
//                resultadoAQueja: formData.resultadoAQueja,
//             }

//             const data = await create("quejas", clearData)
//             console.log(data)
//                Swal.fire({
//                   position: 'center',
//                   icon: 'success',
//                   title: 'Queja Exitosa',
//                   showConfirmButton: false,
//                   timer: 1800
//                })
            
//                window.location.reload()
            
//          }
//       } catch (error) {
//          console.log(error)
//       }
//    }

//    const validated = useMemo(() => {
//       return validations
//    }, [validations])

//    const cancelForm = () => {
//       setFormData({
//          trimestre: "",
//          aprendizQueja: "",
//          usuarioQueja: user.idUsuario,
//          descripcionMotivo: "",
//          motivoQueja: "",
//          estadoQueja: 1,
//          competenciaQueja: "",
//          resultadoAQueja: "",
//       })
//    }

//    return (
//       <Fragment>
//          <div className="w-f">
//             <form className="crearQueja">
//                <div className='col' style={{ width: "100%" }}>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-6">
//                         <label htmlFor="fichas">Ficha: <font color="red">*</font></label>
//                         <select value={formData.fichas} onChange={handleChange2} name="fichas" id="fichas" className={`form-control ${validated.cF.valid === 2 && 'is-invalid'} ${validated.cF.valid === 1 && 'is-valid'}`} >
//                            <option value="">Seleccionar</option>
//                            {claves.fichas.map((i, index) => {
//                               return (
//                                  <option key={index} data-toggle="tooltip" value={i.codigoFicha}>{i.codigoFicha} - {i.programaFicha.nombrePF}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cF.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cF.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="aprendizQueja">Aprendiz: <font color="red">*</font></label>
//                         <select value={formData.aprendizQueja} onChange={handleChange} name="aprendizQueja" id="aprendizQueja" className={`form-control ${validated.cApre.valid === 2 && 'is-invalid'} ${validated.cApre.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {aprendicesF.map((i, index) => {
//                               return (
//                                  <option key={index} data-toggle="tooltip" value={i.idAprendiz}>{i.nombre} {i.apellidos}</option>
//                               )
//                            })}
//                         </select>
//                         {validated.cApre.msg !== "" && (<span className='text-xs text-red-600'>{validated.cApre.msg}</span>)}
//                      </div>
//                   </div>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-6">
//                         <label htmlFor="competenciaQueja">Competencia: <font color="red">*</font></label>
//                         <select value={formData.competenciaQueja} onChange={handleChange3} name="competenciaQueja" id="competenciaQueja" className={`form-control ${validated.cComp.valid === 2 && 'is-invalid'} ${validated.cComp.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {competencias.map((i) => {
//                               return (
//                                  <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cComp.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cComp.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="trimestre">Trimestre: <font color="red">*</font></label>
//                         <select value={formData.trimestre} onChange={handleChange} name="trimestre" id="trimestre" className={`form-control ${validated.cTri.valid === 2 && 'is-invalid'} ${validated.cTri.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {fichaEncontrada.programaFicha ? (
//                               Array.from({ length: parseInt(fichaEncontrada.programaFicha.trimestres) }, (_, index) => (
//                                  <option key={index + 1} value={index + 1}>
//                                     Trimestre {index + 1}
//                                  </option>
//                               ))
//                            ) : (
//                               ''
//                            )}
//                         </select>
//                         {
//                            validated.cTri.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cTri.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="resultadoAQueja">Resultado de Aprendizaje: <font color="red">*</font></label>
//                         <select value={formData.resultadoAQueja} onChange={handleChange} name="resultadoAQueja" id="resultadoAQueja" className={`form-control ${validated.cRA.valid === 2 && 'is-invalid'} ${validated.cRA.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {Array.isArray(resultadosA) &&
//                               resultadosA.map((i) => {
//                                  return (
//                                     <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
//                                  );
//                               })}
//                         </select>
//                         {
//                            validated.cRA.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cRA.msg}</span>
//                            )
//                         }
//                      </div>
//                      <div className="form-group col-6">
//                         <label htmlFor="motivoQueja">Motivo Comité: <font color="red">*</font></label>
//                         <select value={formData.motivoQueja} onChange={handleChange} name="motivoQueja" id="motivoQueja" className={`form-control ${validated.cMC.valid === 2 && 'is-invalid'} ${validated.cMC.valid === 1 && 'is-valid'}`} required>
//                            <option value="">Seleccionar</option>
//                            {claves.motivosQ.map((i) => {
//                               return (
//                                  <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
//                               )
//                            })}
//                         </select>
//                         {
//                            validated.cMC.msg !== "" && (
//                               <span className='text-xs text-red-600'>{validated.cMC.msg}</span>
//                            )
//                         }
//                      </div>
//                   </div>
//                   <div className='form-group'>
//                      <label htmlFor='descripcionMotivo'>Descripción Motivo: <font color="red">*</font></label>
//                      <textarea value={formData.descripcionMotivo} name='descripcionMotivo' id='descripcionMotivo' onChange={handleChange} className={`form-control ${validated.cDesc.valid === 2 && 'is-invalid'} ${validated.cDesc.valid === 1 && 'is-valid'}`} rows="3" required />
//                      {
//                         validated.cDesc.msg !== "" && (
//                            <span className='text-xs text-red-600'>{validated.cDesc.msg}</span>
//                         )
//                      }
//                   </div>
//                </div>
//             </form>
//          </div>
//          <div className="col d-flex justify-content-end">
//             <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
//             <button type="submit" className="smc-success rounded p-2" onClick={handleSubmit}>Crear</button>
//          </div>
//       </Fragment>
//    )
// }

// const ConsultarQuejas = ({ queja }) => {
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    const [Quejas, setQuejas] = useState(queja)
//    const [formData, setFormData] = useState({
//       aprendiz: Quejas.aprendizQueja,
//       ficha: Quejas.aprendizQueja.fichaAprendiz.codigoFicha,
//       motivo: Quejas.motivoQueja.nombreMotivo,
//       programa: Quejas.competenciaQueja.programasCompetencia,
//       descripcion: Quejas.descripcionMotivo,

//    })

//    const handleChange = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//    }


//    return (
//       <Fragment>
//          <form>
//             {/* <input type='hidden' name="ficha" id="ficha" value={ficha.idFicha} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="motivos" id="motivos" value={motivos.idMotivoComite} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="programaF" id="programaF" value={programaF.idProgramaFormativo} className="form-control mb-2" disabled /> */}
//             {/* <input type='hidden' name="aprendiz" id="aprendiz" value={aprendizQ.idAprendiz} className="form-control mb-2" disabled /> */}
//             <input type="hidden" name="usuario" id="usuario" value={user.idUsuario} className="form-control mb-2" disabled />
//             {/* <input type="hidden" name="competencia" id="competencia" value={competencia} className="form-control mb-2" disabled /> */}
//             <div >
//                <div className='col'>
//                   <div className='row justify-content-between'>
//                      <div className="form-group col-4">
//                         <label>Aprendiz:</label>
//                         <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{formData.aprendiz.nombre} {formData.aprendiz.apellidos}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Instructor:</label>
//                         <p className="font-bold">{user.nombre} {user.apellidos}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>ficha:</label>
//                         <p className="font-bold" value={formData.ficha} onChange={handleChange} >{formData.ficha}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Motivos:</label>
//                         <p className="font-bold" value={formData.motivo} onChange={handleChange} >{formData.motivo}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Programa Formativo:</label>
//                         <p className="font-bold" value={formData.programa} onChange={handleChange} >{formData.programa.nombrePF}</p>
//                      </div>
//                      <div className="form-group col-4">
//                         <label>Descripcion:</label>
//                         <p className="font-bold" value={formData.descripcion} onChange={handleChange}  >{formData.descripcion}</p>
//                      </div>
//                   </div>
//                </div>
//                <div className="col d-flex justify-content-end">
//                   <button type="button" className="btn btn-danger mr-2 bg-danger" data-dismiss="modal">Cerrar</button>
//                </div>
//             </div>
//          </form>
//       </Fragment>
//    )
// }



// export {
//    CreateQueja,
//    ConsultarQuejas
// }

import React, { useEffect, useState, Fragment, useMemo } from 'react';
import { create, get, update } from '../../../../config/Api/api';
import jwt_decode from "jwt-decode"
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


const CreateQueja = ({ decision, observa, claves }) => {
   // eslint-disable-next-line
   const [token] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user] = useState(token.userInfo);
   // console.log(user)
   const [formData, setFormData] = useState({
      fichas: "",
      trimestre: "",
      aprendizQueja: "",
      usuarioQueja: user.idUsuario,
      descripcionMotivo: "",
      motivoQueja: "",
      estadoQueja: 1,
      competenciaQueja: "",
      resultadoAQueja: "",
   })


   const [fichaEncontrada, setFichaEncontrada] = useState([])
   const [competencias, setCompetencias] = useState([])
   const [aprendicesF, setAprendizF] = useState([])
   const [resultadosA, setResultadosA] = useState([])
   const [validations, setValidations] = useState({
      cF: {
         valid: 0,
         msg: "",
      },
      cApre: {
         valid: 0,
         msg: "",
      },
      cComp: {
         valid: 0,
         msg: "",
      },
      cTri: {
         valid: 0,
         msg: "",
      },
      cRA: {
         valid: 0,
         msg: "",
      },
      cMC: {
         valid: 0,
         msg: "",
      },
      cDesc: {
         valid: 0,
         msg: "",
      }

   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const handleChange2 = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
      handleFicha()
   }

   const handleChange3 = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
      handleResultados()
   }


   const handleResultados = async () => {
      try {
         var comp = document.querySelector("#competenciaQueja").value
         const data = await get(`resultado-aprendizaje/competencia/${comp}`)
         setResultadosA(data)
      } catch (error) {
         console.error(error)
      }
   }

   const handleFicha = async () => {
      try {
         var f = document.querySelector("#fichas").value
         const data = await get(`fichas/${f}`)
         setFichaEncontrada(data)

         var comp = await get(`competencias/programa/${data.programaFicha.idProgramaFormativo}`)
         setCompetencias(comp)

         var aprendices = await get(`aprendices/ficha/${f}`)
         setAprendizF(aprendices)
      } catch (error) {
         console.error(error)
      }
   }

   const handleSubmit = async () => {
      try {
         const errorChanges = { ...validations }
         if (formData.fichas === '' || formData.aprendizQueja === '' || formData.competenciaQueja === '' || formData.trimestre === '' || formData.resultadoAQueja === '' || formData.motivoQueja === '' || formData.descripcionMotivo === '') {
            if (formData.fichas === '') {
               errorChanges.cF.msg = 'El Campo de Ficha  es Obligatorio'
               errorChanges.cF.valid = 2
            } else {
               errorChanges.cF.msg = ''
               errorChanges.cF.valid = 1
            }
            if (formData.aprendizQueja === '') {
               errorChanges.cApre.msg = 'El Campo de Aprendiz es Obligatorio';
               errorChanges.cApre.valid = 2
            } else {
               errorChanges.cApre.msg = '';
               errorChanges.cApre.valid = 1
            }
            if (formData.competenciaQueja === '') {
               errorChanges.cComp.msg = 'El Campo de Competencia es Obligatorio';
               errorChanges.cComp.valid = 2
            } else {
               errorChanges.cComp.msg = '';
               errorChanges.cComp.valid = 1
            }
            if (formData.trimestre === '') {
               errorChanges.cTri.msg = 'El Campo de Trimestre es Obligatorio';
               errorChanges.cTri.valid = 2
            } else {
               errorChanges.cTri.msg = '';
               errorChanges.cTri.valid = 1
            }
            if (formData.resultadoAQueja === '') {
               errorChanges.cRA.msg = 'El Campo de Resultado de Aprendizaje es Obligatorio';
               errorChanges.cRA.valid = 2
            } else {
               errorChanges.cRA.msg = '';
               errorChanges.cRA.valid = 1
            }
            if (formData.motivoQueja === '') {
               errorChanges.cMC.msg = 'El Campo de Motivo es Obligatorio';
               errorChanges.cMC.valid = 2
            } else {
               errorChanges.cMC.msg = '';
               errorChanges.cMC.valid = 1
            }
            if (formData.descripcionMotivo === '') {
               errorChanges.cDesc.msg = 'El Campo Descripción es Obligatorio';
               errorChanges.cDesc.valid = 2
            } else {
               errorChanges.cDesc.msg = '';
               errorChanges.cDesc.valid = 1
            }
            return setValidations(errorChanges)
         } else {
            errorChanges.cF.msg = '';
            errorChanges.cF.valid = 1
            errorChanges.cApre.msg = '';
            errorChanges.cApre.valid = 1
            errorChanges.cComp.msg = '';
            errorChanges.cComp.valid = 1
            errorChanges.cTri.msg = '';
            errorChanges.cTri.valid = 1
            errorChanges.cRA.msg = '';
            errorChanges.cRA.valid = 1
            errorChanges.cMC.msg = '';
            errorChanges.cMC.valid = 1
            errorChanges.cDesc.msg = '';
            errorChanges.cDesc.valid = 1
            setValidations(errorChanges)

            const clearData = {
               trimestre: formData.trimestre,
               aprendizQueja: formData.aprendizQueja,
               usuarioQueja: user.idUsuario,
               descripcionMotivo: formData.descripcionMotivo,
               motivoQueja: formData.motivoQueja,
               estadoQueja: 1,
               competenciaQueja: formData.competenciaQueja,
               resultadoAQueja: formData.resultadoAQueja,
            }

            const data = await create("quejas", clearData)
            console.log(data)
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Queja Exitosa',
               showConfirmButton: false,
               timer: 1800
            })

            // window.location.reload()

         }
      } catch (error) {
         console.log(error)
      }
   }

   const validated = useMemo(() => {
      return validations
   }, [validations])

   const cancelForm = () => {
      setFormData({
         trimestre: "",
         aprendizQueja: "",
         usuarioQueja: user.idUsuario,
         descripcionMotivo: "",
         motivoQueja: "",
         estadoQueja: 1,
         competenciaQueja: "",
         resultadoAQueja: "",
      })
   }

   return (
      <Fragment>
         <div className="w-f">
            <form className="crearQueja">
               <div className='col' style={{ width: "100%" }}>
                  <div className='row justify-content-between'>
                     <div className="form-group col-6">
                        <label htmlFor="fichas">Ficha: <font color="red">*</font></label>
                        <select value={formData.fichas} onChange={handleChange2} name="fichas" id="fichas" className={`form-control ${validated.cF.valid === 2 && 'is-invalid'} ${validated.cF.valid === 1 && 'is-valid'}`} >
                           <option value="">Seleccionar</option>
                           {claves.fichas.map((i, index) => {
                              return (
                                 <option key={index} data-toggle="tooltip" value={i.codigoFicha}>{i.codigoFicha} - {i.programaFicha.nombrePF}</option>
                              )
                           })}
                        </select>
                        {
                           validated.cF.msg !== "" && (
                              <span className='text-xs text-red-600'>{validated.cF.msg}</span>
                           )
                        }
                     </div>
                     <div className="form-group col-6">
                        <label htmlFor="aprendizQueja">Aprendiz: <font color="red">*</font></label>
                        <select value={formData.aprendizQueja} onChange={handleChange} name="aprendizQueja" id="aprendizQueja" className={`form-control ${validated.cApre.valid === 2 && 'is-invalid'} ${validated.cApre.valid === 1 && 'is-valid'}`} required>
                           <option value="">Seleccionar</option>
                           {aprendicesF.map((i, index) => {
                              return (
                                 <option key={index} data-toggle="tooltip" value={i.idAprendiz}>{i.nombre} {i.apellidos}</option>
                              )
                           })}
                        </select>
                        {validated.cApre.msg !== "" && (<span className='text-xs text-red-600'>{validated.cApre.msg}</span>)}
                     </div>
                  </div>
                  <div className='row justify-content-between'>
                     <div className="form-group col-6">
                        <label htmlFor="competenciaQueja">Competencia: <font color="red">*</font></label>
                        <select value={formData.competenciaQueja} onChange={handleChange3} name="competenciaQueja" id="competenciaQueja" className={`form-control ${validated.cComp.valid === 2 && 'is-invalid'} ${validated.cComp.valid === 1 && 'is-valid'}`} required>
                           <option value="">Seleccionar</option>
                           {competencias.map((i) => {
                              return (
                                 <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
                              )
                           })}
                        </select>
                        {
                           validated.cComp.msg !== "" && (
                              <span className='text-xs text-red-600'>{validated.cComp.msg}</span>
                           )
                        }
                     </div>
                     <div className="form-group col-6">
                        <label htmlFor="trimestre">Trimestre: <font color="red">*</font></label>
                        <select value={formData.trimestre} onChange={handleChange} name="trimestre" id="trimestre" className={`form-control ${validated.cTri.valid === 2 && 'is-invalid'} ${validated.cTri.valid === 1 && 'is-valid'}`} required>
                           <option value="">Seleccionar</option>
                           {fichaEncontrada.programaFicha ? (
                              Array.from({ length: parseInt(fichaEncontrada.programaFicha.trimestres) }, (_, index) => (
                                 <option key={index + 1} value={index + 1}>
                                    Trimestre {index + 1}
                                 </option>
                              ))
                           ) : (
                              ''
                           )}
                        </select>
                        {
                           validated.cTri.msg !== "" && (
                              <span className='text-xs text-red-600'>{validated.cTri.msg}</span>
                           )
                        }
                     </div>
                     <div className="form-group col-6">
                        <label htmlFor="resultadoAQueja">Resultado de Aprendizaje: <font color="red">*</font></label>
                        <select value={formData.resultadoAQueja} onChange={handleChange} name="resultadoAQueja" id="resultadoAQueja" className={`form-control ${validated.cRA.valid === 2 && 'is-invalid'} ${validated.cRA.valid === 1 && 'is-valid'}`} required>
                           <option value="">Seleccionar</option>
                           {Array.isArray(resultadosA) &&
                              resultadosA.map((i) => {
                                 return (
                                    <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
                                 );
                              })}
                        </select>
                        {
                           validated.cRA.msg !== "" && (
                              <span className='text-xs text-red-600'>{validated.cRA.msg}</span>
                           )
                        }
                     </div>
                     <div className="form-group col-6">
                        <label htmlFor="motivoQueja">Motivo Comité: <font color="red">*</font></label>
                        <select value={formData.motivoQueja} onChange={handleChange} name="motivoQueja" id="motivoQueja" className={`form-control ${validated.cMC.valid === 2 && 'is-invalid'} ${validated.cMC.valid === 1 && 'is-valid'}`} required>
                           <option value="">Seleccionar</option>
                           {claves.motivosQ.map((i) => {
                              return (
                                 <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
                              )
                           })}
                        </select>
                        {
                           validated.cMC.msg !== "" && (
                              <span className='text-xs text-red-600'>{validated.cMC.msg}</span>
                           )
                        }
                     </div>
                  </div>
                  <div className='form-group'>
                     <label htmlFor='descripcionMotivo'>Descripción Motivo: <font color="red">*</font></label>
                     <textarea value={formData.descripcionMotivo} name='descripcionMotivo' id='descripcionMotivo' onChange={handleChange} className={`form-control ${validated.cDesc.valid === 2 && 'is-invalid'} ${validated.cDesc.valid === 1 && 'is-valid'}`} rows="3" required />
                     {
                        validated.cDesc.msg !== "" && (
                           <span className='text-xs text-red-600'>{validated.cDesc.msg}</span>
                        )
                     }
                  </div>
               </div>
            </form>
         </div>
         <div className="col d-flex justify-content-end">
            <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
            <button type="submit" className="s-button-success rounded p-2" onClick={handleSubmit}>Crear</button>
         </div>
      </Fragment>
   )
}

const ConsultarQuejas = ({ queja }) => {
   const [token] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user] = useState(token.userInfo);
   const [Quejas] = useState(queja)
   const [formData, setFormData] = useState({
      aprendiz: Quejas.aprendizQueja,
      ficha: Quejas.aprendizQueja.fichaAprendiz.codigoFicha,
      motivo: Quejas.motivoQueja.nombreMotivo,
      programa: Quejas.competenciaQueja.programasCompetencia,
      descripcion: Quejas.descripcionMotivo,
      archivoQueja: Quejas.archivoQueja,
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }


   return (
      <Fragment>
         <form>
            {/* <input type='hidden' name="ficha" id="ficha" value={ficha.idFicha} className="form-control mb-2" disabled /> */}
            {/* <input type='hidden' name="motivos" id="motivos" value={motivos.idMotivoComite} className="form-control mb-2" disabled /> */}
            {/* <input type='hidden' name="programaF" id="programaF" value={programaF.idProgramaFormativo} className="form-control mb-2" disabled /> */}
            {/* <input type='hidden' name="aprendiz" id="aprendiz" value={aprendizQ.idAprendiz} className="form-control mb-2" disabled /> */}
            <input type="hidden" name="usuario" id="usuario" value={user.idUsuario} className="form-control mb-2" disabled />
            {/* <input type="hidden" name="competencia" id="competencia" value={competencia} className="form-control mb-2" disabled /> */}
            <div >
               <div className='col'>
                  <div className='row justify-content-between'>
                     <div className="form-group col-4">
                        <label>Aprendiz:</label>
                        <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{formData.aprendiz.nombre} {formData.aprendiz.apellidos}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Instructor:</label>
                        <p className="font-bold">{user.nombre} {user.apellidos}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>ficha:</label>
                        <p className="font-bold" value={formData.ficha} onChange={handleChange} >{formData.ficha}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Motivos:</label>
                        <p className="font-bold" value={formData.motivo} onChange={handleChange} >{formData.motivo}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Programa Formativo:</label>
                        <p className="font-bold" value={formData.programa} onChange={handleChange} >{formData.programa.nombrePF}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Descripcion:</label>
                        <p className="font-bold" value={formData.descripcion} onChange={handleChange}  >{formData.descripcion}</p>
                     </div>

                     <div className="form-group col-4">
                        <label>Archivo:</label>
                        <p className="font-bold" value={formData.archivoQueja} onChange={handleChange}>Hola</p>
                     </div>
                  </div>
               </div>
               <div className="col d-flex justify-content-end">
                  <button type="c" className="s-button-cancel rounded p-2" data-dismiss="modal">Cerrar</button>
               </div>
            </div>
         </form>
      </Fragment>
   )
}

const CargaMasivaQuejas = () => {
   const [jsonData, setJsonData] = useState([]);

   const handleFileUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
         const data = event.target.result;
         const workbook = XLSX.read(data, { type: 'binary' });
         const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
         const sheet = workbook.Sheets[sheetName];
         const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

         // Assuming the first row contains column headers
         const headers = json[0];
         const rows = json.slice(1);

         const jsonDataArray = rows.map((row) => {
            const jsonObject = {};
            headers.forEach((header, index) => {
               jsonObject[header] = row[index];
            });
            return jsonObject;
         });

         setJsonData(jsonDataArray);
      };

      reader.readAsBinaryString(file);
   };

   const mostrarEnConsola = () => {
      console.log(jsonData);
   };

   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col">
                  <h1>Subir archivo Excel y mostrar en consola como JSON</h1>
                  <form>
                     <div className="form-group">
                        <input
                           type="file"
                           className="form-control-file"
                           id="excelFile"
                           accept=".xlsx, .xls"
                           onChange={handleFileUpload}
                        />
                     </div>
                     <button
                        type="button"
                        className="btn btn-success bg-success"
                        onClick={mostrarEnConsola}
                     >
                        Mostrar en Consola
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};


// const  CargaMasivaQuejas = () => {
//   const [jsonData, setJsonData] = useState([]);
  
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = event.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
//       const sheet = workbook.Sheets[sheetName];
//       const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
//       // Assuming the first row contains column headers
//       const headers = json[0];
//       const rows = json.slice(1);

//       const jsonDataArray = rows.map((row) => {
//         const jsonObject = {};
//         headers.forEach((header, index) => {
//           jsonObject[header] = row[index];
//         });
//         return jsonObject;
//       });

//       setJsonData(jsonDataArray);
//     };

//     reader.readAsBinaryString(file);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h1>Subir archivo Excel y mostrar en consola como JSON</h1>
//           <Form>
//             <Form.Group>
//               <Form.File 
//                 id="excelFile"
//                 label="Selecciona un archivo Excel"
//                 accept=".xlsx, .xls"
//                 onChange={handleFileUpload}
//               />
//             </Form.Group>
//           </Form>
//           <Button onClick={() => console.log(jsonData)}>Mostrar en Consola</Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// }



export {
   CreateQueja,
   ConsultarQuejas,
   CargaMasivaQuejas
}