import { useEffect, useMemo, useRef, useState } from "react"
import DataTable from "../../../../components/Datatable/Datatable"
import { create, get, update, uploadFiles } from "../../../../config/Api/api"
import { ErrorValidate } from "../../../../components/Alerts/error.alert"
import { GoodValidate } from "../../../../components/Alerts/good.alert"
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom"

const CreateComite = () => {
   const navigate = useNavigate()
   const [programasFormativos, setProgramasFormativos] = useState([])
   const [coordinaciones, setCoordinaciones] = useState([])
   const [quejasChecked, setQuejasChecked] = useState([])
   const [formData, setFormData] = useState({
      fechaHoraInicio: "",
      fechaHoraFin: "",
      codigoComite: "",
      pcaComite: "",
      link: "https://meet.google.com/",
      Pf: ""
   })
   const [quejasD, setQuejasD] = useState([])
   const [errorAlerts, setErrorAlerts] = useState({
      error: "",
      label: "",
      status: true,
   })
   const [goodAlerts, setGoodAlerts] = useState({
      msg: "",
      status: true,
   })
   const currentTime = new Date().toISOString().slice(0, 16)
   const [validations, setValidations] = useState({
      vHI: {
         valid: 0,
         msg: "",
      },
      vHF: {
         valid: 0,
         msg: "",
      },
      vCodigoC: {
         valid: 0,
         msg: "",
      },
      vPca: {
         valid: 0,
         msg: "",
      },
      vLink: {
         valid: 0,
         msg: "",
      },
      vPf: {
         valid: 0,
         msg: "",
      }
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
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

   const headers = [
      {
         title: "Asignar", prop: "asignar", cell: (row) => (
            <input type="checkbox" name={`asignarQueja${row.idQueja}`} className="w-5 h-5 mr-2" id={`asignarQueja${row.idQueja}`} onChange={(e) => checkQueja(row.idQueja, e.target.checked)} />
         )
      },
      { title: "Ficha Aprendiz", prop: "aprendizQueja.fichaAprendiz.codigoFicha" },
      { title: "Aprendiz", prop: ["aprendizQueja.nombre", "aprendizQueja.apellidos"] },
      { title: "Realizada por...", prop: ["usuarioQueja.nombre", "usuarioQueja.apellidos"] },
      { title: "Motivo Comité", prop: "motivoQueja.nombreMotivo" },
      { title: "Descripción", prop: "descripcionMotivo" },
      { title: "Programa", prop: "competenciaQueja.programasCompetencia.nombrePF" },
      { title: "Trimestre Realizada", prop: "trimestre" },
   ]

   const quejasRows = useMemo(() => {
      return quejasD
         .filter(i => (i.estadoQueja && i.estadoQueja.idEstadoQuejas === 1) || i.estadoQueja.idEstadoQuejas === 2)
   }, [quejasD])



   useEffect(() => {
      const getData = async () => {
         try {
            const data = await get("programas-formativos")
            setProgramasFormativos(data)
         } catch (error) {
            console.log(error)
         }
      }
      getData()
   }, [])

   const handleSubmit = async () => {
      try {
         const errorChanges = { ...validations }
         if (formData.codigoComite === "" || formData.fechaHoraInicio === "" || formData.fechaHoraFin === "" || formData.link === "" || formData.pcaComite === "") {
            if (formData.codigoComite === "") {
               errorChanges.vCodigoC.msg = "El Código no debe ir vacío"
               errorChanges.vCodigoC.valid = 2
            } else {
               errorChanges.vCodigoC.msg = ""
               errorChanges.vCodigoC.valid = 1
            }
            if (formData.fechaHoraInicio === "") {
               errorChanges.vHI.msg = "Debes ingresar una fecha de inicio"
               errorChanges.vHI.valid = 2
            } else {
               errorChanges.vHI.msg = ""
               errorChanges.vHI.valid = 1
            }
            if (formData.fechaHoraFin === "") {
               errorChanges.vHF.msg = "Debes ingresar una fecha de fin"
               errorChanges.vHF.valid = 2
            } else {
               errorChanges.vHF.msg = ""
               errorChanges.vHF.valid = 1
            }
            if (formData.link === "") {
               errorChanges.vLink.msg = "El Link no debe ir vacío"
               errorChanges.vLink.valid = 2
            } else {
               errorChanges.vLink.msg = ""
               errorChanges.vLink.valid = 1
            }
            if (formData.pcaComite === "") {
               errorChanges.vPca.msg = "Debes asignar un Coordinador"
               errorChanges.vPca.valid = 2
            } else {
               errorChanges.vPca.msg = ""
               errorChanges.vPca.valid = 1
            }
            if (formData.Pf === "") {
               errorChanges.vPf.msg = "Debes asignar un Programa Formativo"
               errorChanges.vPf.valid = 2
            } else {
               errorChanges.vPf.msg = ""
               errorChanges.vPf.valid = 1
            }
            return setValidations(errorChanges)
         } else {
            errorChanges.vCodigoC.msg = ""
            errorChanges.vCodigoC.valid = 1
            errorChanges.vHF.msg = ""
            errorChanges.vHF.valid = 1
            errorChanges.vHI.msg = ""
            errorChanges.vHI.valid = 1
            errorChanges.vLink.msg = ""
            errorChanges.vLink.valid = 1
            errorChanges.vPca.msg = ""
            errorChanges.vPca.valid = 1
            errorChanges.vPf.msg = ""
            errorChanges.vPf.valid = 1
            setValidations(errorChanges)

            if (quejasChecked.length === 0) {
               var error = {
                  error: "Debes seleccionar al menos una queja",
                  label: "Quejas",
                  status: false,
               }
               return setErrorAlerts(error)
            }

            const selectComite = {
               fechaHoraInicio: formData.fechaHoraInicio,
               fechaHoraFin: formData.fechaHoraFin,
               codigoComite: formData.codigoComite,
               pcaComite: formData.pcaComite,
               link: formData.link,
            }

            const newComite = await create("comite", selectComite)
            if (newComite) {
               quejasChecked.map(async (i) => {
                  const updateQueja = {
                     comiteQueja: newComite.idComite,
                     estadoQueja: 3
                  }
                  await update(`quejas/${i}`, updateQueja)
               })
            }
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Completado",
               text: `Comité creado correctamente`,
               showConfirmButton: false,
               timer: 1500,
            })
            return navigate("/comite")
         }
      } catch (error) {
         console.log(error);
      }
   }

   const validated = useMemo(() => {
      return validations
   }, [validations])

   const getQuejas = async (id) => {
      try {
         if (id === "") {
            setQuejasD([])
            setCoordinaciones([])
         } else {
            const dataQuejas = await get(`quejas/programaQueja/${id}`)
            setQuejasD(dataQuejas)

            const dataCor = await get(`programa-coordinacion/byPF/${id}`)
            setCoordinaciones(dataCor)
         }
      } catch (error) {
         console.log(error)
      }
   }

   const checkQueja = (id, check) => {
      const validChecked = [...quejasChecked]
      if (check === true && !validChecked.includes(id)) {
         validChecked.push(id)
         return setQuejasChecked(validChecked)
      } else if (check === false && validChecked.includes(id)) {
         const indice = validChecked.indexOf(id)
         if (indice !== -1) {
            validChecked.splice(indice, 1)
            return setQuejasChecked(validChecked)
         }
      }
   };
   const errorAlert = useMemo(() => {
      return errorAlerts
   }, [errorAlerts])
   const goodAlert = useMemo(() => {
      return goodAlerts
   }, [goodAlerts])

   return (
      <div className="flex-col w-full px-3 py-2">
         {errorAlert.status === false ? (
            <ErrorValidate message={errorAlert.error} />
         ) : null}
         {errorAlert.status === false && (
            setTimeout(() => {
               setErrorAlerts({
                  error: "",
                  label: "",
                  status: true,
               })
            }, 1000)
         )}
         {goodAlert.status === false ? (
            <GoodValidate message={goodAlert.msg} />
         ) : null}
         {goodAlert.status === false && (
            setTimeout(() => {
               setGoodAlerts({
                  msg: "",
                  label: "",
                  status: true,
               })
            }, 1000)
         )}
         <div className="w-full">
            <form id="crearComiteForm">
               <div className="w-full flex-col">
                  <div className="flex justify-between items-start">
                     <div className="form-group">
                        <label htmlFor="codigoComite">Código Comité:</label>
                        <input type="number" value={formData.codigoComite} onChange={handleChange} className={`form-control ${validated.vCodigoC.valid === 2 && 'is-invalid'} ${validated.vCodigoC.valid === 1 && 'is-valid'}`} name="codigoComite" id="codigoComite" required />
                        {validated.vCodigoC.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vCodigoC.msg}</span>
                        )}
                     </div>
                     <div className="form-group">
                        <label htmlFor="Pf">Programa Formativo:</label>
                        <select name="Pf" id="Pf" value={formData.Pf} onChange={(e) => { handleChange(e); getQuejas(e.target.value) }} className={`form-control ${validated.vPf.valid === 2 && 'is-invalid'} ${validated.vPf.valid === 1 && 'is-valid'}`} required>
                           <option value="">-- --</option>
                           {programasFormativos.map((i, index) => (
                              <option key={index} data-toggle="tooltip" title={i.nombrePF} className="w-fit" value={i.idProgramaFormativo}>{i.nombrePF.length > 25 ? `${i.nombrePF.substring(0, 25)}...` : `${i.nombrePF}`}</option>
                           ))}
                        </select>
                        {validated.vPf.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vPf.msg}</span>
                        )}
                     </div>
                     <div className="form-group">
                        <label htmlFor="pcaComite">Coordinador Encargado:</label>
                        <select name="pcaComite" id="pcaComite" value={formData.pcaComite} onChange={handleChange} className={`form-control ${validated.vPca.valid === 2 && 'is-invalid'} ${validated.vPca.valid === 1 && 'is-valid'}`} required>
                           <option value="">-- --</option>
                           {coordinaciones.map((i, index) => (
                              <option key={index} data-toggle="tooltip" title={`${i.usuario.nombre} ${i.usuario.apellidos}`} value={i.idPCA}>{i.usuario.nombre} {i.usuario.apellidos}</option>
                           ))}
                        </select>
                        {validated.vPca.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vPca.msg}</span>
                        )}
                     </div>
                     <div className="form-group">
                        <label htmlFor="link">Link:</label>
                        <textarea name="link" id="link" value={formData.link} onChange={handleChange} className={`form-control ${validated.vLink.valid === 2 && 'is-invalid'} ${validated.vLink.valid === 1 && 'is-valid'}`} required cols="" rows="1"></textarea>
                        {validated.vLink.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vLink.msg}</span>
                        )}
                     </div>
                  </div>
                  <div className="flex justify-between">
                     <div className="flex justify-between">
                        <label htmlFor="fechaHoraInicio" className="mr-3">Fecha Inicio:</label>
                        <div className="form-group">
                           <input type="datetime-local" name="fechaHoraInicio" value={formData.fechaHoraInicio} min={currentTime} onChange={(e) => { setFormData({ ...formData, fechaHoraInicio: e.target.value, fechaHoraFin: e.target.value }) }} id="fechaHoraInicio" className={`form-control ${validated.vHI.valid === 2 && 'is-invalid'} ${validated.vHI.valid === 1 && 'is-valid'}`} required />
                           {validated.vHI.msg !== "" && (
                              <span className="text-xs text-red-600">{validated.vHI.msg}</span>
                           )}
                        </div>
                     </div>
                     <div className="flex justify-between">
                        <label htmlFor="fechaHoraFin" className="mr-3">Fecha Fin:</label>
                        <div className="form-group">
                           <input type="datetime-local" name="fechaHoraFin" value={formData.fechaHoraFin} min={formData.fechaHoraInicio} onChange={handleChange} id="fechaHoraFin" className={`form-control ${validated.vHF.valid === 2 && 'is-invalid'} ${validated.vHF.valid === 1 && 'is-valid'}`} required />
                           {validated.vHF.msg !== "" && (
                              <span className="text-xs text-red-600">{validated.vHF.msg}</span>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <hr className="border rounded m-2" />
         <div className="my-3">
            <h1 className="text-2xl pb-2">Seleccionar Aprendices</h1>
            <DataTable
               headers={headers}
               body={quejasRows}
               configTable={configTable}
            />
         </div>
         <div className="flex justify-end">
            <Link to={`/comite`}><button type="button" className="sm-cancel rounded p-2 mr-2">Cancelar</button></Link>
            <button type="submit" className="smc-success rounded p-2" onClick={handleSubmit}>Crear</button>
         </div>
      </div>
   )
}

