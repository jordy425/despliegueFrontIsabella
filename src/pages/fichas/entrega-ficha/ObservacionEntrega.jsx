import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { create, get } from "../../../config/Api/api";

const ObservacionesAprendiz = () => {
   const navigate = useNavigate()
   const { ficha } = useParams()
   // eslint-disable-next-line
   const [entregaData, setEntregaData] = useState(JSON.parse(localStorage.getItem("entregaFicha")))
   const [competencia, setCompetencia] = useState([])
   const [resultado, setResultado] = useState([])
   const [motivos, setMotivos] = useState([])
   const [decision, setDecision] = useState([])

   const [aprendices, setAprendices] = useState([])
   const [aprendicesForms, setAprendicesForms] = useState([])

   useEffect(() => {
      if (entregaData === null) {
         const alert = async () => {
            await Swal.fire({
               position: "center",
               icon: "error",
               title: "ERROR",
               text: `No ha realizado una entrega de Ficha`,
               showConfirmButton: false,
               timer: 1500,
            })
         }
         alert()
         navigate(`/fichas/${ficha}`)
      }
      const loadData = async () => {
         const dataCompetencia = await get(`competencias/${entregaData.competenciaEntregaFicha}`);
         setCompetencia(dataCompetencia)

         const dataResultado = await get(`resultado-aprendizaje/${entregaData.resultadoEntregaFicha}`)
         setResultado(dataResultado)

         const dataAprendices = await get(`aprendices/ficha/${ficha}`)
         setAprendices(dataAprendices)

         if (aprendicesForms.length === 0) {
            const apf = []
            for (let i = 0; i < dataAprendices.length; i++) {
               apf.push({
                  trimestre: entregaData.trimestre,
                  ObservacionAprendiz: "",
                  aprendizObservacion: dataAprendices[i].idAprendiz,
                  usuarioObservacion: entregaData.usuarioEntregaFicha,
                  decisionObservacion: "",
                  motivoQueja: "",
                  descripcionMotivo: "",
                  competenciaObservacion: entregaData.competenciaEntregaFicha,
                  resultadoAObservacion: entregaData.resultadoEntregaFicha,
                  entregaObservacion: "",
                  ID: i
               })
            }
            setAprendicesForms(apf)
         }

         const motivosSelect = await get("motivos-comite")
         setMotivos(motivosSelect)

         const decisionSelect = await get("estado-decision")
         setDecision(decisionSelect)
      }
      loadData()
   }, [entregaData])

   const handleChange = (e, id) => {
      const { name, value } = e.target;

      const setData = [...aprendicesForms]
      setData.map((i, index) => {
         if (i.ID === id) {
            i[name] = value
         }
      })
      setAprendicesForms(setData)
   }

   const cancelEntrega = async () => {
      localStorage.removeItem("entregaFicha")
      await Swal.fire({
         position: "center",
         icon: "success",
         title: "Correcto",
         text: `No has realizado la entrega de Ficha`,
         showConfirmButton: false,
         timer: 1500,
      })
      navigate(`/fichas/${ficha}`)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      const createEntrega = await create("entrega-ficha", entregaData)
      await Promise.all(aprendicesForms.map(async (i) => {
         const formData = {
            trimestre: i.trimestre,
            ObservacionAprendiz: i.ObservacionAprendiz,
            aprendizObservacion: i.aprendizObservacion,
            usuarioObservacion: i.usuarioObservacion,
            decisionObservacion: i.decisionObservacion,
            competenciaObservacion: i.competenciaObservacion,
            resultadoAObservacion: i.resultadoAObservacion,
            entregaObservacion: createEntrega.idEntregaFicha,
         }
         const dataObservacion = await create("observaciones-aprendiz", formData)

         if (i.motivoQueja !== 1) {
            const formDataQueja = {
               trimestre: i.trimestre,
               aprendizQueja: i.aprendizObservacion,
               usuarioQueja: i.usuarioObservacion,
               descripcionMotivo: i.descripcionMotivo,
               motivoQueja: i.motivoQueja,
               competenciaQueja: i.competenciaObservacion,
               resultadoAQueja: i.resultadoAObservacion,
               estadoQueja: 1,
               observacionQueja: dataObservacion.idObservacionAprendiz
            }
            await create("quejas", formDataQueja)
         }

      }))

      await Swal.fire({
         position: "center",
         icon: "success",
         title: "Correcto",
         text: `Has realizado la entrega de Ficha`,
         showConfirmButton: false,
         timer: 1500,
      })
      localStorage.removeItem("entregaFicha")
      navigate(`/fichas/${ficha}`)
   }

   return (
      <Fragment>
         <h2 className="text-4xl pb-2">Observaciones de Aprendices - Ficha {ficha}</h2>
         <div className="card mb-4">
            <div className="card-body">
               <div className="col">
                  <div className="col d-flex">
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Trimestre:</label>
                           <h5 className="font-bold text-lg">Trimestre - {entregaData.trimestre}</h5>
                        </div>
                     </div>
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Competencia:</label>
                           <h5 className="font-bold text-lg">{competencia ? competencia.nombreCompetencia : null}</h5>
                        </div>
                     </div>
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Resultado de Aprendizaje:</label>
                           <h5 className="font-bold text-lg">{resultado ? resultado.nombreRA : null}</h5>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="card mb-20">
            <div className="card-body p-2">
               <div className="p-4">
                  {aprendices.map((i, index) => (
                     <>
                        <form className="form" method="POST" key={index} >
                           <div>
                              <div className="row">
                                 <div className="col">
                                    <div className="form-group">
                                       <label>Aprendiz:</label>
                                       <h5 className="font-bold text-lg">{i.nombre} {i.apellidos}</h5>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <label>Observación Aprendiz: <font color="red">*</font></label>
                                       <textarea className={`form-control`} onChange={(e) => handleChange(e, index)} name={`ObservacionAprendiz`} rows="1"></textarea>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <label>Decisión: <font color="red">*</font></label>
                                       <select className={`form-control`} onChange={(e) => handleChange(e, index)} name={`decisionObservacion`}>
                                          <option value="">-- --</option>
                                          {decision.map((i) => (
                                             <option value={i.idEstadoDecision}>{i.nombreEstadoDecision}</option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <label>Motivo Comité: <font color="red">*</font></label>
                                       <select className={`form-control`} onChange={(e) => handleChange(e, index)} name={`motivoQueja`}>
                                          <option value="">-- --</option>
                                          {motivos.map((i) => (
                                             <option value={i.idMotivoComite}>{i.nombreMotivo}</option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="form-group">
                                       <label>Descripción motivo: <font color="red">*</font></label>
                                       <textarea className={`form-control`} onChange={(e) => handleChange(e, index)} name={`descripcionMotivo`} rows="1"></textarea>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </form>
                        <hr className="my-4 border-top" />
                     </>
                  ))}
                  <div className="flex justify-end items-start" >
                     <div className="form-group">
                        <button type="button" onClick={cancelEntrega} className="p-2 rounded s-button-cancel mr-2">Cancelar</button>
                        <button type="submit" onClick={handleSubmit} className="p-2 rounded s-button-success">Guardar</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment >
   );
};

export default ObservacionesAprendiz