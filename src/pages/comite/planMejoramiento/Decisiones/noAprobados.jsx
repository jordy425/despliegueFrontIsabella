// import React from 'react';
// import DataTable from '../../../../components/Datatable/Datatable';

// const PlanFinalizados = ({ noApro }) => {

//    const headers = [
//       // { title: "ID", prop: "idPlanMejoramiento" },
//       { title: "Aprendiz", prop: ["aprendizPlanMejoramiento.nombre", "aprendizPlanMejoramiento.apellidos"] },
//       { title: "Instructor a cargo", prop: ["usuarioPlanMejoramiento.nombre", "usuarioPlanMejoramiento.apellidos"] },
//       { title: "Ficha Aprendiz", prop: "aprendizPlanMejoramiento.fichaAprendiz.codigoFicha" },
//       { title: "Competencias", prop: "quejaPlanMejoramiento.competenciaQueja.nombreCompetencia" },
//       { title: "Competencias", prop: "quejaPlanMejoramiento.resultadoAQueja.nombreRA" },
      
//    ]

   
//    const configTable = {
//       initialRows: 5,
//       rowPage: {
//          maxRows: [5, 10, 20]
//       },
//       filtrable: true,
//       pagination: true,
//       message: true,
//    }
   
//    return (
//       <DataTable
//          headers={headers}
//          body={noApro}
//          configTable={configTable}
//       />
//    )
// };


// export default PlanFinalizados


import React, { useState, useEffect } from 'react';
// import jwt_decode from "jwt-decode";
import { get } from '../../../../config/Api/api';
import DataTable from '../../../../components/Datatable/Datatable';

const PlanFinalizados = ({ noApro }) => {
   // const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")));
   // // eslint-disable-next-line
   // const [user, setUser] = useState(token.userInfo)
   const [plan, setPlanesM] = useState([])
   useEffect(() => {
      const obtenerPlanes = async () => {
         try {
            const plan = await get("plan-mejoramiento/inactivo")
            setPlanesM(plan)
         } catch (error) {
            console.log(error)
         }
      }
      obtenerPlanes()
   }, [])

   const headers = [
      // { title: "ID", prop: "idPlanMejoramiento" },
      { title: "Aprendiz", prop: ["aprendizPlanMejoramiento.nombre", "aprendizPlanMejoramiento.apellidos"] },
      { title: "Instructor a cargo", prop: ["usuarioPlanMejoramiento.nombre", "usuarioPlanMejoramiento.apellidos"] },
      { title: "Ficha Aprendiz", prop: "aprendizPlanMejoramiento.fichaAprendiz.codigoFicha" },
      { title: "Competencias", prop: "quejaPlanMejoramiento.competenciaQueja.nombreCompetencia" },
      { title: "Competencias", prop: "quejaPlanMejoramiento.resultadoAQueja.nombreRA" },

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
   console.log(plan)

   return (
      <DataTable
         headers={headers}
         body={plan}
         configTable={configTable}
      />
   )
};


export default PlanFinalizados
