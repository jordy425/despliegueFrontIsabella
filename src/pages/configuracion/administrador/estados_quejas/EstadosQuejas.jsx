import { useEffect, useState } from 'react';
import { get } from '../../../../config/Api/api';
import DataTable from '../../../../components/Datatable/Datatable';

const EstadoQuejas = () => {
   const headers = [
      { title: "ID", prop: "idEstadoQuejas" },
      { title: "Nombre Queja", prop: "nombreEstadoQuejas" },
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


   const [estadoQueja, setEstadoQueja] = useState([])
   useEffect(() => {
      const listData = async () => {
         try {
            const data = await get('estado-quejas')
            setEstadoQueja(data)
         } catch (error) {
            console.error(error)
         }
      }
      listData()
   }, [])

   return (
      // <div className='h-full w-full flex justify-between'>
         <div className="px-2 pt-4">
            <DataTable 
               headers={headers}
               body={estadoQueja}
               configTable={configTable}
            />
         </div>
      //    <div className='w-4/12 px-3 pt-4'>
      //       <h1 className='text-lg font-semibold'>Estado Queja:</h1>
      //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio perspiciatis quos cumque laboriosam animi fugiat sint, praesentium esse numquam mollitia nulla vel eos error minima quas eaque reprehenderit inventore aut?</p>
      //    </div>
      // </div>
   );
};

export default EstadoQuejas;