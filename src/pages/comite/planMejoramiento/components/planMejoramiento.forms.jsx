import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { get, create, uploadFiles } from '../../../../config/Api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FinalizarPlan = ({ motivosC, decisiones, aprendices, competencias, resultadosA, planes, ids, user, deleteP,plan, updateP}) => {;

   //const navigate = useNavigate()
  // const [planMejoramiento, setPlanMejoramiento] = useState(plan)
   const [aprendizPlan, setAprendizPlan] = useState([])
   const [planMejora, setplanMejora] = useState([])
   const [getFinalizar] = useState(planes)
   const [archivo, setArchivo] = useState(null)
   const [formData, setFormData] = useState({
      aprendiz: getFinalizar.aprendizPlanMejoramiento.nombre,
      competencia: getFinalizar.quejaPlanMejoramiento.competenciaQueja.nombreCompetencia,
      resultado: getFinalizar.quejaPlanMejoramiento.resultadoAQueja,
   })
   const [validations, setValidations] = useState({
      vED: {
         valid: 0,
         msg: "",
      },
      vM: {
         valid: 0,
         msg: "",
      },
   })
   // const [otherData, setOtherData] = useState({
   //    trimestre: "",
   // })

   useEffect(() => {
      const getPlan = async () => {
         try {
            const planU = await get(`plan-mejoramiento/${planes.idPlanMejoramiento}`)
            if (planU) {
               setplanMejora([planU])

            } else {
               console.log("No se encontró el plan de mejoramiento ")
            }
         } catch (error) {
            console.log(error)
         }
      }
      setAprendizPlan(aprendices)
      getPlan()
   }, [aprendices, planMejora])

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })

   }

   // const handleFileChange = (e) => {
   //    const selectorArchivo = e.target.files[0]
   //    setArchivo(selectorArchivo)
   // }



   const handleSubmit = async (id) => {
      try {

         const errorChanges = { ...validations }
         if (decisiones === '' || motivosC === '') {
            if (decisiones === '') {
               errorChanges.cF.msg = 'El Campo de Decisiones es Obligatorio'
               errorChanges.cF.valid = 2
            } else {
               errorChanges.cF.msg = ''
               errorChanges.cF.valid = 1
            }
            if (motivosC === '') {
               errorChanges.cF.msg = 'El Campo de Motivos es Obligatorio'
               errorChanges.cF.valid = 2
            } else {
               errorChanges.cF.msg = ''
               errorChanges.cF.valid = 1
            }
            return setValidations(errorChanges)
         } else {
            errorChanges.vED.msg = '';
            errorChanges.vED.valid = 1;
            errorChanges.vM.msg = '';
            errorChanges.vM.valid = 1
            setValidations(errorChanges)

            const planTeminado = planMejora.map((i) => {
               const form = document.querySelector(`#planMejoramientoForm${i.idPlanMejoramiento}`);
               const aprendiz = form.elements["aprendices"].value
               const competencia = form.elements["competencias"].value
               const motivoPlanMejoramiento = form.elements["motivoPlanMejoramiento"].value
               const decisionPlanMejoramiento = form.elements["decisionPlanMejoramiento"].value
               const descripcionMotivo = form.elements["descripcionMotivo"].value
               const archivoPlanMejoramiento = archivo ? archivo.name : ''
               console.log("archivosPlanMejora", archivoPlanMejoramiento)
               return {
                  idPlanMejoramiento: i.idPlanMejoramiento,
                  aprendiz,
                  competencia,
                  motivoPlanMejoramiento,
                  decisionPlanMejoramiento,
                  descripcionMotivo,
                  quejas: i.quejaPlanMejoramiento,
                  planes,
                  archivoPlanMejoramiento
               };
            });
            await Promise.all(
               planTeminado.map(async (i) => {
                  if (i.decisionPlanMejoramiento === "2") {
                     if (i.archivoPlanMejoramiento) {
                        const newQuejaCA = {
                           aprendizQueja: i.aprendiz,
                           usuarioQueja: user,
                           trimestre: i.quejas.trimestre,
                           competenciaQueja: i.competencia,
                           resultadoAQueja: planes.quejaPlanMejoramiento.resultadoAQueja,
                           archivoQueja: i.archivoPlanMejoramiento,
                           estadoQueja: i.quejas.estadoQueja = 2,
                           motivoQueja: i.motivoPlanMejoramiento,
                           descripcionMotivo: i.descripcionMotivo,
                        }
                        const crearQuejaCA = await create("quejas", newQuejaCA)
                        console.log("Con archivo", crearQuejaCA)
                     } else {
                        const newQuejaSA = {
                           aprendizQueja: i.aprendiz,
                           usuarioQueja: user,
                           trimestre: i.quejas.trimestre,
                           competenciaQueja: i.competencia,
                           resultadoAQueja: planes.quejaPlanMejoramiento.resultadoAQueja,
                           estadoQueja: i.quejas.estadoQueja = 1,
                           motivoQueja: i.motivoPlanMejoramiento,
                           descripcionMotivo: i.descripcionMotivo,
                        }
                        const crearQuejaSA = await create("quejas", newQuejaSA)
                        console.log("Con archivo", crearQuejaSA)
                     }

                     Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Has Finalizado el Plan de Mejoramiento Exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                     })
                     updateP(id)
                     window.location.reload()


                  } else if (i.decisionPlanMejoramiento === "1") {
                     Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Has Finalizado el Plan de Mejoramiento Exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                     })
                     updateP(id)
                     window.location.reload()
                  }
                  // return navigate('/plan-mejoramiento')  

                  // deleteP(id);   
                  if (!archivo) {
                     return
                  }
                  const formD = new FormData()
                  formD.append("file", archivo)
                  formD.append("trimestre", planMejora.trimestre)
                  const data = await uploadFiles(`plan-mejoramiento/upload/archivo`, formD)
                  { console.log("Si dió: ", data) }
               }
               )
            )
         }
      } catch (error) {
         console.log(error)
      }
   }

   const validated = useMemo(() => {
      return validations
   }, [validations])

   return (
      <Fragment>
         {
            planMejora.map((i) => {
               return (
                  <form id={`planMejoramientoForm${i.idPlanMejoramiento}`} key={i.idPlanMejoramiento}>
                     <input type="hidden" name="idPlanMejoramiento" id="idPlanMejoramiento" value={i.idPlanMejoramiento} className="form-control mb-2" disabled />
                     <input type='hidden' name="aprendices" id="aprendices" value={aprendices.idAprendiz} className="form-control mb-2" disabled />
                     <input type="hidden" name="usuario" id="usuario" value={user} className="form-control mb-2" disabled />
                     <input type="hidden" name="competencias" id="competencias" value={competencias.idCompetencia} className="form-control mb-2" disabled />
                     <input type="hidden" name="resultadosA" id="resultadosA" value={resultadosA.idResultadoAprendizaje} className="form-control mb-2" disabled />
                     <div className='col'>
                        <div className='row justify-content-between'>
                           <div className="form-group col-4">
                              <label>Aprendiz:</label>
                              <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{aprendizPlan.nombre} {aprendizPlan.apellidos}</p>
                           </div>
                           <div className="form-group col-4">
                              <label>Competencia:</label>
                              <p className="font-bold" value={formData.competencia} onChange={handleChange}>{competencias.nombreCompetencia}</p>
                           </div>
                           <div className="form-group col-4">
                              <label>Resultado:</label>
                              <p className="font-bold" value={formData.resultado} onChange={handleChange}>{resultadosA.nombreRA}</p>
                           </div>
                           <hr className="my-4 border-top" />
                           <div className="form-group col-6">
                              <label htmlFor="">Estado Decision: <font color="red">*</font></label>
                              <select name={`decisionPlanMejoramiento`} id="decisionP" className={`form-control ${validated.vED.valid === 2 && 'is-invalid'} ${validated.vED.valid === 1 && 'is-valid'}`} required>
                                 <option value="">Seleccionar</option>
                                 {decisiones.map((i) => {
                                    return (
                                       <option key={i.idEstadoDecision} value={i.idEstadoDecision}>{i.nombreEstadoDecision}</option>
                                    );
                                 })}
                              </select>
                              {
                                 validated.vED.msg !== "" && (
                                    <span className='text-xs text-red-600'>{validated.vED.msg}</span>
                                 )
                              }
                           </div>
                           <div className="form-group col-6">
                              <label htmlFor="">Motivos: <font color="red">*</font></label>
                              <select name={`motivoPlanMejoramiento`} id="" className={`form-control ${validated.vM.valid === 2 && 'is-invalid'} ${validated.vM.valid === 1 && 'is-valid'}`} required>
                                 <option value="">Seleccionar</option>
                                 {motivosC.map((i) => {
                                    return (
                                       <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
                                    );
                                 })}
                              </select>
                              {
                                 validated.vM.msg !== "" && (
                                    <span className='text-xs text-red-600'>{validated.vM.msg}</span>
                                 )
                              }
                           </div>
                        </div>
                        <div className=''>
                           <div className='form-group'>
                              <label htmlFor=''>Descripcion Motivo:</label>
                              <textarea name='descripcionMotivo' className="form-control" rows="3" ></textarea>
                           </div>
                        </div>

                        {/* <div className="form-group">
                           <label htmlFor="file">Subir Archivo</label>
                           <br />
                           <input type="file" name="file" id="file" onChange={handleFileChange} className="form-input max-w-[400px] border-2 border-gray-200 rounded hover:bg-gray-200" />
                        </div> */}
                     </div>
                     <div className="col d-flex justify-content-end">
                        <button type="button" className="btn btn-danger mr-2 bg-danger" data-dismiss="modal">Cerrar</button>
                        <button type="submit" onClick={() => handleSubmit(i.idPlanMejoramiento)} className="btn btn-success bg-success">Finalizar</button>
                     </div>
                  </form>
               )
            })
         }
      </Fragment>
   )
}

