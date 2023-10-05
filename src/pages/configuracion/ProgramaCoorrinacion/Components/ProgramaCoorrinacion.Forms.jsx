import React, { Fragment, useState } from "react";
import { create, update } from "../../../../config/Api/api";
import Swal from "sweetalert2";

const CreatePC = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      programaFormativo: "",
      usuario: "",
   })
   const [errors, setErrors] = useState({
      programaformativo: "",
      usuario: ""
   });

   const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      let newErrors = { ...errors };

      if (value.trim() === "") {
         newErrors[name] = "Campo requerido";
      } else {
         newErrors[name] = false;
      }


      setErrors(newErrors);
   };
   const handleSubmit = async (e) => {
      e.preventDefault();

      const hasErrors = Object.values(errors).some((error) => error);
      if (hasErrors) {
         console.log("Existen errores en el formulario.");
         return;
      } else {
         try {
            // eslint-disable-next-line
            const data = await create("programa-coordinacion", formData);
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Registro exitoso",
               showConfirmButton: false,
               timer: 1500,
            });
            cancelForm();
            others.reloadData();
         } catch (error) {
            console.log(error);
         }
      }
   };


   const cancelForm = () => {
      setFormData({
         programaFormativo: "",
         usuario: "",
      })
   }



   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-1">
            <div className="form-group">
               <label htmlFor="usuario">Coordinador Programa: <span style={{ color: "red" }}>*</span></label>
               <select
                  value={formData.usuario}
                  onChange={handleChange}
                  name="usuario"
                  id="usuario"
                  className={`form-control ${errors.usuario ? "is-invalid" : ""}`}
                  required
               >
                  <option value="">-- --</option>
                  {claves.usuarioP.map((i) => {
                     if (i.rolUsuario.nombreRol.includes("Coordinador")) {
                        return (
                           <option key={i.idUsuario} value={i.idUsuario}>{i.nombre} {i.apellidos}</option>
                        );
                     }
                     return null;
                  })}
               </select>
               {errors.usuario && <span className="invalid-feedback">{errors.usuario}</span>}
            </div>


            <div className="form-group">
               <label htmlFor="programaFormativo">Programa Formativo: <span style={{ color: "red" }}>*</span></label>
               <select
                  value={formData.programaFormativo}
                  onChange={handleChange}
                  name="programaFormativo"
                  id="programaFormativo"
                  className={`form-control ${errors.programaformativo ? "is-invalid" : ""}`}
                  required
               >
                  <option value="">-- --</option>
                  {claves.programaF.map((i) => (
                     <option key={i.idProgramaFormativo} value={i.idProgramaFormativo}>
                        {i.nombrePF}
                     </option>
                  ))}
               </select>
               {errors.programaformativo && <span className="invalid-feedback">{errors.programaformativo}</span>}
            </div>
            <div className="flex justify-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm} >
                  Cancelar
               </button>
               <button
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="smc-success rounded p-2">
                  Crear
               </button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdatePC = ({ PC, claves, others }) => {
   const [formData, setFormData] = useState({
      programaFormativo: PC.programaFormativo.idProgramaFormativo,
      usuario: PC.usuario.idUsuario,
   });
   const [errors, setErrors] = useState({
      programaFormativo: "",
      usuario: "",
   });

   const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      let newErrors = { ...errors };

      if (value.trim() === "") {
         newErrors[name] = "Campo requerido";
      } else {
         newErrors[name] = false;
      }

      setErrors(newErrors);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      let newErrors = { ...errors };
      // Si hay errores, detener la actualización
      setErrors(newErrors);
      console.log(newErrors)

      if (Object.values(newErrors).some((error) => error)) {
         console.log("Existen errores en el formulario.");
         return;
      }


      // Si no hay errores, realizar la actualización
      try {
         const data = await update(`programa-coordinacion/${PC.idPCA}`, formData);
         console.log(data);
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Actualización exitosa",
            showConfirmButton: false,
            timer: 1500,
         });
         others.reloadData();
         console.log(data);
         //window.location.reload()
      } catch (error) {
         console.log(error);
      }
   };

   const cancelForm = () => {
      setFormData({
         programaFormativo: PC.programaFormativo.idProgramaFormativo,
         usuario: PC.usuario.idUsuario,
      });

      setErrors({
         programaFormativo: "",
         usuario: "",
      });
   };

   return (
      <Fragment>
         <form className="p-1">
               <div className="form-group">
                  <label htmlFor="usuario">Coordinador Programa:</label>
                  <select
                     value={formData.usuario}
                     onChange={handleChange}
                     name="usuario"
                     id="usuario"
                     className={`form-control ${errors.usuario ? "is-invalid" : ""}`}
                     required
                  >
                     <option value={PC.usuario.idUsuario}>-- {PC.usuario.nombre} {PC.usuario.apellidos} --</option>
                     {claves.usuarioP.map((i) => {
                        if (i.rolUsuario.nombreRol.includes("Coordinador")) {
                           return (
                              <option key={i.idUsuario} value={i.idUsuario}>{i.nombre} {i.apellidos}</option>
                           );
                        }
                        return null;
                     })}
                  </select>
                  {errors.usuario && <span className="invalid-feedback">{errors.usuario}</span>}
               </div>
               <div className="form-group">
                  <label htmlFor="programaFormativo">Programa formativo:</label>
                  <select
                     value={formData.programaFormativo}
                     onChange={handleChange}
                     name="programaFormativo"
                     id="programaFormativo"
                     className={`form-control ${errors.programaFormativo ? "is-invalid" : ""}`}
                     required
                  >
                     <option value={PC.programaFormativo.idProgramaFormativo}>-- {PC.programaFormativo.nombrePF} --</option>
                     {claves.programaF.map((i) => (
                        <option key={i.idProgramaFormativo} value={i.idProgramaFormativo}>
                           {i.nombrePF}
                        </option>
                     ))}
                  </select>
                  {errors.programaFormativo && <span className="invalid-feedback">{errors.programaFormativo}</span>}
               </div>
            <div className="flex justify-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" className="btn btn-success bg-success" onClick={handleSubmit} data-dismiss="modal">Actualizar</button>
            </div>
         </form>
      </Fragment>)
}

export {
   CreatePC,
   UpdatePC
}