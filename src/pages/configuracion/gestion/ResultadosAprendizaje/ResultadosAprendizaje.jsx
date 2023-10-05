import React, { Fragment, useEffect, useState } from 'react';
import { ConsultarRA, CreateResultado, UpdateRA } from './components/ReasultadosAprendizaje.forms';
import DataTable from '../../../../components/Datatable/Datatable';
import Modal from '../../../../components/Modals/Modal';
import { get } from '../../../../config/Api/api';
import UpdateModal from '../../../../components/Modals/UpdateModal';


const ResultadosAprendizaje = () => {
   const headers = [
      { title: "Código", prop: "codigoRA" },
      { title: "Resultado de Aprendizaje", prop: "nombreRA" },
      { title: "Competencia", prop: "competenciaResultado.nombreCompetencia" },
      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className='row'>
               <div className=" col-md-5">
                  <UpdateModal
                     children={<UpdateRA resultado={row} others={{ reloadData: listCompetencias, listResultadoAprendizaje }} claves={{ competencia: [...competencias] }} />}
                     configModal={{
                        identify: row.codigoRA,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Editar",
                        btnClasses: "s-button-edit p-2 rounded",
                        nameTitle: `Editar ${row.codigoRA}`,
                     }}
                  />
               </div>
               <div className=" col-md-5">
                  <UpdateModal
                     children={<ConsultarRA resultado={row} />}
                     configModal={{
                        identify: `${row.nombreRA}`,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Consultar",
                        btnClasses: "s-button-consult p-2 rounded",
                        nameTitle: `Resultado ${row.codigoRA}`,
                     }}
                  />
               </div>
            </div>
         ),
      },
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

   const [resultadoAprendizaje, setResultadoAprendizaje] = useState([])
   const [competencias, setCompetencias] = useState([])
   const listCompetencias = async () => {
      try {
         const data = await get("competencias");
         setCompetencias(data);
      } catch (error) {
         console.error(error);
      }
   }

   const listResultadoAprendizaje = async () => {
      try {
         const resultado = await get("resultado-aprendizaje")
         setResultadoAprendizaje(resultado)
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      listCompetencias();
      listResultadoAprendizaje();
   }, []);//listCompetencias, listResultadoAprendizaje


   return (
      <Fragment>
         <div className='card-body'>
            <DataTable
               headers={headers}
               body={resultadoAprendizaje}
               createModal={
                  <Modal
                     children={<CreateResultado claves={{ competencias: [...competencias] }} others={{ reloadData: listCompetencias, listResultadoAprendizaje }} />}
                     configModal={{
                        identify: "Resultado Aprendizaje",
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Nuevo RAP",
                        btnClasses: "s-button-create p-2 rounded",
                        nameTitle: "Crear RAP",

                     }}
                  />
               }
               configTable={configTable}
            />
         </div>
      </Fragment>
   );
};

export default ResultadosAprendizaje;