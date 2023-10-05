import React, { Fragment, useEffect, useState } from 'react';
import { ConsultarAprendiz, ConvertirB64Modal, CreateAprendiz, UpdateAprendiz } from './components/aprendices.forms';
import { get } from '../../../config/Api/api';
import DataTable from '../../../components/Datatable/Datatable';
import Modal from '../../../components/Modals/Modal';
import UpdateModal from '../../../components/Modals/UpdateModal';
import { Link } from 'react-router-dom';

const Aprendices = () => {
   const headers = [
      { title: "Documento", prop: "documento" },
      { title: "Nombre Completo", prop: ["nombre", "apellidos"] },
      { title: "Correo", prop: "email" },
      { title: "Tipo Documento", prop: "tipoDocumentoAprendiz.nombreTipoDocumento" },
      { title: "Ficha", prop: "fichaAprendiz.codigoFicha" },
      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className="row">
               <div className=" col-md-5">
                  <UpdateModal
                     children={<UpdateAprendiz aprendiz={row} others={{ reloadData: listAprendices, listFicha, listRoles }} claves={{ tipoDoc: [...tipoDocumentos], fichas: [...ficha] }} />}
                     configModal={{
                        identify: `${row.documento}`,
                        modalClasses: "modal-lg",
                        // modalStylesContent: {},
                        nameBtn: "Editar",
                        btnClasses: "s-button-edit p-2 rounded",
                        nameTitle: `Editar ${row.nombre} ${row.apellidos}`,
                     }}
                  />
               </div>
               <div className=" col-md-5 " >
                  <Link to={`/consultarAprendiz/${row.idAprendiz}`}
                  state={{ aprendizData: row }}>
                     <button className='s-button-consult rounded p-2'>Consultar</button>
                  </Link>
               </div>
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

   const [aprendices, setAprendices] = useState([])
   const [tipoDocumentos, setTipoDocumentos] = useState([])
   const [roles, setRoles] = useState([])
   const [ficha, setFicha] = useState([])
   const listAprendices = async () => {
      try {
         const data = await get("aprendices");
         setAprendices(data);
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

   const listFicha = async () => {
      try {
         const data = await get("fichas");
         setFicha(data);
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
      listAprendices();
      listFicha();
      listRoles();
      listTipoDocumentos();
   }, []);

   return (
      <Fragment>
         <div className="pb-2 flex justify-between items-center">
            <h2 className='text-4xl'>Aprendices</h2>
            <div className="flex justify-between items-center">
               <div className="mr-2">
                  <Modal
                     children={<ConvertirB64Modal others={{ reloadData: listAprendices, listFicha, listTipoDocumentos }} />}

                     configModal={{
                        identify: `Aprendices`,
                        modalClasses: "modal-dialog-centered modal-lg",
                        // modalStylesContent: {},
                        nameBtn: "Cargar Aprendices",
                        btnClasses: "s-button-create p-2 rounded",
                        nameTitle: "Crear Aprendiz",
                     }}
                  />
               </div>
               <div>
                  <Modal
                     children={<CreateAprendiz claves={{ tipoDoc: [...tipoDocumentos], rol: [...roles], fichas: [...ficha] }} others={{ reloadData: listAprendices, listFicha, listRoles, listTipoDocumentos }} />}
                     configModal={{
                        identify: `AprendicesC`,
                        modalClasses: "modal-lg",
                        // modalStylesContent: {},
                        nameBtn: "Nuevo Aprendiz",
                        btnClasses: "s-button-success p-2 rounded",
                        nameTitle: "Crear Aprendiz",
                     }}
                  />
               </div>
            </div>
         </div>
         <div className='card mb-20'>
            <div className='card-body'>
               <DataTable
                  headers={headers}
                  body={aprendices}
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default Aprendices;