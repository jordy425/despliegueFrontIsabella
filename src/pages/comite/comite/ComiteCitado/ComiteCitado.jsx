import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line
import { get, update } from "../../../../config/Api/api";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const ComiteCitado = () => {
   const navigate = useNavigate()
   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo)
   const { comite } = useParams("comite")
   const [comiteCita, setComiteCita] = useState([])
   const [quejas, setQuejas] = useState([])
   const [decision, setDecision] = useState([])

   useEffect(() => {
      const obtenerDatos = async () => {
         try {
            const comiteData = await get(`comite/${comite}`)
            setComiteCita(comiteData)

            const quejasAprendices = await get(`quejas/comite/${comite}`)
            setQuejas(quejasAprendices)

            const decisionSelect = await get("decision-comite")
            setDecision(decisionSelect)
         } catch (error) {
            console.error(error)
         }
      }
      obtenerDatos()
   }, [comite])

   // eslint-disable-next-line
   const optionsDate = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
   };
   // const formattedFecha = new Intl.DateTimeFormat('en-US', optionsDate).format(new Date(comiteCita.fechaHoraInicio));

   // ! Here
   const handleFinalizarComite = async () => {
      try {
         const quejasTerminadas = quejas.map((i) => {
            const form = document.querySelector(`#decisionesQuejasForm${i.idQueja}`);
            const asisteComite = form.elements["asisteComite"].checked;
            const decisionQueja = form.elements["decisionQueja"].value;
            const decisionQuejaContent = form.elements["decisionQueja"].innerHTML;
            // const otraDecision = form.elements["otraDecision"].value;
            const aprendiz = form.elements["aprendiz"].value;

            return {
               idQueja: i.idQueja,
               asisteComite,
               decisionQueja,
               decisionQuejaContent,
               // otraDecision,
               aprendiz
            };
         });

         await Promise.all(
            quejasTerminadas.map(async (i) => {
               const queja = {
                  asisteComite: i.asisteComite,
                  decisionQueja: i.decisionQueja,
                  // otraDecision: i.otraDecision,
                  estadoQueja: 4,
               }

               const updateQueja = await update(`quejas/${i.idQueja}`, queja)
               console.log(updateQueja)

               // if (updateQueja && i.decisionQueja === "1") {
               //    const newPlan = {
               //       quejaPlanMejoramiento: i.idQueja,
               //       usuarioPlanMejoramiento: user.idUsuario,
               //       aprendizPlanMejoramiento: i.aprendiz,
               //    }
               //    const a = await create("plan-mejoramiento", newPlan)
               //    console.log(a)
               // }
            })
         );

         const updated = {
            estadoComite: 1,
         }

         await update(`comite/${comiteCita.codigoComite}`, updated)
         // console.log(a)
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Completado",
            text: `Comité Guardado`,
            showConfirmButton: false,
            timer: 1500,
         })

         return navigate("/comite")

         // alert('Has completado el comité');
         // window.location.href = "/comite";
      } catch (error) {
         console.log(error)
      }
   };

   return (
      <Fragment>
         <div>
            <div className="card mb-20">
               <div className="card-body">
                  <div className="card-title text-center st-head p-2">
                     <h3 className='text-3xl pb-2 text-center'>Comité - {comiteCita.codigoComite}</h3>
                  </div>
                  <div className="col">
                     <div className="col d-flex">
                        <div className="col">
                           <div className="form-group">
                              <label htmlFor="">Programa Formativo:</label>
                              {comiteCita && comiteCita.pcaComite && comiteCita.pcaComite.programaFormativo && (
                                 <h5 className="font-bold">{comiteCita.pcaComite.programaFormativo.nombrePF}</h5>
                              )}
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <label htmlFor="">Fecha:</label>
                              <h5 className="font-bold">{comiteCita.fechaHoraInicio}</h5>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <label htmlFor="">Link:</label>
                              <h5 className="font-bold">{comiteCita.link}</h5>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-group">
                              <label htmlFor="">Coordinación:</label>
                              {comiteCita && comiteCita.pcaComite && comiteCita.pcaComite.usuario && (
                                 <h5 className="font-bold">{comiteCita.pcaComite.usuario.nombre} {comiteCita.pcaComite.usuario.apellidos}</h5>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="col flex-row">
                        {quejas.map((i, index) => (
                           <form className="form flex justify-between" id={`decisionesQuejasForm${i.idQueja}`} key={i.idQueja}>
                              <div key={i.idQueja}>
                                 <input type="hidden" value={i.idQueja} name="idQueja" id="idQueja" />
                                 <input type="hidden" value={i.aprendizQueja.idAprendiz} name="aprendiz" id="aprendiz" />
                                 <hr className="my-4 border-top" />
                                 <div className="row">
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Asistencia:</label>
                                          <input type="checkbox" name="asisteComite" id="asisteComite" className="form-control" style={{ width: "20px" }} />
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Aprendiz:</label>
                                          <h6 className="font-bold">{i.aprendizQueja.nombre} {i.aprendizQueja.apellidos}</h6>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Instructor:</label>
                                          <h6 className="font-bold">{i.usuarioQueja.nombre} {i.usuarioQueja.apellidos}</h6>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Motivo:</label>
                                          <h6 className="font-bold">{i.motivoQueja.nombreMotivo}</h6>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Descripción Motivo:</label>
                                          <h6 className="font-bold">{i.descripcionMotivo}</h6>
                                       </div>
                                    </div>
                                    <div className="col">
                                       <div className="form-group">
                                          <label>Decisión Comité: <font color="red">*</font></label>
                                          <select className="form-control" name={`decisionQueja`} required>
                                             <option value="">Seleccionar</option>
                                             {decision.map((i) => (
                                                <option key={i.idDecision} value={i.idDecision}>{i.nombreDecision}</option>
                                             ))}
                                          </select>
                                       </div>
                                    </div>
                                    {/* <div className="col">
                                       <div className="form-group">
                                          <label>Descripción (Otro):</label>
                                          <textarea className="form-control" name={`otraDecision`} rows="2"></textarea>
                                       </div>
                                    </div> */}
                                 </div>
                              </div>
                           </form>
                        ))}
                        <div className="flex justify-end items-start">
                           <div className="form-group">
                              <Link to={"/comite"}><button type="button" className="p-2 rounded s-button-cancel mr-2">Cancelar</button></Link>
                              <button type="button" onClick={handleFinalizarComite} className="p-2 rounded s-button-success">Guardar</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default ComiteCitado