const UpdateComite = ({ comiteInfo, others }) => {
   // eslint-disable-next-line
   const comite = useMemo(() => {
      return comiteInfo
   }, [comiteInfo])
   const [coordinaciones, setCoordinaciones] = useState([])
   const [formData, setFormData] = useState({
      fechaHoraInicio: new Date(comite.fechaHoraInicio).toISOString().slice(0, 16),
      fechaHoraFin: new Date(comite.fechaHoraFin).toISOString().slice(0, 16),
      pcaComite: comite.pcaComite.idPCA,
      link: comite.link,
   })
   const [errorAlerts, setErrorAlerts] = useState({
      error: "",
      label: "",
      status: true,
   })
   const currentTime = new Date().toISOString().slice(0, 16)
   const [validations, setValidations] = useState({
      vHI: {
         valid: 0,
         msg: "",
      },
      vHF: {
         valid: 0,
         msg: "",
      },
      vPca: {
         valid: 0,
         msg: "",
      },
      vLink: {
         valid: 0,
         msg: "",
      },
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }
   const getCor = async () => {
      try {
         const getCoordinaciones = await get(`programa-coordinacion/byPF/${comite.pcaComite.programaFormativo.idProgramaFormativo}`)
         setCoordinaciones(getCoordinaciones)
      } catch (error) {
         console.log(error)
      }
   }

   const handleSubmit = async () => {
      try {
         const errorChanges = { ...validations }
         if (formData.fechaHoraInicio === "" || formData.fechaHoraFin === "" || formData.link === "" || formData.pcaComite === "") {
            if (formData.fechaHoraInicio === "") {
               errorChanges.vHI.msg = "Debes ingresar una fecha de inicio"
               errorChanges.vHI.valid = 2
            } else {
               errorChanges.vHI.msg = ""
               errorChanges.vHI.valid = 1
            }
            if (formData.fechaHoraFin === "") {
               errorChanges.vHF.msg = "Debes ingresar una fecha de fin"
               errorChanges.vHF.valid = 2
            } else {
               errorChanges.vHF.msg = ""
               errorChanges.vHF.valid = 1
            }
            if (formData.link === "") {
               errorChanges.vLink.msg = "El Link no debe ir vacío"
               errorChanges.vLink.valid = 2
            } else {
               errorChanges.vLink.msg = ""
               errorChanges.vLink.valid = 1
            }
            if (formData.pcaComite === "") {
               errorChanges.vPca.msg = "Debes asignar un Coordinador"
               errorChanges.vPca.valid = 2
            } else {
               errorChanges.vPca.msg = ""
               errorChanges.vPca.valid = 1
            }
            return setValidations(errorChanges)
         } else {
            errorChanges.vHF.msg = ""
            errorChanges.vHF.valid = 0
            errorChanges.vHI.msg = ""
            errorChanges.vHI.valid = 0
            errorChanges.vLink.msg = ""
            errorChanges.vLink.valid = 0
            errorChanges.vPca.msg = ""
            errorChanges.vPca.valid = 0
            setValidations(errorChanges)

            const selectComite = {
               fechaHoraInicio: formData.fechaHoraInicio,
               fechaHoraFin: formData.fechaHoraFin,
               pcaComite: formData.pcaComite,
               link: formData.link,
            }
            await update(`comite/${comite.codigoComite}`, selectComite)
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Completado",
               text: `Comité actualizado correctamente`,
               showConfirmButton: false,
               timer: 1500,
            })
            others.function()
         }
      } catch (error) {
         console.log(error);
      }
   }

   const validated = useMemo(() => {
      return validations
   }, [validations])

   const errorAlert = useMemo(() => {
      return errorAlerts
   }, [errorAlerts])

   const changeCor = useMemo(() => {
      return coordinaciones
   }, [coordinaciones])

   return (
      <div className="flex-col w-full px-3 py-2">
         {errorAlert.status === false ? (
            <ErrorValidate message={errorAlert.error} />
         ) : null}
         {errorAlert.status === false && (
            setTimeout(() => {
               setErrorAlerts({
                  error: "",
                  label: "",
                  status: true,
               })
            }, 1000)
         )}
         <div className="w-full">
            <form id="crearComiteForm">
               <div className="w-full flex-col">
                  <div className="flex justify-between items-start">
                     <div className="form-group w-full flex justify-between mr-3">
                        <label htmlFor="codigoComite">Código Comité:</label>
                        <p className="font-bold">{comite.codigoComite}</p>
                     </div>
                     <div className="form-group w-full flex justify-between">
                        <label htmlFor="Pf">Programa Formativo:</label>
                        <p className="font-bold">{comite.pcaComite.programaFormativo.nombrePF}</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-start">
                     <div className="form-group w-full mr-3">
                        <label htmlFor="pcaComite">Coordinador Encargado:</label>
                        <select name="pcaComite" id="pcaComite" value={formData.pcaComite} onChange={handleChange} onClick={getCor} className={`form-control ${validated.vPca.valid === 2 && 'is-invalid'} ${validated.vPca.valid === 1 && 'is-valid'}`} required>
                           <option value={comite.pcaComite.idPCA}> -- {comite.pcaComite.usuario.nombre} {comite.pcaComite.usuario.apellidos} --</option>
                           {changeCor.map((i, index) => (
                              <option key={index} data-toggle="tooltip" title={`${i.usuario.nombre} ${i.usuario.apellidos}`} value={i.idPCA}>{i.usuario.nombre} {i.usuario.apellidos}</option>
                           ))}
                        </select>
                        {validated.vPca.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vPca.msg}</span>
                        )}
                     </div>
                     <div className="form-group w-full">
                        <label htmlFor="link">Link:</label>
                        <textarea name="link" id="link" value={formData.link} onChange={handleChange} className={`form-control ${validated.vLink.valid === 2 && 'is-invalid'} ${validated.vLink.valid === 1 && 'is-valid'}`} required cols="" rows="1"></textarea>
                        {validated.vLink.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vLink.msg}</span>
                        )}
                     </div>
                  </div>
                  <div className="flex justify-between items-start">
                     <div className="form-group w-full mr-3">
                        <label htmlFor="fechaHoraInicio" className="mr-3">Fecha Inicio:</label>
                        <input type="datetime-local" name="fechaHoraInicio" value={formData.fechaHoraInicio} min={currentTime} onChange={(e) => { setFormData({ ...formData, fechaHoraInicio: e.target.value, fechaHoraFin: e.target.value }) }} id="fechaHoraInicio" className={`form-control ${validated.vHI.valid === 2 && 'is-invalid'} ${validated.vHI.valid === 1 && 'is-valid'}`} required />
                        {validated.vHI.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vHI.msg}</span>
                        )}
                     </div>
                     <div className="form-group w-full">
                        <label htmlFor="fechaHoraFin" className="mr-3">Fecha Fin:</label>
                        <input type="datetime-local" name="fechaHoraFin" value={formData.fechaHoraFin} min={formData.fechaHoraInicio} onChange={handleChange} id="fechaHoraFin" className={`form-control ${validated.vHF.valid === 2 && 'is-invalid'} ${validated.vHF.valid === 1 && 'is-valid'}`} required />
                        {validated.vHF.msg !== "" && (
                           <span className="text-xs text-red-600">{validated.vHF.msg}</span>
                        )}
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <div className="flex justify-end">
            <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal">Cancelar</button>
            <button type="submit" className="smc-success rounded p-2" data-dismiss="modal" onClick={handleSubmit}>Actualizar</button>
         </div>
      </div>
   )
}

