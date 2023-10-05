import { useMemo } from "react"
import DataTable from "../../../../components/Datatable/Datatable"
import UpdateModal from "../../../../components/Modals/UpdateModal"
import { ActaResolucionStepper } from "../components/comite.stepper"

const ComiteSF = ({ comites, reloadData }) => {
   const headers = [
      { title: "Código", prop: "codigoComite" },
      { title: "Link", prop: "link" },
      { title: "Fecha Inicio", prop: "fechaHoraInicio" },
      { title: "Programa Formativo", prop: "pcaComite.programaFormativo.nombrePF" },
      { title: "Encargado", prop: ["pcaComite.usuario.nombre", "pcaComite.usuario.apellidos"] },
      {
         title: "Acciones", prop: "actions", cell: (row) => {
            if (row.acta === null) {
               return (
                  <div className="flex justify-start items-center">
                     <div className="mr-2">
                        <UpdateModal
                           children={<ActaResolucionStepper reloadData={reloadData} comiteInfo={row} />}
                           configModal={{
                              identify: `${row.codigoComite}`,
                              modalClasses: "",
                              // modalStylesContent: {},
                              nameBtn: `Subir Acta`,
                              btnClasses: "s-button-consult p-2 rounded",
                              nameTitle: `Subir Acta`,
                           }}
                        />
                     </div>
                  </div>
               )
            } else {
               return (
                  <div className="mr-2">
                        <UpdateModal
                           children={<ActaResolucionStepper reloadData={reloadData} comiteInfo={row} />}
                           configModal={{
                              identify: `${row.codigoComite}`,
                              modalClasses: "",
                              // modalStylesContent: {},
                              nameBtn: `Subir Resolución`,
                              btnClasses: "s-button-consult p-2 rounded",
                              nameTitle: `Subir Resolución`,
                           }}
                        />
                     </div>
               )
            }
         }
         // <Link to={{ pathname: `${row.codigoComite}` }}><button className='st-consult rounded p-2'>Ver</button></Link>
      }
   ]

   const formatDatetime = (date) => {
      const options = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         hour12: true,
      };
   
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
   }


   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }

   const comiteSFormat = useMemo(() => {
      return comites.map((i) => {
         const fechaHI = formatDatetime(i.fechaHoraInicio)
         const fechaHF = formatDatetime(i.fechaHoraFin)
         return {
            ...i,
            fechaHoraInicio: fechaHI,
            fechaHoraFin: fechaHF,
         }
      })
   }, [comites])

   return (
      <DataTable
         headers={headers}
         body={comiteSFormat}
         configTable={configTable}
      />
   )
}

export default ComiteSF