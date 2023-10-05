import { useState, useEffect, useCallback } from 'react';
import { get } from '../../../../config/Api/api';
import DataTable from '../../../../components/Datatable/Datatable';
import Modal from '../../../../components/Modals/Modal';
import { CreateDecisionComite, UpdateDecisionComite } from './components/decision_comite.forms';
import UpdateModal from '../../../../components/Modals/UpdateModal';

const DecisionComite = () => {
   const headers = [
      { title: "ID", prop: "idDecision" },
      { title: "Nombre Decisión", prop: "nombreDecision" },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <UpdateModal
               children={<UpdateDecisionComite decisionInfo={row} reloadData={loadData} />}
               configModal={{
                  identify: row.nombreDecision,
                  modalClasses: "modal-sm",
                  // modalStylesContent: {},
                  nameBtn: "Editar",
                  btnClasses: "s-button-edit p-2 rounded",
                  nameTitle: `Editar ${row.nombreDecision}`,
               }}
            />
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

   const [decision, setDecision] = useState([])
   const loadData = useCallback(async () => {
      try {
         const data = await get('decision-comite')
         setDecision(data)
      } catch (error) {
         console.error(error)
      }
   }, [])

   useEffect(() => {
      loadData()
   }, [loadData])

   return (
      <div className="px-2 pt-4">
         <DataTable
            headers={headers}
            body={decision}
            createModal={
               <Modal
                  children={<CreateDecisionComite reloadData={loadData} />}
                  configModal={{
                     identify: "Decisión",
                     modalClasses: "modal-sm",
                     // modalStylesContent: {},
                     nameBtn: "Nueva Decisión",
                     btnClasses: "s-button-create p-2 rounded",
                     nameTitle: "Crear Decisión Comité",

                  }}
               />
            }
            configTable={configTable}
         />
      </div>
   );
};

export default DecisionComite;