const UploadActa = ({ comiteInfo, reload }) => {
   // eslint-disable-next-line
   const [comite, setComite] = useState(comiteInfo)
   const [archivo, setArchivo] = useState(null)
   const navigate = useNavigate()
   const fileRef = useRef(null)

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setArchivo(selectedFile)
   }

   const handleSubmit = async () => {
      if (!archivo) {
         return
      }
      const formData = new FormData()
      formData.append("file", archivo)
      formData.append("codigoComite", comite.codigoComite)

      await uploadFiles(`comite/upload/acta`, formData)
      await Swal.fire({
         position: "center",
         icon: "success",
         title: "Completado",
         text: `Acta subida correctamente`,
         showConfirmButton: false,
         timer: 1500,
      })
      setArchivo(null)
      fileRef.current.value = null
      if (reload) {
         await reload()
      }
      // onNext()
      return navigate("/comite")
   }

   return (
      <div className="flex justify-between w-full">
         <form method="POST">
            <div className="form-group">
               <label htmlFor="file">Subir Acta (Comité: {comite.codigoComite}):</label>
               <input type="file" name="file" ref={fileRef} onChange={handleFileChange} id="file" className="form-input max-w-[500px] border-2 border-gray-300 rounded hover:bg-gray-200" />
            </div>
            <div className="form-group flex justify-end items-center">
               <button type="button" className="btn btn-danger bg-danger mr-2" data-dismiss="modal">Cancelar</button>
               <button type="submit" onClick={handleSubmit} className="btn btn-success bg-success" data-dismiss="modal">Subir Acta</button>
            </div>
         </form>
      </div>
   )

}

