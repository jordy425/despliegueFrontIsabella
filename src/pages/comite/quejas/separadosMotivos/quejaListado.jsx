// import React, { useEffect, useState } from 'react'
// import DataTable from '../../../../components/Datatable/Datatable'
// import UpdateModal from '../../../../components/Modals/UpdateModal';
// import { ConsultarQuejas } from '../components/quejas.forms';
// import { get, eliminar } from '../../../../config/Api/api';
// import Swal from 'sweetalert2';
// import jwt_decode from "jwt-decode"

// const QuejaListado = ({ quejasL }) => {
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    const [queja, setQueja] = useState([])

//    useEffect(() => {
//       const obtenerQuejas = async () => {
//          try {
//             const data = await get(`quejas/instructor/${user.idUsuario}`)
//             setQueja(data)


//          } catch (error) {
//             console.log(error)
//          }
//       }
//       obtenerQuejas()
//    }, [user])
//    const handleDelete = async (id) => {
//       try {
//          eliminar(id)
//          setQueja(queja => queja.filter(i => i.idQueja !== id));
//       } catch (error) {
//          console.log("Error al eliminar", error)
//       }
//    }

//    const handleSubmit = (id) => {
//       const swalWithBootstrapButtons = Swal.mixin({
//          customClass: {
//             confirmButton: 'btn btn-success bg-success',
//             cancelButton: 'btn btn-danger bg-danger'
//          },
//          buttonsStyling: false
//       })

//       swalWithBootstrapButtons.fire({
//          title: '¿Está seguro de revertir?',
//          // text: "You won't be able to revert this!",
//          icon: 'warning',
//          showCancelButton: true,
//          confirmButtonText: '¡Revertir!',
//          cancelButtonText: 'Cancelar!',
//          reverseButtons: true
//       }).then((result) => {
//          if (result.isConfirmed) {
//             handleDelete(id)
//             swalWithBootstrapButtons.fire(
//                'Queja Revertida!',
//                '',
//                'success'
//                )
//                window.location.reload()
//             } else if (
//             /* Read more about handling dismissals below */
//             result.dismiss === Swal.DismissReason.cancel
//             ) {
//                swalWithBootstrapButtons.fire(
//                   'Se ha cancelado la reversion de la queja',
//                   '',
//                   'error'
//                   )
//                }
//             })
//          }

//    const headers = [
//       // { title: "ID Queja", prop: "idQueja" },
//       { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
//       { title: "Usuario", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
//       { title: "Programa", prop: "competenciaQueja.programasCompetencia.nombrePF" },
//       { title: "Código Ficha", prop: "aprendizQueja.fichaAprendiz.codigoFicha" },
//       { title: "Motivo", prop: "motivoQueja.nombreMotivo" },
//       { title: "Descripción", prop: "descripcionMotivo" },
//       { title: "Estado", prop: "estadoQueja.nombreEstadoQuejas" },
//       {
//          title: "Acciones", prop: "actions", cell: (row) => {
//             return (
//                <div className="row">
//                   <div className=" col-md-5">
//                      <button type="button" onClick={() => handleSubmit(row.idQueja)} className="btn btn-success bg-success" data-target="#revertirQuejas" name='revertirQuejas'>
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
//                            nameTitle: "Actualizar Queja",
//                         }}
//                         children={<ConsultarQuejas queja={row} />} identify={`${row.idQueja}`}
//                      />
//                   </div>
//                </div>
//             )
//          }
//       }
//    ];

//    const styles = {
//       modalWidth: "50px"
//    }

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
//          body={quejasL}
//          configTable={configTable}
//       />
//    )
// }

// export default QuejaListado

import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import UpdateModal from '../../../../components/Modals/UpdateModal';
import { ConsultarQuejas } from '../components/quejas.forms';
import { get, eliminar } from '../../../../config/Api/api';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode"

const QuejaListado = ({ quejasL }) => {
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   const [user, setUser] = useState(token.userInfo);
   const [queja, setQueja] = useState([])

   useEffect(() => {
      const obtenerQuejas = async () => {
         try {
            const data = await get(`quejas/instructor/${user.idUsuario}`)
            setQueja(data)


         } catch (error) {
            console.log(error)
         }
      }
      obtenerQuejas()
   }, [user])
   const handleDelete = async (id) => {
      try {
         eliminar(id)
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
         // text: "You won't be able to revert this!",
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
               </div>
            )
         }
      }
   ];

   const styles = {
      modalWidth: "50px"
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
         body={quejasL}
         configTable={configTable}
      />
   )
}

export default QuejaListado
