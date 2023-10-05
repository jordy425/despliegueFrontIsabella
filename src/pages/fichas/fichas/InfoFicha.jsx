import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConsultarOf, CreateGrupoProyecto, ModalEditarFicha,  } from "./components/fichas.forms";
import { get } from "../../../config/Api/api";
import DataTable from "../../../components/Datatable/Datatable";
import Modal from "../../../components/Modals/Modal";
import jwt_decode from "jwt-decode";
import UpdateModal from "../../../components/Modals/UpdateModal";


const InfoFicha = () => {
   // ! Recibe dato de URL
   const { ficha } = useParams()
   const [fichaInfo, setFichaInfo] = useState([])
   const [aprendices, setAprendices] = useState([])
   const [gruposProyecto, setGruposProyecto] = useState([])
   const [observacionesFicha, setObservacionesFicha] = useState([])

   const headersAprendiz = [
      { title: "Documento", prop: "idAprendiz" },
      { title: "Nombre Completo", prop: ["nombre", "apellidos"] },
      { title: "Correo", prop: "email" },
      { title: "Proyecto", prop: `grupoAprendiz.nombreProyecto`, message: "Sin Grupo" },
   ]

   const headersGrupo = [
      { title: "Proyectos", prop: "nombreProyecto" },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <Link to={`/fichas/${ficha}/gp/${row.idGrupoProyecto}`}><button className="s-button-consult rounded p-2">Consultar</button></Link>
         )
      },
   ]

   const headersObservaciones = [
      // { title: "ID", prop: "idEntregaFicha" },
      { title: "Observación", prop: "observacionFicha" },
      { title: "Trimestre", prop: "trimestre" },
      { title: "Realizada por", prop: ["usuarioEntregaFicha.nombre", "usuarioEntregaFicha.apellidos"] },
      { title: "Competencia", prop: "competenciaEntregaFicha.nombreCompetencia" },
      { title: "Resultado de Aprendizaje", prop: "resultadoEntregaFicha.nombreRA" },

      {
         title: 'Acciones',
         prop: 'actions',
         cell: (row) => (
            <div className='row'>
              {/* {console.log("MOSTRAR MONDAAA", row)} */}

               <div className=" col-md-5">
               <Link to={{ pathname: `/entregaFicha/${ficha}/entrega/${row.idEntregaFicha}` }}><button type="button" className={`s-button-consult rounded p-2`} >Consultar</button></Link>
                  {/* <UpdateModal 
                     children={<ConsultarOf entrega={row.entregaObservacion} pf={row} competencia={row.competenciaEntregaFicha} usuario={row.usuarioEntregaFicha} trimestre={row.trimestre} resultadoEntregaFicha={row.resultadoEntregaFicha}/>}
                     configModal={{
                        identify: `${row.competenciaEntregaFicha.nombreCompetencia}`,
                        modalClasses: "modal-lg",
                        // modalStylesContent: {},
                        nameBtn: "Consultar",
                        btnClasses: "s-button-consult p-2 rounded",
                        nameTitle: `Programa ${row.competenciaEntregaFicha.nombreCompetencia}`,
                     }}
                  /> */}
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

   const configTableP = {
      initialRows: 5,
      filtrable: false,
      pagination: true,
      message: false,
   }

   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")));
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo)



   const [fichaPremised, setFichaPremised] = useState({
      crear: null,
      asignar: null,
      consultar: null,
      editar: null,
      cambiarVocero: null,
      crearGP: null,
      hacerEntrega: null,
      verEntregas: null,
   })

   useEffect(() => {
      const obtenerDatos = async () => {
         try {
            const fichaI = await get(`fichas/${ficha}`)
            setFichaInfo(fichaI)

            const aprendicesFicha = await get(`aprendices/ficha/${ficha}`)
            setAprendices(aprendicesFicha)

            const observaciones = await get(`entrega-ficha/ficha/${ficha}`)
            setObservacionesFicha(observaciones)

            const gruposFicha = await get(`grupo-proyecto/ficha/${ficha}`)
            setGruposProyecto(gruposFicha)

            const userPermissions = await token.permissions.filter(item => item.subModulo && item.subModulo === "Fichas")
            var fP = {
               crear: null,
               asignar: null,
               consultar: null,
               editar: null,
               cambiarVocero: null,
               crearGP: null,
               hacerEntrega: null,
               verEntregas: null,
            }
            for (let i = 0; i < userPermissions.length; i++) {
               if (userPermissions[i].nombrePermiso === "Crear") { fP.crear = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Asignar") { fP.asignar = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Consultar") { fP.consultar = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Editar") { fP.editar = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Cambiar Vocero") { fP.cambiarVocero = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Crear GP") { fP.crearGP = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Hacer Entrega") { fP.hacerEntrega = userPermissions[i].access }
               if (userPermissions[i].nombrePermiso === "Ver Entregas") { fP.verEntregas = userPermissions[i].access }
            }
            setFichaPremised(fP)
         } catch (error) {
            console.log(error)
         }
      }
      obtenerDatos()
   }, [ficha])

   const GpValidate = ({ aprendices, idFicha, ficha }) => {
      if (fichaPremised.crearGP === true) {
         return (
            <Modal
               children={<CreateGrupoProyecto aprendices={aprendices} ficha={idFicha} codFicha={ficha} />}
               configModal={{
                  identify: "Grupo Proyecto",
                  modalClasses: "modal-sm",
                  // modalStylesContent: {},
                  nameBtn: "Nuevo Grupo",
                  btnClasses: "s-button-create p-2 rounded",
                  nameTitle: "Crear Grupo de Proyecto",
               }}
            />
         )
      }
      return null
   }

   return (
      <Fragment>
         <div className="flex justify-between items-center pb-2">
            <h2 className='text-4xl'>Ficha - {ficha}</h2>
            <div className='row justify-content-between px-3'>
            <Link to={{ pathname: `/fichas` }}><button type="button" className={`s-button-cancel rounded p-2 ${fichaPremised.hacerEntrega === true ? 'mr-2' : null}`} >Volver</button></Link>
               {fichaPremised.hacerEntrega === true ? (
                  <Link to={{ pathname: `/entregaFicha/${ficha}` }}><button type="button" className="s-button-success rounded p-2" >Hacer Entrega</button></Link>
               ) : null}
               {/* <Modal children={<ModalEditarFicha/>} name={"Editar Ficha"}/> */}
            </div>
         </div>
         <div className="card mb-3">
            <div className="card-body col d-flex justify-content-between">
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Director: </h6>
                  {fichaInfo.usuarioFichaDirector ? (
                     <p>{fichaInfo.usuarioFichaDirector.nombre} {fichaInfo.usuarioFichaDirector.apellidos}</p>
                  ) : (
                     ''
                  )}
               </div>
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Vocero: </h6>
                  {fichaInfo.voceroFicha === null ? (
                     <p>Sin asignar</p>
                  ) : (
                     <p>{fichaInfo["voceroFicha"]}</p>
                  )}
               </div>
               <div className="col d-flex justify-content-between">
                  <h6 className="font-semibold">Programa Formativo: </h6>
                  {fichaInfo.programaFicha ? (
                     <p>{fichaInfo.programaFicha.nombrePF}</p>
                  ) : (
                     <p>Cargando...</p>
                  )}
               </div>
            </div>
         </div>
         <div className='card mb-20'>
            <div className='card-body'>
               <ul className="nav nav-tabs">
                  <li className="nav-item">
                     <a className="nav-link active" data-toggle="tab" href="#menu1">Aprendices</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu2">Observaciones de la Ficha ({observacionesFicha.length})</a>
                  </li>
               </ul>
               <div className="tab-content">
                  <div className="tab-pane active" id="menu1">
                     <div className="h-full w-full px-2 pt-4 flex justify-between">
                        <div className="w-[30%]">
                           <DataTable
                              headers={headersGrupo}
                              body={gruposProyecto}
                              createModal={<GpValidate aprendices={aprendices} ficha={ficha} idFicha={fichaInfo.idFicha} />}
                              configTable={configTableP}
                           />
                        </div>
                        <div className="w-8/12">
                           <DataTable
                              headers={headersAprendiz}
                              body={aprendices}
                              configTable={configTable}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane container fade" id="menu2">
                     <div className="h-full w-full px-2 pt-4">
                        <DataTable
                           headers={headersObservaciones}
                           body={observacionesFicha}
                           configTable={configTable}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default InfoFicha