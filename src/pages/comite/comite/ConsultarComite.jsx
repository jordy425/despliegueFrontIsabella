import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { downloadFiles, get } from "../../../config/Api/api"
import DataTable from "../../../components/Datatable/Datatable"

const ComiteConsultado = () => {
   const headers = [
      {
         title: "Asistencia", prop: "actionsAsistencia", cell: (row) => {
            if (row.asisteComite === true) {
               return "Asistió"
            }
            if (row.asisteComite === false) {
               return "No Asistió"
            }
         }
      },
      { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
      { title: "Instructor", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
      { title: "Motivo", prop: "motivoQueja.nombreMotivo" },
      { title: "Descripción Motivo", prop: "descripcionMotivo" },
      { title: "Decisión Comité", prop: "decisionQueja.nombreDecision" },
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

   const { comite } = useParams("comite")
   const [comiteCita, setComiteCita] = useState([])
   const [quejas, setQuejas] = useState([])

   useEffect(() => {
      const obtenerDatos = async () => {
         try {
            const comiteData = await get(`comite/${comite}`)
            setComiteCita(comiteData)

            const quejasAprendices = await get(`quejas/comite/${comite}`)
            setQuejas(quejasAprendices)
         } catch (error) {
            console.error(error)
         }
      }
      obtenerDatos()
   }, [comite])

   const handleDownload = async (filename, file) => {
      try {
         if (file === 1) {
            const response = await downloadFiles(`comite/download/acta/${filename}`);
            const url = window.URL.createObjectURL(new Blob([response]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            // console.log("1: ", filename)
            
         } else if (file === 2) {
            // console.log("2: ", filename)
            const response = await downloadFiles(`comite/download/resolucion/${filename}`);
            const url = window.URL.createObjectURL(new Blob([response]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
         }
      } catch (error) {
         console.error('Error al descargar el archivo:', error);
      }
   };

   return (
      <Fragment>
         <div className="flex justify-between items-center pb-2">
            <h2 className='text-4xl'>Comité - {comiteCita.codigoComite}</h2>
            <Link to={`/comite`}><button className="s-button-cancel rounded p-2">Volver</button></Link>
         </div>
         <div className="card mb-3">
            <div className="card-body col d-flex justify-content-between">
               <div className="col">
                  <h6 className="font-semibold my-2">Programa Formativo:</h6>
                  {comiteCita && comiteCita.pcaComite && comiteCita.pcaComite.programaFormativo && (
                     <p>{comiteCita.pcaComite.programaFormativo.nombrePF}</p>
                  )}
               </div>
               <div className="col">
                  <h6 className="font-semibold my-2">Fecha:</h6>
                  <p>{comiteCita.fechaHoraInicio}</p>
               </div>
               <div className="col">
                  <h6 className="font-semibold my-2">Link:</h6>
                  <p>{comiteCita.link}</p>
               </div>
               <div className="col">
                  <h6 className="font-semibold my-2">Coordinación:</h6>
                  {comiteCita && comiteCita.pcaComite && comiteCita.pcaComite.usuario && (
                     <p>{comiteCita.pcaComite.usuario.nombre} {comiteCita.pcaComite.usuario.apellidos}</p>
                  )}
               </div>
               <div className="col-3">
                  <div className="form-group flex justify-between items-center">
                     <button type="button" onClick={() => handleDownload(comiteCita.acta, 1)} className="s-button-others rounded p-2 mr-2">Descargar Acta</button>
                     <button type="button" onClick={() => handleDownload(comiteCita.resolucion, 2)} className="s-button-create rounded p-2">Descargar Resolución</button>
                  </div>
               </div>
            </div>
         </div>
         <div className="card mb-20">
            <div className="card-body">
               <div className="w-full p-2">
                  <DataTable
                     headers={headers}
                     body={quejas}
                     configTable={configTable}
                  />
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default ComiteConsultado