const ConsultarPlan = ({ plan, aprendices, competencias, resultadosA, usuario }) => {
   const [getConsulta, setGetConsulta] = useState(plan)
   const [formData, setFormData] = useState({
      aprendiz: getConsulta.aprendizPlanMejoramiento,
      user: getConsulta.usuarioPlanMejoramiento,
      ficha: getConsulta.aprendizPlanMejoramiento.fichaAprendiz.codigoFicha,
      competencia: getConsulta.quejaPlanMejoramiento.competenciaQueja.nombreCompetencia,
      resultado: getConsulta.quejaPlanMejoramiento.resultadoAQueja.nombreRA,
      descripcion: getConsulta.quejaPlanMejoramiento.descripcionMotivo,
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }
   return (
      <Fragment>
         <form>
            <input type='hidden' name="aprendices" id="aprendices" value={aprendices.nombre} className="form-control mb-2" disabled />
            <input type="hidden" name="usuario" id="usuario" value={usuario.idUsuario} className="form-control mb-2" disabled />
            <input type="hidden" name="competencias" id="competencias" value={competencias.idCompetencia} className="form-control mb-2" disabled />
            <input type="hidden" name="resultadosA" id="resultadosA" value={resultadosA.idResultadoAprendizaje} className="form-control mb-2" disabled />
            <div >
               <div className='col'>
                  <div className='row justify-content-between'>
                     <div className="form-group col-4">
                        <label>Aprendiz:</label>
                        <p className="font-bold" value={formData.aprendiz} onChange={handleChange}>{formData.aprendiz.nombre} {formData.aprendiz.apellidos}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Instructor:</label>
                        <p className="font-bold" value={formData.user} onChange={handleChange}>{formData.user.nombre} {formData.user.apellidos}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Ficha:</label>
                        <p className="font-bold" value={formData.ficha} onChange={handleChange}>{formData.ficha}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Competencia:</label>
                        <p className="font-bold" value={formData.competencia} onChange={handleChange}>{formData.competencia}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Resultado:</label>
                        <p className="font-bold" value={formData.resultado} onChange={handleChange}>{formData.resultado}</p>
                     </div>
                     <div className="form-group col-4">
                        <label>Descripción:</label>
                        <p className="font-bold" value={formData.descripcion} onChange={handleChange}>{formData.descripcion}</p>
                     </div>
                  </div>
               </div>
               <div className="col d-flex justify-content-end">
                  <button type="button" className="btn btn-danger mr-2 bg-danger" data-dismiss="modal">Cerrar</button>
               </div>
            </div>
         </form>

      </Fragment>
   )
}

export {
   FinalizarPlan,
   ConsultarPlan
}

