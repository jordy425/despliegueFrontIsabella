import { Fragment, useCallback, useEffect, useState } from "react"
import DataTable from "../../../components/Datatable/Datatable"
import { get } from "../../../config/Api/api"
import { Link } from "react-router-dom"

const ProyectosFormativos = () => {
   const headers = [
      { title: "Programa Formativo", prop: "fichaGrupo.programaFicha.nombrePF" },
      { title: "Ficha", prop: "fichaGrupo.codigoFicha" },
      { title: "Nombre Proyecto", prop: "nombreProyecto" },
      { title: "Acciones", prop: "actions", cell: (row) => {
         return (
            <Link to={`/proyectosFormativos/gp/${row.idGrupoProyecto}`}><button type="button" className="s-button-consult rounded p-2">Consultar</button></Link>
         )
      }},
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
   const [grupos, setGrupos] = useState([])

   const loadData = useCallback(async () => {
      try {
         const data = await get("grupo-proyecto")
         setGrupos(data)
      } catch (error) {
         console.log(error)
      }
   }, [])

   useEffect(() => {
      loadData()
   }, [loadData])

   return (
      <Fragment>
         <h2 className='text-4xl pb-2'>Proyectos Formativos</h2>
         <div className='card mb-20'>
            <div className='card-body'>
               <DataTable
                  headers={headers}
                  body={grupos}
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   )
}

export default ProyectosFormativos