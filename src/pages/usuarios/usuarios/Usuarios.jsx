import React, { Fragment, useEffect, useState } from 'react';
import { CreateUsuario, UpdateUsuario, ConsultarUsuarios } from './components/usuarios.form';
import { get } from '../../../config/Api/api';
import DataTable from '../../../components/Datatable/Datatable';
import Modal from '../../../components/Modals/Modal';
import UpdateModal from '../../../components/Modals/UpdateModal';


const Usuarios = () => {

   const headers = [
      { title: "Documento", prop: "documento" },
      { title: "Nombre Completo", prop: ["nombre", "apellidos"] },
      { title: "Correo", prop: "email" },
      { title: "Rol", prop: "rolUsuario.nombreRol" },
      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className="row">
               <div className=" col-md-5">
                  <UpdateModal
                     children={<UpdateUsuario usuario={row} claves={{ tipoDoc: [...tipoDocumentos], rol: [...roles] }} others={{ reloadData: listUsuarios, listTipoDocumentos, listRoles }} />}
                     configModal={{
                        identify: `${row.documento}`,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Editar",
                        btnClasses: "s-button-edit p-2 rounded",
                        nameTitle: `Editar ${row.nombre} ${row.apellidos}`,
                     }}
                  />
               </div>
               {/* <div className=" col-md-5 " >
            <UpdateModal
             stylesModalContent={styles}
             name={{ btnOpen: "Consultar", title: `${row.nombre} ${row.apellidos}` }} 
             children={<ConsultarUsuarios usuario={row} />} 
             identify={`${row.idUsuario}`} />
         </div> */}
            </div>

         ),
      },
   ];

   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }


   const [usuarios, setUsuarios] = useState([])
   const [tipoDocumentos, setTipoDocumentos] = useState([])
   const [roles, setRoles] = useState([])
   const listUsuarios = async () => {
      try {
         const data = await get("usuarios");
         setUsuarios(data);
      } catch (error) {
         console.error(error);
      }
   };

   const listTipoDocumentos = async () => {
      try {
         const data = await get("tipo-documento");
         setTipoDocumentos(data);
      } catch (error) {
         console.error(error);
      }
   };

   const listRoles = async () => {
      try {
         const data = await get("roles");
         setRoles(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      listUsuarios();
      listTipoDocumentos();
      listRoles();
   }, []); //listUsuarios, listTipoDocumentos, listRoles





   return (
      <Fragment>
         <div className="pb-2 flex justify-between items-center">
            <h2 className='text-4xl'>Usuarios</h2>
            <Modal
               children={<CreateUsuario claves={{ tipoDoc: [...tipoDocumentos], rol: [...roles] }} others={{ reloadData: listUsuarios, listTipoDocumentos, listRoles }} />}
               configModal={{
                  identify: "Usuario",
                  modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                  // modalStylesContent: {},
                  nameBtn: "Nuevo Usuario",
                  btnClasses: "s-button-create p-2 rounded",
                  nameTitle: "Crear Usuario",
               }}
            />
         </div>
         <div className='card mb-20'>
            <div className='card-body'>
               <DataTable
                  headers={headers}
                  body={usuarios}
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default Usuarios;