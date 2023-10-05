import { useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import { get } from "../../../../config/Api/api";

const EstadoDecision = () => {
   const headers = [
      { title: "ID", prop: "idEstadoDecision" },
      { title: "Nombre Estado", prop: "nombreEstadoDecision" },
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


   const [estadoDecision, setEstadoDecision] = useState([])
   useEffect(() => {
      const listData = async () => {
         try {
            const data = await get('estado-decision')
            setEstadoDecision(data)
         } catch (error) {
            console.error(error)
         }
      }
      listData()
   }, [])

   return (
      // <div className="h-full flex justify-between w-full">
         <div className="px-2 pt-4">
            <DataTable
               headers={headers}
               body={estadoDecision}
               configTable={configTable}
            />
         </div>
      //    <div className="w-4/12 px-3 pt-4">
      //       <h1 className="text-lg font-semibold">Estado Decisión:</h1>
      //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam corrupti accusamus doloribus, quaerat minima repellat debitis explicabo quas asperiores nihil et facilis magni molestiae, reiciendis cum nesciunt quae! Nobis, dolores?</p>
      //    </div>
      // </div>
   )
};

export default EstadoDecision;