const UploadResolucion = ({ comiteInfo, reload }) => {
   // eslint-disable-next-line
   const [comite, setComite] = useState(comiteInfo)
   const [archivo, setArchivo] = useState(null)
   const navigate = useNavigate()
   const fileRef = useRef(null)

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      setArchivo(selectedFile)
   }

   const handleSubmit = async () => {
      if (!archivo) {
         return
      }
      const formData = new FormData()
      formData.append("file", archivo)
      formData.append("codigoComite", comite.codigoComite)

      const data = await uploadFiles(`comite/upload/resolucion`, formData)
      if (data.res.status === 200) {
         const getQuejas = await get(`quejas/comite/${comite.codigoComite}`)
         await Promise.all(getQuejas.map(async (i) => {
            const queja = {
               estadoQueja: 5
            }
            await update(`quejas/${i.idQueja}`, queja)
            // console.log("Hola Quejas:", i)

            if (i.decisionQueja && i.decisionQueja.nombreDecision.includes("Plan de Mejoramiento")) {
               const newPlan = {
                  quejaPlanMejoramiento: i.idQueja,
                  usuarioPlanMejoramiento: i.usuarioQueja.idUsuario,
                  aprendizPlanMejoramiento: i.aprendizQueja.idAprendiz,
                  trimestre: i.trimestre,
               }
               await create("plan-mejoramiento", newPlan)
               // console.log("Hola Plan")
            }
            if (i.decisionQueja && i.decisionQueja.nombreDecision.includes("Cancelación")) {
               const aprendizCancel = {
                  estadoAprendiz: 0
               }
               await update(`aprendices/${i.aprendizQueja.idAprendiz}`, aprendizCancel)
            }
         }))
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Completado",
            text: `Resolución subida, Comité finalizado`,
            showConfirmButton: false,
            timer: 1500,
         })
      }
      setArchivo(null)
      fileRef.current.value = null
      if (reload) {
         await reload()
      }
      return navigate("/comite")
   }

   return (
      <div className="flex justify-between w-full">
         <form method="POST">
            <div className="form-group">
               <label htmlFor="file">Subir Resolución (Comité: {comite.codigoComite}):</label>
               <input type="file" ref={fileRef} name="file" onChange={handleFileChange} id="file" className="form-input max-w-[500px] border-2 border-gray-300 rounded hover:bg-gray-200" />
            </div>
            <div className="form-group flex justify-end items-center">
               <button type="button" className="btn btn-danger bg-danger mr-2" data-dismiss="modal">Cancelar</button>
               <button type="submit" onClick={handleSubmit} className="btn btn-success bg-success" data-dismiss="modal">Subir Resolución</button>
            </div>
         </form>
      </div>
   )
}

export {
   CreateComite,
   UpdateComite,
   UploadActa,
   UploadResolucion
}