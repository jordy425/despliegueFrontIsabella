import React, { Fragment, useEffect, useState } from 'react';
import { CreateProgramaFormativo, UpdateProgramaFormativo, ConsultarPF } from './components/programas_formativos.forms';
import DataTable from '../../../../components/Datatable/Datatable';
import Modal from '../../../../components/Modals/Modal';
import { get } from '../../../../config/Api/api';
import UpdateModal from '../../../../components/Modals/UpdateModal';

const ProgramasFormativos = () => {
   const headers = [
      { title: "Código", prop: "codigoPF" },
      { title: "Programa Formativo", prop: "nombrePF" },
      { title: "Abreviatura", prop: "abreviaturaPF" },
      { title: "Trimestres", prop: "trimestres" },
      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className='row'>
               <div className=" col-md-5">
                  <UpdateModal
                     children={<UpdateProgramaFormativo programaFormativo={row} others={{ reloadData: listData }} />}
                     configModal={{
                        identify: row.codigoPF,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Editar",
                        btnClasses: "s-button-edit p-2 rounded",
                        nameTitle: `Editar ${row.codigoPF}`,
                     }}
                  />
               </div>

               <div className=" col-md-5">
                  <UpdateModal
                     children={<ConsultarPF pf={row} programa={row.competenciaPrograma}/>}
                     configModal={{
                        identify: `${row.idProgramaFormativo}`,
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Consultar",
                        btnClasses: "s-button-consult p-2 rounded",
                        nameTitle: `Programa ${row.codigoPF}`,
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


   const [programas, setProgramas] = useState([]);

   const listData = async () => {
      try {
         const data = await get("programas-formativos");
         setProgramas(data);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      listData();
   }, [])// listData

   return (
      <Fragment>
         <div className='card-body'>
            <DataTable
               headers={headers}
               body={programas}
               createModal={
                  <Modal
                     children={<CreateProgramaFormativo others={{ reloadData: listData }} />}
                     configModal={{
                        identify: "Programa Formativo",
                        modalClasses: "modal-dialog modal-lg modal-dialog-centered",
                        // modalStylesContent: {},
                        nameBtn: "Nuevo Programa",
                        btnClasses: "s-button-create p-2 rounded",
                        nameTitle: "Crear Programa Formativo",

                     }}
                  />
               }
               configTable={configTable}
            />
         </div>
      </Fragment>
   );
};

export default ProgramasFormativos;