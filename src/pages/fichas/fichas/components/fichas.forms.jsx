import React, { Fragment, useState, useEffect, useMemo } from "react";
import { create, get, update } from "../../../../config/Api/api";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import DataTable from "../../../../components/Datatable/Datatable";

const CreateFichas = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      codigoFicha: "",
      programaFicha: "",
      usuarioFichaDirector: "",
   });
   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = await create("fichas", formData);
         // console.log(data);
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Completado",
            text: `Ficha creada correctamente`,
            showConfirmButton: false,
            timer: 1500,
         })
         others.reloadData()
         // window.location.reload();
      } catch (error) {
         console.log(error);
      }
   };

   const cancelForm = () => {
      setFormData({
         codigoFicha: "",
         programaFicha: "",
         usuarioFichaDirector: "",
      });
   };

   return (
      <Fragment>
         <form >
            <div className="form-group">
               <label htmlFor="codigoFicha">
                  Código Ficha: <font color="red">*</font>
               </label>
               <input
                  value={formData.codigoFicha}
                  onChange={handleChange}
                  name="codigoFicha"
                  type="number"
                  className="form-control"
                  id="codigoFicha"
                  required
               />
            </div>
            <div className="form-group">
               <label htmlFor="programaFicha">
                  Programa Formativo: <font color="red">*</font>
               </label>
               <br />
               <select
                  value={formData.programaFicha}
                  onChange={handleChange}
                  name="programaFicha"
                  id="programaFicha"
                  className="form-control"
                  required
               >
                  <option value="">-- --</option>
                  {claves.programaF.map((i) => {
                     return (
                        <option
                           key={i.idProgramaFormativo}
                           value={i.idProgramaFormativo}
                        >
                           {i.nombrePF}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="form-group">
               <label htmlFor="usuarioFichaDirector">
                  Director Ficha: <font color="red">*</font>
               </label>
               <br />
               <select
                  value={formData.usuarioFichaDirector}
                  onChange={handleChange}
                  name="usuarioFichaDirector"
                  id="usuarioFichaDirector"
                  className="form-control"
                  required
               >
                  <option value="">-- --</option>
                  {claves.directorF.map((i) => {
                     if (i.rolUsuario.nombreRol.includes("Instructor")) {
                        return (
                           <option key={i.idUsuario} value={i.idUsuario}>
                              {i.nombre} {i.apellidos}
                           </option>
                        );
                     }
                     return null;
                  })}
               </select>
            </div>
            <div className="col d-flex justify-content-end">
               <button
                  type="button"
                  className="s-button-cancel rounded p-2 mr-2"
                  data-dismiss="modal"
                  onClick={cancelForm}
               >
                  Cancelar
               </button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">
                  Crear
               </button>
            </div>
         </form>
      </Fragment>
   );
};

const FichaInstructor = ({ claves, others }) => {
   // eslint-disable-next-line
   const [token, setToken] = useState(
      jwt_decode(localStorage.getItem("tokenJWT"))
   );
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo);
   const [formData, setFormData] = useState({
      usuario: "",
      ficha: "",
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const result = await create("ficha-usuario", formData);
         if (result.status === 400) {
            await Swal.fire({
               position: "center",
               icon: "error",
               title: "Error",
               text: `${result.response}`,
               showConfirmButton: false,
               timer: 1500,
            })
            return null
         }
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Completado",
            text: `Instructor asignado`,
            showConfirmButton: false,
            timer: 1500,
         })
         others.reloadData()
         console.log(result);
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const cancelForm = () => {
      setFormData({
         ficha: "",
         usuario: "",
      })
   };

   return (
      <Fragment>
         <form id="instructorFichaForm">
            <div className="form-group">
               <label htmlFor="ficha">Código Ficha:</label>
               <div className="form-group">
                  <select
                     value={formData.ficha}
                     onChange={handleChange}
                     name="ficha"
                     id="ficha"
                     className="form-control"
                     required
                  >
                     <option>-- --</option>
                     {claves.fichas.map((i) => {
                        return (
                           <option key={i.idFicha} value={i.codigoFicha} data-toggle="tooltip" title={i.programaFicha.nombrePF}>
                              {i.codigoFicha} - {i.programaFicha.abreviaturaPF}
                           </option>
                        );
                     })}
                  </select>
               </div>
               <div className="form-group">
                  <label htmlFor="usuario">Asignar Instructor:</label>
                  <select
                     value={formData.usuario}
                     onChange={handleChange}
                     name="usuario"
                     id="usuario"
                     className={`form-control`}
                     required
                  >
                     <option value="">-- --</option>
                     {claves.instructores.map((i) => (
                        <option key={i.idUsuario} value={i.idUsuario}>
                           {i.nombre} - {i.apellidos}
                        </option>
                     ))}
                  </select>

               </div>
            </div>
            <div className="col d-flex justify-content-end">
               <button
                  type="button"
                  className="s-button-cancel rounded p-2 mr-2"
                  data-dismiss="modal"
                  onClick={cancelForm}
               >
                  Cancelar
               </button>
               <button type="submit" className="s-button-success rounded p-2" onClick={handleSubmit} data-dismiss="modal">
                  Asignar Ficha
               </button>
            </div>
         </form>
      </Fragment>
   );
};

const CreateGrupoProyecto = ({ aprendices, ficha }) => {
   const [nombreProyecto, setNombreProyecto] = useState("");
   const [aprendizSelects, setAprendizSelects] = useState([
      { id: 0, aprendiz: "" },
   ]);

   const agregarAprendiz = () => {
      const newId = aprendizSelects.length + 1;
      setAprendizSelects((prevSelects) => [
         ...prevSelects,
         { id: newId, aprendiz: "" },
      ]);
   };

   const removerAprendiz = () => {
      setAprendizSelects((prevSelects) => prevSelects.slice(0, -1));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const dataGrupo = {
         fichaGrupo: ficha,
         nombreProyecto: formData.get("nombreProyecto"),
      };
      const createdGrupo = await create("grupo-proyecto", dataGrupo);
      console.log(createdGrupo);

      const dataAprendices = aprendizSelects.map((select, selectIndex) => {
         if (selectIndex === 0) {
            return {
               aprendiz: formData.get("aprendiz"),
               grupoAprendiz: createdGrupo.idGrupoProyecto,
            };
         }
         return {
            aprendiz: formData.get(`aprendizSelect${selectIndex}`),
            grupoAprendiz: createdGrupo.idGrupoProyecto,
         };
      });
      console.log(dataAprendices);

      dataAprendices.forEach(async (dataAprendiz) => {
         const grupo = {
            grupoAprendiz: dataAprendiz.grupoAprendiz,
         };
         const updateAprendices = await update(`aprendices/${dataAprendiz.aprendiz}`, grupo);
         // console.log(updateAprendices);
      });
      await Swal.fire({
         position: "center",
         icon: "success",
         title: "Completado",
         text: `Grupo creado correctamente`,
         showConfirmButton: false,
         timer: 1500,
      })
      window.location.reload();
   };

   const cancelForm = () => {
      const clearForm = document.getElementById("crearGrupoForm");
      clearForm.reset();
   };

   return (
      <Fragment>
         <form id="crearGrupoForm" onSubmit={handleSubmit}>
            <div className="form-group">
               <label htmlFor="nombreProyecto">Nombre:</label>
               <input
                  name="nombreProyecto"
                  type="text"
                  className="form-control"
                  id="nombreProyecto"
                  required
                  value={nombreProyecto}
                  onChange={(e) => setNombreProyecto(e.target.value)}
               />
            </div>
            <div className="flex p-0 justify-between items-end mb-2">
               <div className="p-0">
                  <div className="form-group">
                     <label htmlFor="aprendiz">Aprendiz:</label>
                     <select
                        className="form-control"
                        name="aprendiz"
                        id="aprendiz"
                        required
                     >
                        <option>Seleccionar</option>
                        {/* // eslint-disable-next-line */}
                        {aprendices.map((aprendiz) => {
                           if (aprendiz.grupoAprendiz === null) {
                              return (
                                 <option
                                    key={aprendiz.idAprendiz}
                                    value={aprendiz.idAprendiz}
                                 >
                                    {aprendiz.nombre} {aprendiz.apellidos}
                                 </option>
                              );
                           }
                           return null;
                        })}
                     </select>

                     {aprendizSelects.map((aprendiz, selectIndex) =>
                        selectIndex === 0 ? null : (
                           <Fragment>
                              <div className="form-group mt-3">
                                 {/* <label htmlFor={`aprendizSelect${selectIndex}`}>
                                    Aprendiz:
                                 </label> */}
                                 <select
                                    key={selectIndex}
                                    className="form-control"
                                    name={`aprendizSelect${selectIndex}`}
                                    id={`aprendizSelect${selectIndex}`}
                                    required
                                    value={aprendiz.aprendiz}
                                    onChange={(e) => {
                                       const updatedSelects = [...aprendizSelects];
                                       updatedSelects[selectIndex].aprendiz = e.target.value;
                                       setAprendizSelects(updatedSelects);
                                    }}
                                 >
                                    <option>Seleccionar</option>
                                    {aprendices.map((i, optionIndex) => {
                                       if (i.grupoAprendiz === null) {
                                          return (
                                             <option key={optionIndex} value={i.idAprendiz}>
                                                {i.nombre} {i.apellidos}
                                             </option>
                                          );
                                       }
                                       return null;
                                    })}
                                 </select>
                              </div>
                           </Fragment>
                        )
                     )}
                  </div>
               </div>
               <div className={`form-group flex justify-end ml-2 items-center ${aprendices.length <= 1 && 'hidden'}`}>
                  {/* <div className={`col ${aprendices.length <= 1 && 'hidden'}`}> */}
                  <button
                     type="button"
                     className={`btn btn-success bg-success mr-2 ${aprendices.length <= 1 && 'hidden'}`}
                     id="agregarAprendiz"
                     onClick={agregarAprendiz}
                  >
                     +
                  </button>
                  {/* </div> */}
                  {/* <div className={`col ${aprendizSelects.length <= 1 && 'hidden'}`}> */}
                  <button
                     type="button"
                     className={`btn btn-danger bg-danger ${aprendizSelects.length <= 1 && 'hidden'}`}
                     id="removerAprendiz"
                     onClick={removerAprendiz}
                  >
                     -
                  </button>
                  {/* </div> */}
               </div>
            </div>
            <div className="col d-flex justify-content-end">
               <button
                  type="button"
                  className="s-button-cancel rounded p-2 mr-2"
                  data-dismiss="modal"
                  onClick={cancelForm}
               >
                  Cancelar
               </button>
               <button type="submit" className="s-button-success rounded p-2">
                  Crear Grupo
               </button>
            </div>
         </form>
      </Fragment>
   );
};

const ConsultarOf = ({ competencia, usuario, resultadoEntregaFicha, trimestre, entrega }) => {
   const headers = [
      { title: "ID", prop: "idObservacionAprendiz" },
      { title: "Nombre Competencia", prop: "bb" },
   ]

   const [observaciones, setObservaciones] = useState([])

   useEffect(() => {
      const loadData = async () => {
         if (entrega && entrega.idEntregaFicha) {
            console.log(entrega.idEntregaFicha)
            const dataObservaciones = await get(`observaciones-aprendiz/entrega/${entrega.idEntregaFicha}`)
            console.log(dataObservaciones)
            setObservaciones(dataObservaciones)
         }
      }
      loadData()
   }, [entrega])

   const observacionesMemo = useMemo(async () => {
      if (entrega && entrega.idEntregaFicha) {
         return await get(`observaciones-aprendiz/entrega/${entrega.idEntregaFicha}`)
         // setObservaciones(dataObservaciones)
      }
   }, [entrega])


   const configTable = {
      initialRows: 5,
      rowPage: {
         maxRows: [5, 10, 20]
      },
      filtrable: true,
      pagination: true,
      message: true,
   }

   return (
      <Fragment>
         <div className="container">
            <div className="row">
               <div className="col-md-5">
                  <div className="form-group">
                     <label htmlFor="documento">Competencia:</label>
                     <p className="font-bold">{competencia.nombreCompetencia}</p>

                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                     <label htmlFor="tipoDocumentopf">Trimestres:</label>
                     <p className="font-bold">{trimestre}</p>
                     {/* {console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAA", competencia)} */}
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                     <label htmlFor="rolpf">Instructor:</label>
                     <p className="font-bold">{usuario.nombre} {usuario.apellidos}</p>
                  </div>
               </div>

            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombre">Resultado de Aprendizaje:</label>
                     <p className="font-bold">{resultadoEntregaFicha.nombreRA}</p>
                  </div>
               </div>
            </div>
            <DataTable
               headers={headers}
               body={observaciones}
               configTable={configTable}
            />
         </div>
      </Fragment>
   );
};




export { CreateFichas, FichaInstructor, CreateGrupoProyecto, ConsultarOf };
