import React, { Fragment, useEffect, useState } from 'react';
import { ConsultarPlan, FinalizarPlan } from './components/planMejoramiento.forms';
import { get,update} from '../../../config/Api/api';
import DataTable from '../../../components/Datatable/Datatable';
import UpdateModal from "../../../components/Modals/UpdateModal";
import jwt_decode from "jwt-decode";
import PlanFinalizados from './Decisiones/noAprobados';

const PlanMejoramiento = () => {
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")));
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo)
   // const [planesOcultos, setPlanesOcultos] = useState([])
   const [plan, setPlanesM] = useState([])
   const [motivos, setMotivos] = useState([])
   const [decision, setDecision] = useState([])
   const [planFinalizados, setPlanFinalizados] = useState([])
console.log("No s",plan)
const filtrarPlanes = (plan) => {
   return plan.filter((plan) => plan.activo)
}
   useEffect(() => {
      const obtenerPlanes = async () => {
         try {
            const dataA = await get("plan-mejoramiento/motivos/1")
            setPlanFinalizados(dataA)

            const dataNA = await get("plan-mejoramiento/motivos/2")
            setPlanFinalizados(dataNA)

            const plan = await get("plan-mejoramiento")
            const planesActivos = filtrarPlanes(plan)
            setPlanesM(planesActivos)

            const motivosCampo = await get("motivos-comite")
            setMotivos(motivosCampo)

            const decisionCampo = await get("estado-decision")
            setDecision(decisionCampo)
         } catch (error) {
            console.log(error)
         }
      }
      obtenerPlanes()
   }, [])

   

   // const handleEliminar = (id) =>{
   //    // e.preventDefaul()
   //    const eliminar = plan.filter((item) => item.idPlanMejoramiento !== id)
   //    setPlanesO(eliminar)
   // }

   const updatePlan = async (id) => {
      //const updateplan = await update(`plan-mejoramiento/inactivo/${id}`)
      console.log(id)
      setPlanesM(plan.filter((i) => i.idPlanMejoramiento === id));
   }

   const headers = [
      
      { title: "ID", prop: "idPlanMejoramiento" },
      { title: "Aprendiz", prop: ["aprendizPlanMejoramiento.nombre", "aprendizPlanMejoramiento.apellidos"] },
      { title: "Instructor a cargo", prop: ["usuarioPlanMejoramiento.nombre", "usuarioPlanMejoramiento.apellidos"] },
      { title: "Ficha Aprendiz", prop: "aprendizPlanMejoramiento.fichaAprendiz.codigoFicha" },
      {
         title: "Acciones", prop: "actions", cell: (row) => {
            return (
               <div className='row' >
                  <div className='col-md-4 '>
                     <UpdateModal
                        configModal={{
                           identify: `${row.idPlanMejoramiento}`,
                           modalClasses: "",
                           // modalStylesContent: {},
                           nameBtn: "Finalizar",
                           btnClasses: "s-button-others p-2 rounded",
                           nameTitle: `Finalizar ${row.aprendizPlanMejoramiento.nombre}`,
                        }}
                        children={
                           <FinalizarPlan
                              plan={plan}
                              updateP={updatePlan} 
                              user={user.idUsuario}
                              decisiones={decision}
                              competencias={row.quejaPlanMejoramiento.competenciaQueja}
                              resultadosA={row.quejaPlanMejoramiento.resultadoAQueja}
                              aprendices={row.aprendizPlanMejoramiento}
                              motivosC={motivos}
                              planes={row}
                              ids={row.idPlanMejoramiento}
                           />
                        }
                     />
                  </div>
                  <div className='col-md-2'>
                     <UpdateModal
                        configModal={{
                           identify: `${row.trimestre}`,
                           modalClasses: "",
                           // modalStylesContent: {},
                           nameBtn: "Consultar",
                           btnClasses: "s-button-others p-2 rounded",
                           nameTitle: `${row.aprendizPlanMejoramiento.nombre} - ${row.aprendizPlanMejoramiento.apellidos}`,
                        }}
                        children={
                           <ConsultarPlan
                              usuario={user}
                              decisiones={decision}
                              competencias={row.quejaPlanMejoramiento.competenciaQueja}
                              resultadosA={row.quejaPlanMejoramiento.resultadoAQueja}
                              aprendices={row.aprendizPlanMejoramiento}
                              plan={row}
                              ficha={row.aprendizPlanMejoramiento.fichaAprendiz}
                           />
                        }
                     />
                  </div>
               </div>
            )
         }
      },

   ]


   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }

   return (
      <Fragment>
         <div className="mx-auto" style={{ width: "100%" }}>
            <div className="row md-4" >
               <div className="col-md-10">
                  <h2 className='text-4xl pb-2'>Planes de mejoramiento</h2>
               </div>
            </div>

            <h2 className='text-4xl mb-2'></h2>
            <div className='card mb-20'>
               <div className='card-body'>
                  <ul className="nav nav-tabs">
                     <li className="nav-item">
                        <a href="#TP" data-toggle="tab" className="nav-link active">Planes de Mejoramiento</a>
                     </li>
                     <li className="nav-item">
                        <a href="#PF" data-toggle="tab" className="nav-link">Planes Finalizados</a>
                     </li>
                  </ul>
                  <div className="tab-content">
                     <div className="tab-pane active" id="TP">
                        <div className="px-2 pt-4">
                           <DataTable
                              headers={headers}
                              body={plan}
                              configTable={configTable}
                           />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="PF">
                        <div className="px-2 pt-4">
                           <PlanFinalizados noApro={plan} />
                           {/* {console.log(planFinalizados)} */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )

};

export default PlanMejoramiento;


