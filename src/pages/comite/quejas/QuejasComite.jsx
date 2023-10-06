import React, { Fragment, useEffect,  useState } from "react";
import { get} from "../../../config/Api/api";
import Modal from "../../../components/Modals/Modal";
import { CreateQueja,} from "./components/quejas.forms";
import jwt_decode from "jwt-decode"
import QuejaSinCompletar from "./separadosMotivos/quejaSinCompletar";
import QuejaCitado from "./separadosMotivos/quejaCitado";
import QuejaListado from "./separadosMotivos/quejaListado";
import QuejaEnProceso from "./separadosMotivos/quejaEnProceso";
import QuejaFinalizado from "./separadosMotivos/quejaFinalizado";

const QuejasComite = () => {
   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user] = useState(token.userInfo);
   const [queja, setQueja] = useState([])
   const [ficha, setFichas] = useState([])
   const [motivos, setMotivos] = useState([])
   const [programaFormtivo, setProgramaFormativo] = useState([])
   const [aprendizQueja, setAprendizQueja] = useState([])
   const [compentencia, setCompetencia] = useState([])
   // const [observaciones, setObservaciones] = useState([])
   const [decision, setDecision] = useState([])
   const [sinCompletar, setSinCompletar] = useState([])
   const [listado, setListado] = useState([])
   const [citado, setCitado] = useState([])
   const [enProceso, setEnProceso] = useState([])
   const [finalizada, setFinalizada] = useState([])

   // console.log("MIrar queja: ", decision)

   useEffect(() => {
      const obtenerQuejas = async () => {
         try {
            const dataDesicion = await get("estado-decision")
            setDecision(dataDesicion)

            // const observacionesData = await get('observaciones-aprendiz/1')
            // setObservaciones(observacionesData)

            const dataSC = await get("quejas/estado/1")
            setSinCompletar(dataSC)

            const dataL = await get("quejas/estado/2")
            setListado(dataL)

            const dataC = await get("quejas/estado/3")
            setCitado(dataC)

            const dataEP = await get("quejas/estado/4")
            setEnProceso(dataEP)

            const dataF = await get("quejas/estado/5")
            setFinalizada(dataF)

            const data = await get(`quejas/instructor/${user.idUsuario}`)
            setQueja(data)

            const claveMo = await get("motivos-comite")
            setMotivos(claveMo)

            const claveF = await get("fichas")
            setFichas(claveF)

            const clavePF = await get("programas-formativos")
            setProgramaFormativo(clavePF)

            const claveA = await get("aprendices")
            setAprendizQueja(claveA)

            const claveComp = await get("competencias")
            setCompetencia(claveComp)

         } catch (error) {
            console.log(error)
         }
      }
      obtenerQuejas()
   }, [user])

   return (
      <Fragment>
         <div className="mx-auto" style={{ width: "100%" }}>
            <div className="flex justify-between items-center" >
                  <h2 className='text-4xl pb-2'>Quejas</h2>
                  <Modal children={<CreateQueja claves={{ queja: [...queja], programaF: [...programaFormtivo], aprendizQ: [...aprendizQueja], competencia: [...compentencia], fichas: [...ficha], motivosQ: [...motivos] }} />} 
                     configModal={{
                        identify: "QuejaComite",
                        modalClasses: "",
                        // modalStylesContent: {},
                        nameBtn: "Nueva Queja",
                        btnClasses: "s-button-create p-2 rounded",
                        nameTitle: "Crear Queja",
                     }}
                  />
            </div>
            <h2 className='text-4xl mb-2'></h2>
            <div className='card mb-20'>
               <div className='card-body'>
                  <ul className="nav nav-tabs">
                     <li className="nav-item">
                        <a href="#SC" data-toggle="tab" className="nav-link active">Sin Completar</a>
                     </li>
                     <li className="nav-item">
                        <a href="#L" data-toggle="tab" className="nav-link">Listado</a>
                     </li>
                     <li className="nav-item">
                        <a href="#C" data-toggle="tab" className="nav-link">Citado</a>
                     </li>
                     <li className="nav-item">
                        <a href="#EP" data-toggle="tab" className="nav-link">En Proceso</a>
                     </li>
                     <li className="nav-item">
                        <a href="#F" data-toggle="tab" className="nav-link">Finalizado</a>
                     </li>
                  </ul>
                  <div className="tab-content">
                     <div className="tab-pane active" id="SC">
                        <div className="px-2 pt-4">
                           <QuejaSinCompletar decision={decision} quejasSC={sinCompletar} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="L">
                        <div className="px-2 pt-4">
                           <QuejaListado quejasL={listado} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="C">
                        <div className="px-2 pt-4">
                           <QuejaCitado quejasC={citado} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="EP">
                        <div className="px-2 pt-4">
                           <QuejaEnProceso quejasEp={enProceso} />
                        </div>
                     </div>

                     <div className="tab-pane container fade" id="F">
                        <div className="px-2 pt-4">
                           <QuejaFinalizado quejasF={finalizada}/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
};

export default QuejasComite;