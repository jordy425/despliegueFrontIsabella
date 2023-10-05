import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { get } from "../../../config/Api/api";
import DataTable from "../../../components/Datatable/Datatable";

const ConsultarEntrega = () => {
   const { ficha, idEntrega } = useParams()
   const [observaciones, setObservaciones] = useState([])
   const [infoEntrega, setInfoEntrega] = useState([])

   useEffect(() => {
      const loadData = async () => {
         const dataObservaciones = await get(`observaciones-aprendiz/entrega/${idEntrega}`)
         setObservaciones(dataObservaciones)

         const dataEntrega = await get(`entrega-ficha/${idEntrega}`)
         setInfoEntrega(dataEntrega)
      }
      loadData()
   }, [idEntrega])

   const headers = [
      { title: "Trimestre", prop: "trimestre" },
      { title: "Aprendiz", prop: ["aprendizObservacion.nombre", "aprendizObservacion.apellidos"] },
      { title: "Instructor", prop: ["usuarioObservacion.nombre", "usuarioObservacion.apellidos"] },
      { title: "Instructor", prop: "decisionObservacion.nombreEstadoDecision" },
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
         <div className="flex justify-between items-center">
            <h2 className="text-4xl pb-2">Entrega de la Ficha {ficha}</h2>
            <Link to={{ pathname: `/fichas/${ficha}` }}><button type="button" className={`s-button-cancel rounded p-2`} >Volver</button></Link>
         </div>
         <div className="card mb-4">
            <div className="card-body">
               <div className="col">
                  <div className="col d-flex">
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Trimestre:</label>
                           <h5 className="font-bold text-lg">Trimestre - </h5>
                        </div>
                     </div>
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Competencia:</label>
                           <h5 className="font-bold text-lg"></h5>
                        </div>
                     </div>
                     <div className="col">
                        <div className="form-group">
                           <label htmlFor="">Resultado de Aprendizaje:</label>
                           <h5 className="font-bold text-lg"></h5>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="card mb-20">
            <div className="card-body p-2">
               <div className="p-4">
                  <DataTable 
                     headers={headers}
                     body={observaciones}
                     configTable={configTable}
                  />                  
               </div>
            </div>
         </div>
      </Fragment >
   );

}

export default ConsultarEntrega