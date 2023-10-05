import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { CreateFichas, FichaInstructor, } from './components/fichas.forms';
import { Link } from 'react-router-dom';
import { get } from '../../../config/Api/api';
import Modal from '../../../components/Modals/Modal';
import DataTable from '../../../components/Datatable/Datatable';
import jwt_decode from "jwt-decode";



const Fichas = () => {
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

   const headers = [
      { title: "Código", prop: `${user.rolUsuario.nombreRol.includes('Instructor') ? 'ficha.codigoFicha' : 'codigoFicha'}` },
      { title: "Programa Formativo", prop: `${user.rolUsuario.nombreRol.includes('Instructor') ? 'ficha.programaFicha.nombrePF' : 'programaFicha.nombrePF'}` },
      {
         title: "Director de Ficha", prop: [
            `${user.rolUsuario.nombreRol.includes('Instructor') ? 'ficha.usuarioFichaDirector.nombre' : 'usuarioFichaDirector.nombre'}`,
            `${user.rolUsuario.nombreRol.includes('Instructor') ? 'ficha.usuarioFichaDirector.apellidos' : 'usuarioFichaDirector.apellidos'}`,
         ]
      },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <div className='flex justify-start px-2'>
               {fichaPremised.consultar === true ? (
                  <div className='mr-2'>
                     <Link to={{ pathname: `${user.rolUsuario.nombreRol.includes('Instructor') ? row.ficha.codigoFicha : row.codigoFicha}` }}><button className='s-button-consult rounded p-2 '>Ver</button></Link>
                  </div>
               ) : null}
               {fichaPremised.hacerEntrega === true ? (
                  <div>
                     {/* <Link to={{ pathname: `/entregaFicha/${row.codigoFicha}` }}><button type="button" onClick={localStorage.setItem("fichaV", row.fichaInfo ? (row.fichaInfo.idFicha) : (''))} className="s-button-others rounded p-2">Hacer Entrega</button></Link> */}
                  </div>
               ) : null}
               {fichaPremised.consultar === false && fichaPremised.hacerEntrega === false ? (
                  <div>
                     <p>No cuenta con los permisos Necesarios</p>
                  </div>
               ) : null}
            </div>
         )

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

   const [fichas, setFichas] = useState([])
   const [fichasInstructor, setFichasInstructor] = useState([])
   const [programaFormativo, setProgramaFormativo] = useState([])
   const [director, setDirector] = useState([])

   const obtenerFichas = async () => {
      try {

         const data = await get("fichas")
         setFichas(data)

         const claveIF = await get(`ficha-usuario/${user.idUsuario}`)
         setFichasInstructor(claveIF)

         const clavePF = await get("programas-formativos")
         setProgramaFormativo(clavePF)

         const claveDirector = await get("usuarios")
         setDirector(claveDirector)

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
         console.error(error)
      }
   }

   useEffect(() => {
      obtenerFichas()
   }, [user, obtenerFichas])

   const rowShow = useMemo(() => {
      if (user.rolUsuario && user.rolUsuario.nombreRol.includes("Instructor")) {
         return fichasInstructor
      } else {
         return fichas
      }
   }, [fichasInstructor, fichas, user])

   return (
      <Fragment>
         <div className='flex pb-2 justify-between items-center'>
            <h2 className='text-4xl pb-2'>Fichas</h2>
            <div className="flex">
               {fichaPremised.crear === true ? (
                  <div className={`${fichaPremised.asignar === true && 'mr-2'}`}>
                     <Modal
                        children={<CreateFichas claves={{ programaF: [...programaFormativo], directorF: [...director] }} others={{ reloadData: obtenerFichas }} />}
                        configModal={{
                           identify: "Ficha",
                           modalClasses: "modal-sm",
                           // modalStylesContent: {},
                           nameBtn: "Nueva Ficha",
                           btnClasses: "s-button-success p-2 rounded",
                           nameTitle: "Crear Ficha",
                        }}
                     />
                  </div>
               ) : null}
               {fichaPremised.asignar === true ? (
                  <div>
                     <Modal
                        children={<FichaInstructor claves={{ instructores: [...director.filter((i) => i.rolUsuario && i.rolUsuario.nombreRol.includes("Instructor"))], fichas: [...fichas] }} />}
                        configModal={{
                           identify: "AsignarIF",
                           modalClasses: "modal-sm",
                           // modalStylesContent: {},
                           nameBtn: "Asignar Instructor",
                           btnClasses: "s-button-others p-2 rounded",
                           nameTitle: "Asignar Instructor",
                        }}
                     />
                  </div>
               ) : null}
            </div>
         </div>
         <div className='card'>
            <div className='card-body'>
               <DataTable
                  headers={headers}
                  body={rowShow}
                  configTable={configTable}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default Fichas;