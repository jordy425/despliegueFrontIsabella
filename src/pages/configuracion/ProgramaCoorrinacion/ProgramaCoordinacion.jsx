import React, { Fragment, useState, useEffect } from 'react';
import DataTable from '../../../components/Datatable/Datatable';
import { get } from '../../../config/Api/api';
import { CreatePC, UpdatePC } from './Components/ProgramaCoorrinacion.Forms';
import Modal from '../../../components/Modals/Modal';
import UpdateModal from '../../../components/Modals/UpdateModal';

const ProgramaCoordinacion = () => {
   const headers = [
      { title: "ID", prop: "idPCA" },
      { title: "Programa Formativo", prop: "programaFormativo.nombrePF" },
      { title: "Coordinador", prop: ["usuario.nombre", "usuario.apellidos"] },
      { title: 'Acciones', prop: 'actions',
      cell: (row) => (
         <UpdateModal
            children={<UpdatePC PC={row} claves={{ programaF: [...programaF], usuarioP: [...usuarioP] }} others={{ reloadData: listProgramaC, listUsuarioP,listProgramaFormativo}}  />}
            configModal={{
               identify: `${row.idPCA}`,
               modalClasses: "modal-sm",
               // modalStylesContent: {},
               nameBtn: "Editar",
               btnClasses: "s-button-edit p-2 rounded",
               nameTitle: `Editar Coordinación`,
            }}
         />
      ),}
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


   const [programaC, setProgramaC] = useState([])
   const [usuarioP, setUsuarioP] = useState([])
   const [programaF, setProgramaF] = useState([])

   const listProgramaC = async () => {
      try {
        const data = await get("programa-coordinacion");
        setProgramaC(data);
      } catch (error) {
        console.error(error);
      }
    };

    const listProgramaFormativo = async () => {
      try {
         const clavePF = await get("programas-formativos")
         setProgramaF(clavePF)
      } catch (error) {
        console.error(error);
      }
    };

    const listUsuarioP = async ( ) =>{
       try{
          const claveUsuarios = await get("usuarios")
          setUsuarioP(claveUsuarios)
         }catch(error){
            console.error(error)
         }
         }
         
  
    useEffect(() => {
      listProgramaC();
      listProgramaFormativo();
      listUsuarioP();
    }, [listProgramaC,listProgramaFormativo, listUsuarioP]);

   return (
      <Fragment>
         <h2 className='text-4xl pb-2'>Coordinación Académica</h2>
         <div className='card mb-20'>
            <div className='card-body'>
               <DataTable 
                  headers={headers}
                  body={programaC}
                  createModal={
                     <Modal  
                        children={<CreatePC claves={{ programaF: [...programaF], usuarioP: [...usuarioP] }} others={{ reloadData: listProgramaC, listUsuarioP,listProgramaFormativo}}/>} 
                        configModal={{
                           identify: "Coordinación",
                           modalClasses: "modal-sm",
                           // modalStylesContent: {},
                           nameBtn: "Nuevo Coordinación",
                           btnClasses: "s-button-create p-2 rounded",
                           nameTitle: "Crear Coordinación",
                        }}
                     />
                  }
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default ProgramaCoordinacion;