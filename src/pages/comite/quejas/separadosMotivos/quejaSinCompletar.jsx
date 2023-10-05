// import React, { useEffect, useMemo, useState } from 'react'
// import DataTable from '../../../../components/Datatable/Datatable'
// import UpdateModal from '../../../../components/Modals/UpdateModal';
// import { ConsultarQuejas } from '../components/quejas.forms';
// import { get, eliminar, update } from '../../../../config/Api/api';
// import jwt_decode from "jwt-decode"
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const QuejaSinCompletar = ({ decision, quejasSC }) => {
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    const [queja, setQueja] = useState([])
//    const navigate = useNavigate()

//    useEffect(() => {
//       const obtenerQuejas = async () => {
//          try {
//             const data = await get(`quejas/instructor/${user.idUsuario}`)
//             setQueja(data)

//             //  const dataObserva = await get(`observaciones-aprendiz/${id}`)
//             //  setObservaciones(dataObserva)

//          } catch (error) {
//             console.log(error)
//          }
//       }
//       obtenerQuejas()
//    }, [user])

//    const handleSubmit = async (queja) => {
//       await Swal.fire({
//          position: "center",
//          icon: "info",
//          title: "Alerta",
//          text: `¿Está seguro de revertir?`,
//          showDenyButton: true,
//          confirmButtonText: '¡Revertir!',
//          denyButtonText: `Cancelar`,
//          confirmButtonColor: '#008550',
//          cancelButtonColor: '#9b4c42',
//       }).then(async (result) => {
//          if (result.isConfirmed) {
//             console.log(queja)
//             if (queja.observacionQueja !== null) {
//                await get(`observaciones-aprendiz/${queja.idQueja}`)
//                .then(async (res) => {
//                   const updateObservacion = {
//                      decisionObservacion: 1
//                   }
//                   await update(`observaciones-aprendiz/${res.idObservacionAprendiz}`, updateObservacion)
//                }) 
//             }
//             await eliminar(`quejas/${queja.idQueja}`)
//             await Swal.fire({
//                position: "center",
//                icon: "success",
//                title: "Completado",
//                text: `Has revertido la queja del aprendiz`,
//                showConfirmButton: false,
//                timer: 1500,
//             })
//             // navigate("/quejasComite")
//             window.location.href = "/quejasComite"
//          } else if (result.isDenied) {
//             await Swal.fire({
//                position: "center",
//                icon: "error",
//                title: "ERROR",
//                text: `Has cancelado la reversión`,
//                showConfirmButton: false,
//                timer: 1500,
//             })
//          }
//       })
//    }

//    const headers = [
//       // { title: "ID Queja", prop: "idQueja" },
//       { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
//       { title: "Usuario", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
//       { title: "Programa", prop: "competenciaQueja.programasCompetencia.nombrePF" },
//       { title: "Código Ficha", prop: "aprendizQueja.fichaAprendiz.codigoFicha" },
//       { title: "Motivo", prop: "motivoQueja.nombreMotivo" },
//       { title: "Descripción", prop: "descripcionMotivo" },
//       {
//          title: "Acciones", prop: "actions", cell: (row) => {
//             return (
//                <div className="row">
//                   <div className=" col-md-5">
//                      <button type="button" onClick={() => handleSubmit(row)} className="s-button-others rounded p-2" data-target="#revertirQuejas" name='revertirQuejas'>
//                         Revertir
//                      </button>
//                   </div>
//                   <div className=" col-md-2">
//                      <UpdateModal
//                         configModal={{
//                            identify: `${row.idQueja}`,
//                            modalClasses: "",
//                            // modalStylesContent: {},
//                            nameBtn: "Consultar",
//                            btnClasses: "s-button-consult p-2 rounded",
//                            nameTitle: "Queja",
//                         }}
//                         children={<ConsultarQuejas queja={row} />} identify={`${row.idQueja}`}
//                      />
//                   </div>
//                   {/* {console.log("Row de quejas", row)} */}
//                </div>
//             )
//          }
//       }
//    ];

//    const configTable = {
//       initialRows: 5,
//       rowPage: {
//          maxRows: [5, 10, 20]
//       },
//       filtrable: true,
//       pagination: true,
//       message: true,
//    };

//    return (
//       <DataTable
//          headers={headers}
//          body={quejasSC}
//          configTable={configTable}
//       />
//    )
// }

// export default QuejaSinCompletar


import React, { useEffect, useMemo, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import UpdateModal from '../../../../components/Modals/UpdateModal';
import { ConsultarQuejas } from '../components/quejas.forms';
import { get, eliminar, downloadFiles } from '../../../../config/Api/api';
import jwt_decode from "jwt-decode"
import Swal from 'sweetalert2';

const QuejaSinCompletar = ({ decision, quejasSC }) => {
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user, setUser] = useState(token.userInfo);
   const [queja, setQueja] = useState([])

   useEffect(() => {
      const obtenerQuejas = async () => {
         try {
            const data = await get(`quejas/instructor/${user.idUsuario}`)
            setQueja(data)

            //  const dataObserva = await get(`observaciones-aprendiz/${id}`)
            //  setObservaciones(dataObserva)

         } catch (error) {
            console.log(error)
         }
      }
      obtenerQuejas()
   }, [user])

   const handleDelete = async (id) => {
      try {
         eliminar(`quejas/${id}`)
         setQueja(queja => queja.filter(i => i.idQueja !== id));
      } catch (error) {
         console.log("Error al eliminar", error)
      }
   }

   const handleSubmit = (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
         customClass: {
            confirmButton: 'btn btn-success bg-success',
            cancelButton: 'btn btn-danger bg-danger' 
         },
         buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
         title: '¿Está seguro de revertir?',
         text: "",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: '¡Revertir!',
         cancelButtonText: 'Cancelar!',
         reverseButtons: true
      }).then((result) => {
         if (result.isConfirmed) {
            handleDelete(id)
            swalWithBootstrapButtons.fire(
               'Queja Revertida!',
               '',
               'success'
               )
               // window.location.reload()
            } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
            ) {
               swalWithBootstrapButtons.fire(
                  'Se ha cancelado la reversion de la queja',
                  '',
                  'error'
                  )
               }
            })
         }

         console.log("ahsdjk",queja)

   const headers = [
      { title: "ID Queja", prop: "idQueja" },
      { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
      { title: "Usuario", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
      { title: "Programa", prop: "competenciaQueja.programasCompetencia.nombrePF" },
      { title: "Código Ficha", prop: "aprendizQueja.fichaAprendiz.codigoFicha" },
      { title: "Motivo", prop: "motivoQueja.nombreMotivo" },
      { title: "Descripción", prop: "descripcionMotivo" },
      { title: "Estado", prop: "estadoQueja.nombreEstadoQuejas" },
      {
         title: "Acciones", prop: "actions", cell: (row) => {
            return (
               <div className="row">
                  <div className=" col-md-5">
                     <button type="button" onClick={() => handleSubmit(row.idQueja)} className="btn btn-success bg-success" data-target="#revertirQuejas" name='revertirQuejas'>
                        Revertir
                     </button>
                  </div>
                  <div className=" col-md-2">
                     <UpdateModal
                        configModal={{
                           identify: `${row.idQueja}`,
                           modalClasses: "",
                           // modalStylesContent: {},
                           nameBtn: "Consultar",
                           btnClasses: "s-button-consult p-2 rounded",
                           nameTitle: "Actualizar Queja",
                        }}
                        children={<ConsultarQuejas queja={row} />} identify={`${row.idQueja}`}
                     />
                  </div>
                  <div className=" col-md-5">
                     {/* <button onClick={() => handleDownload(row.archivoQueja)} className="s-button-others rounded p-2">Descargar</button> */}
                  {/* {console.log("Row de quejas", row)} */}
                  </div>
               </div>
            )
         }
      }
   ];

   const handleDownload = async (filename) => {
      try {
         const response = await downloadFiles(`quejas/file/archivo/${filename}`)

         if (!response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
         }else{
            console.error('No se pudo descargar el archivo')
         }
      } catch (error) {
         console.log("Error",error)
      }
   }

   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   };

   return (
      <DataTable
         headers={headers}
         body={quejasSC}
         configTable={configTable}
      />
   )
}

export default QuejaSinCompletar
