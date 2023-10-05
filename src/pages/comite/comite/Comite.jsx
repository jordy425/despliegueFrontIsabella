import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../../config/Api/api';
import DataTable from '../../../components/Datatable/Datatable';
import ComiteSF from './ComiteCitado/ComiteSF';
import UpdateModal from "../../../components/Modals/UpdateModal";
import { UpdateComite } from './components/comite.forms';

const Comite = () => {
   const headers = [
      { title: "Código", prop: "codigoComite" },
      { title: "Fecha Inicio", prop: "fechaHoraInicio" },
      { title: "Programa Formativo", prop: "pcaComite.programaFormativo.nombrePF" },
      { title: "Encargado", prop: ["pcaComite.usuario.nombre", "pcaComite.usuario.apellidos"] },
      {
         title: "Acciones", prop: "actions", cell: (row) => (
            <div className='w-full flex justify-start'>
               <div className="mr-2">
                  <Link to={{ pathname: `${row.codigoComite}` }}><button className='s-button-consult rounded p-2'>Comenzar</button></Link>
               </div>
               <UpdateModal
                  children={<UpdateComite comiteInfo={row} others={{ function: obtenerComites }} />}
                  configModal={{
                     identify: `${row.codigoComite}`,
                     modalClasses: "",
                     modalStylesContent: {
                        width: "fit-content"
                     },
                     nameBtn: "Editar",
                     btnClasses: "s-button-edit p-2 rounded",
                     nameTitle: `Comité - ${row.codigoComite}`,
                  }}
               />
            </div>
         )
      }
   ];
   const headersTwo = [
      { title: "Código", prop: "codigoComite" },
      { title: "Fecha Fin", prop: "fechaHoraFin" },
      { title: "Programa Formativo", prop: "pcaComite.programaFormativo.nombrePF" },
      { title: "Encargado", prop: ["pcaComite.usuario.nombre", "pcaComite.usuario.apellidos"] },
      {
         title: "Acciones", prop: "actions", cell: (row) => {
            return (
               <div className="flex justify-start items-center">
                  <div className="mr-2">
                     <Link to={`/comite/consult/${row.codigoComite}`}><button className='s-button-consult rounded p-2'>Consultar</button></Link>
                  </div>
               </div>
            )
         }
      }
   ];


   const formatDatetime = (date) => {
      const options = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         hour12: true,
      };

      return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
   }

   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }

   const [comitesCreados, setComitesCreados] = useState([])
   const [comitesSf, setComitesSf] = useState([])
   const [comitesFinalizados, setComitesFinalizados] = useState([])

   const obtenerComites = useCallback(async () => {
      try {
         const dataCC = await get("comite/status/0")
         setComitesCreados(dataCC)

         const dataSF = await get("comite/status/1")
         setComitesSf(dataSF)

         const dataF = await get("comite/status/2")
         setComitesFinalizados(dataF)
      } catch (error) {
         console.log(error)
      }
   }, [])

   useEffect(() => {
      obtenerComites()
   }, [obtenerComites])

   const comitesCreadosFormat = useMemo(() => {
      return comitesCreados.map((i) => {
         const fechaHI = formatDatetime(i.fechaHoraInicio)
         const fechaHF = formatDatetime(i.fechaHoraFin)
         return {
            ...i,
            fechaHoraInicio: fechaHI,
            fechaHoraFin: fechaHF,
         }
      })
   }, [comitesCreados])

   const comitesFinalizadosFormat = useMemo(() => {
      return comitesFinalizados.map((i) => {
         const fechaHI = formatDatetime(i.fechaHoraInicio)
         const fechaHF = formatDatetime(i.fechaHoraFin)
         return {
            ...i,
            fechaHoraInicio: fechaHI,
            fechaHoraFin: fechaHF,
         }
      })
   }, [comitesFinalizados])

   return (
      <Fragment>
         <div className="pb-2 flex justify-between items-center">
            <h2 className='text-4xl'>Comité de Evaluación</h2>
            <Link to={`/nuevoComite`}><button type='button' className='rounded s-button-create p-2' >Crear Comité</button></Link>
         </div>
         <div className='card mb-20'>
            <div className='card-body'>
               <ul className="nav nav-tabs">
                  <li className="nav-item">
                     <a href="#CC" data-toggle="tab" className="nav-link active">Comités Creados ({comitesCreados.length})</a>
                  </li>
                  <li className="nav-item">
                     <a href="#CSF" data-toggle="tab" className="nav-link">Comités sin Finalizar ({comitesSf.length})</a>
                  </li>
                  <li className="nav-item">
                     <a href="#CF" data-toggle="tab" className="nav-link">Comités Finalizados ({comitesFinalizados.length})</a>
                  </li>
               </ul>
               <div className="tab-content">
                  <div className="tab-pane active" id="CC">
                     <div className="px-2 pt-4">
                        <DataTable
                           headers={headers}
                           body={comitesCreadosFormat}
                           configTable={configTable}
                        />
                     </div>
                  </div>
                  <div className="tab-pane container fade" id="CSF">
                     <div className="px-2 pt-4">
                        <ComiteSF comites={comitesSf} reloadData={obtenerComites} />
                     </div>
                  </div>
                  <div className="tab-pane container fade" id="CF">
                     <div className="px-2 pt-4">
                        <DataTable
                           headers={headersTwo}
                           body={comitesFinalizadosFormat}
                           configTable={configTable}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Comite;