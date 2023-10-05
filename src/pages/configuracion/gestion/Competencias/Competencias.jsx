import React, { Fragment, useEffect, useState } from 'react';
import { ConsultarCompetencia, CreateCompetencia, UpdateCompetencia } from './Components/competencias.forms';
import { get } from '../../../../config/Api/api';
import DataTable from '../../../../components/Datatable/Datatable';
import Modal from '../../../../components/Modals/Modal';
import UpdateModal from '../../../../components/Modals/UpdateModal';

const Competencias = () => {
   const headers = [
      { title: "Código", prop: "codigoCompetencia" },
      { title: "Nombre Competencia", prop: "nombreCompetencia" },
      { title: "Nombre de NSCL", prop: "nombreNSCL"},
      { title: "Programa Formativo", prop: "programasCompetencia.nombrePF" },
      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className='row'>
               <div className=" col-md-5">
                  <UpdateModal
                     children={<UpdateCompetencia others={{ reloadData: listCompetencias, listProgramaFormativo }} competencia={row} claves={{ programaFormativo: [...programaFormativo] }} />}
                     configModal={{
                        identify: row.codigoCompetencia,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Editar",
                        btnClasses: "s-button-edit p-2 rounded",
                        nameTitle: `Editar ${row.codigoCompetencia}`,
                     }}
                  />
               </div>
               <div className=" col-md-5">
                  <UpdateModal
                     children={<ConsultarCompetencia competencia={row} compeR={row.resultadosCompetencia} />}
                     configModal={{
                        identify: `${row.nombreCompetencia}`,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Consultar",
                        btnClasses: "s-button-consult p-2 rounded",
                        nameTitle: `Competencia ${row.codigoCompetencia}`,
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

   const [competencias, setCompetencia] = useState([])
   const [programaFormativo, setProgramaFormativo] = useState([])
   const listCompetencias = async () => {
      try {
         const data = await get("competencias");
         setCompetencia(data);
      } catch (error) {
         console.error(error);
      }
   };

   const listProgramaFormativo = async () => {
      try {
         const clavePF = await get("programas-formativos")
         setProgramaFormativo(clavePF)
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      listCompetencias();
      listProgramaFormativo();
   }, []);//listCompetencias, listProgramaFormativo


   return (
      <Fragment>
         <div className='card-body'>
            <DataTable
               headers={headers}
               body={competencias}
               createModal={
                  <Modal
                     children={<CreateCompetencia claves={{ programaFormativo: [...programaFormativo] }} others={{ reloadData: listCompetencias, listProgramaFormativo }} />}
                     configModal={{
                        identify: "Competencia",
                        modalClasses: "modal-dialog modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Nueva Competencia",
                        btnClasses: "s-button-create p-2 rounded",
                        nameTitle: "Crear Competencia",

                     }}
                  />
               }
               configTable={configTable}
            />
         </div>
      </Fragment>
   );
};

export default Competencias;