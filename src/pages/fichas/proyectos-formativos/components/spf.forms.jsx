import { useState } from "react"
import { get, uploadFiles } from "../../../../config/Api/api"
import jwt_decode from "jwt-decode"
import Swal from "sweetalert2"

const UploadEvidencia = ({ competencias, grupoInfo, reloadData }) => {
   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo)
   const [archivo, setArchivo] = useState(null)
   const [otherData, setOtherData] = useState({
      nombreArchivo: "",
      observacionArchivoProyecto: "",
      competenciaArchivo: "",
      resultadoArchivo: "",
   })
   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setArchivo(selectedFile)
   }

   const handleOtherChange = (e) => {
      setOtherData({
         ...otherData,
         [e.target.name]: e.target.value
      })
   }

   const [resultados, setResultados] = useState([])
   const handleGetRAP = async (e) => {
      setOtherData({
         ...otherData,
         [e.target.name]: e.target.value
      })
      const dataRAP = await get(`resultado-aprendizaje/competencia/${e.target.value}`)
      setResultados(dataRAP)
   }

   const cancelForm = () => {
      setArchivo(null)
      setOtherData({
         nombreArchivo: "",
         observacionArchivoProyecto: "",
         competenciaArchivo: "",
         resultadoArchivo: "",
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!archivo) {
         return
      }
      const formData = new FormData()
      formData.append("file", archivo)
      formData.append("nombreArchivo", otherData.nombreArchivo)
      formData.append("observacionArchivoProyecto", otherData.observacionArchivoProyecto)
      formData.append("usuarioArchivo", `${user.idUsuario}`)
      formData.append("competenciaArchivo", otherData.competenciaArchivo)
      formData.append("resultadoArchivo", otherData.resultadoArchivo)
      formData.append("grupoArchivo", `${grupoInfo.idGrupoProyecto}`)

      await uploadFiles(`grupo-proyecto/upload/archivos`, formData)
      // console.log(data)
      await Swal.fire({
         position: "center",
         icon: "success",
         title: "Completado",
         text: `Evidencia subida correctamente`,
         showConfirmButton: false,
         timer: 1500,
      })
      cancelForm()
      if (reloadData) {
         await reloadData()
      }
   }

   return (
      <div className="flex justify-between w-full">
         <form method="POST" className="">
            <div className="flex-row">
               <div className="flex justify-between">
                  <div className="form-group px-2">
                     <label htmlFor="nombreArchivo">Nombre Archivo:</label>
                     <input type="text" name="nombreArchivo" value={otherData.nombreArchivo} onChange={handleOtherChange} id="nombreArchivo" className="form-control" />
                  </div>
                  <div className="form-group px-2">
                     <label htmlFor="file">Evidencia:</label>
                     <input type="file" name="file" onChange={handleFileChange} id="file" className="form-control border-2 p-0 border-gray-300 rounded hover:bg-gray-200" />
                  </div>
               </div>
               <div className="flex justify-between">
                  <div className="form-group px-2 w-full">
                     <label htmlFor="competenciaArchivo">Competencia:</label>
                     <select id="competenciaArchivo" onChange={handleGetRAP} value={otherData.competenciaArchivo} className="form-control" name="competenciaArchivo">
                        <option>-- --</option>
                        {competencias.map((i) => {
                           if (i.programasCompetencia.idProgramaFormativo === grupoInfo.fichaGrupo.programaFicha.idProgramaFormativo) {
                              return (
                                 <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
                              )
                           }
                           return null;
                        })}
                     </select>
                  </div>
                  <div className="form-group px-2 w-full">
                     <label htmlFor="resultadoArchivo">Resultado de Aprendizaje:</label>
                     <select id="resultadoArchivo" value={otherData.resultadoArchivo} onChange={handleOtherChange} className="form-control" name="resultadoArchivo">
                        <option>-- --</option>
                        {resultados.map((i) => {
                           return (
                              <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
                           )
                        })}
                     </select>
                  </div>
               </div>
            </div>
            <div className="form-group px-2">
               <label htmlFor="observacionArchivoProyecto">Observación:</label>
               <textarea name="observacionArchivoProyecto" value={otherData.observacionArchivoProyecto} onChange={handleOtherChange} className="form-control" id="observacionArchivoProyecto" cols="" rows=""></textarea>
            </div>
            <div className="form-group flex justify-end items-center px-2">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" onClick={cancelForm} data-dismiss="modal">Cancelar</button>
               <button type="submit" onClick={handleSubmit} className="s-button-success rounded p-2" data-dismiss="modal">Subir Acta</button>
            </div>
         </form>
      </div>
   )
}

export {
   UploadEvidencia,
}