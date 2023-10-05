import { Fragment, useEffect, useState } from 'react';
import { get } from '../../../config/Api/api';
import DataTable from '../../../components/Datatable/Datatable';
import Modal from '../../../components/Modals/Modal';
import { CreateRol, UpdateRol } from './components/roles.form';
import UpdateModal from '../../../components/Modals/UpdateModal';
import { Link } from "react-router-dom"

const Roles = () => {
   const headers = [
      { title: "ID", prop: "idRol" },
      { title: "Nombre Rol", prop: "nombreRol" },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <div>
               <Link to={`/roles/update/${row.idRol}`} placeholder='Rol'>
                  <button className='s-button-edit p-2 rounded'>Editar</button>
               </Link>
            </div>
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

   const [roles, setRoles] = useState([])
   useEffect(() => {
      const obtenerRoles = async () => {
         try {
            const data = await get("roles")
            setRoles(data)
         } catch (error) {
            console.error(error)
         }
      }
      obtenerRoles()
   }, [])

   return (
      <Fragment>
         <h2 className='text-4xl mb-2'>Roles y Permisos</h2>
         <div className='card mb-20'>
            <div className='card-body'>
               <DataTable
                  headers={headers}
                  body={roles}
                  createModal={<Link to={'/roles/create'}><button className='s-button-create p-2 rounded'>Nuevo Rol</button></Link>}
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default Roles;