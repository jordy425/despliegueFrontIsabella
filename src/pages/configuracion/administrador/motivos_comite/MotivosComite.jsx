import { useCallback, useEffect, useState } from "react"
import { get } from "../../../../config/Api/api"
import DataTable from "../../../../components/Datatable/Datatable"
import { CreateMotivo, UpdateMotivo } from "./components/motivos_comite.forms"
import Modal from "../../../../components/Modals/Modal"
import UpdateModal from "../../../../components/Modals/UpdateModal"

const MotivosComite = () => {
   const headers = [
      { title: "ID", prop: "idMotivoComite" },
      { title: "Nombre Motivo", prop: "nombreMotivo" },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <UpdateModal
               children={<UpdateMotivo motivoInfo={row} listData={listData} />}
               configModal={{
                  identify: row.nombreMotivo,
                  modalClasses: "modal-sm",
                  // modalStylesContent: {},
                  nameBtn: "Editar",
                  btnClasses: "s-button-edit p-2 rounded",
                  nameTitle: `Editar ${row.nombreMotivo}`,
               }}
            />
         )
      }
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

   const [motivos, setMotivos] = useState([])

   const listData = useCallback(async () => {
      try {
         const data = await get('motivos-comite')
         setMotivos(data)
      } catch (error) {
         console.error(error)
      }
   }, [])

   useEffect(() => {
      listData()
   }, [listData])

   return (
      <div className="px-2 pt-4">
         <DataTable
            headers={headers}
            body={motivos}
            createModal={
               <Modal 
                  children={<CreateMotivo listData={listData} />} 
                  configModal={{
                     identify: "Motivo",
                     modalClasses: "modal-sm",
                     // modalStylesContent: {},
                     nameBtn: "Nuevo Motivo",
                     btnClasses: "s-button-create p-2 rounded",
                     nameTitle: "Crear Motivo",
               
                  }}
               />}
            configTable={configTable}
         />
      </div>
   )
}

export default MotivosComite