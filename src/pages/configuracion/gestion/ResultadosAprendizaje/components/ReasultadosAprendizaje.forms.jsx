import React, { Fragment, useState } from "react";
import { create, get, update } from "../../../../../config/Api/api";
import Swal from "sweetalert2";

const CreateResultado = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      nombreRA: "",
      codigoRA: "",
      competenciaResultado: ""
   });

   const [errors, setErrors] = useState({
      nombreRA: false,
      codigoRA: false,
      competenciaResultado: false
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

      if (name === "codigoRA") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese un número válido ";
         } else {
            const resultado = await get("resultado-aprendizaje");
            if (resultado.some(resultado => resultado.codigoRA === value)) {
               newErrors[name] = "El código ya está en uso";
            }
         }
      }

      if (name === "nombreRA") {
         const nombres = await get("resultado-aprendizaje");
         if (nombres.some(nom => nom.nombreRA === value)) {
            newErrors[name] = "El nombre ya existe ";
         }
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
            const data = await create("resultado-aprendizaje", formData);
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Registro exitoso",
               showConfirmButton: false,
               timer: 1500,
            });
            cancelForm();
            others.reloadData();
            // window.location.href = "/gestion"
         } catch (error) {
            console.log(error);
         }
      }
   };


   const cancelForm = () => {
      setFormData({
         nombreRA: "",
         codigoRA: "",
         competenciaResultado: ""
      })
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-2">
            <div className="form-group col-md-6">
               <label htmlFor="codigoRA">Código Resultado Aprendizaje: <span style={{ color: "red" }}>*</span>
               </label>
               <input
                  value={formData.codigoRA}
                  onChange={handleChange}
                  name="codigoRA"
                  type="number"
                  className={`form-control ${errors.codigoRA ? "is-invalid" : ""}`}
                  id="codigoRA"
                  required
               />
               {errors.codigoRA && <span className="invalid-feedback">{errors.codigoRA}</span>}
            </div>

            <div className="form-group col-md-12">
               <label htmlFor="nombreRA">
                  Nombre Resultado Aprendizaje: <span style={{ color: "red" }}>*</span>
               </label>
               <input
                  value={formData.nombreRA}
                  onChange={handleChange}
                  name="nombreRA"
                  type="text"
                  className={`form-control ${errors.nombreRA ? "is-invalid" : ""}`}
                  id="nombreRA"
                  required
               />
               {errors.nombreRA && <span className="invalid-feedback">{errors.nombreRA}</span>}
            </div>
            <div className="form-group col-md-12">
               <label htmlFor="competenciaResultado">Competencia: <span style={{ color: "red" }}>*</span></label>
               <select
                  value={formData.competenciaResultado}
                  onChange={handleChange}
                  name="competenciaResultado"
                  id="competenciaResultado"
                  className={`form-control ${errors.competenciaResultado ? "is-invalid" : ""}`}
                  required
               >
                  <option value="">-- --</option>
                  {claves.competencias.map((i) => (
                     <option key={i.idCompetencia} value={i.idCompetencia}>
                        {i.nombreCompetencia}
                     </option>
                  ))}
               </select>
               {errors.competenciaResultado && <span className="invalid-feedback">{errors.competenciaResultado}</span>}
            </div>
            <div className="flex justify-end">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm} >
                  Cancelar
               </button>
               <button
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">
                  Crear
               </button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdateRA = ({ resultado, claves, others }) => {
   const [formData, setFormData] = useState({
      codigoRA: resultado.codigoRA,
      nombreRA: resultado.nombreRA,
      competenciaResultado: resultado.competenciaResultado.idCompetencia
   });

   const [errors, setErrors] = useState({
      codigoRA: false,
      nombreRA: false,
      competenciaResultado: false
   });

   const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      });

      let newErrors = { ...errors };

      if (value.trim() === "") {
         newErrors[name] = "Campo requerido";
      } else {
         newErrors[name] = false;
      }

      if (name === "codigoRA") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese un número válido";
         }
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
            const data = await update(`resultado-aprendizaje/${resultado.idResultadoAprendizaje}`, formData);
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Actualización exitosa",
               showConfirmButton: false,
               timer: 1500,
            });
            others.reloadData();
            window.location.href = "/gestion"
         } catch (error) {
            console.log(error);
         }
      }
   };

   const cancelForm = () => {
      setFormData({
         codigoRA: resultado.codigoRA,
         nombreRA: resultado.nombreRA,
         competenciaResultado: resultado.competenciaResultado.idCompetencia
      })
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-2">
            <div className="form-group col-md-6">
               <label htmlFor="codigoRA">Código Resultado Aprendizaje: </label>
               <input
                  value={formData.codigoRA}
                  onChange={handleChange}
                  name="codigoRA"
                  type="number"
                  className={`form-control ${errors.codigoRA ? "is-invalid" : ""}`}
                  id="codigoRA"
                  required
               />
               {errors.codigoRA && <span className="invalid-feedback">{errors.codigoRA}</span>}
            </div>
            <div className="form-group col-md-12">
               <label htmlFor="nombreRA">Nombre Resultado Aprendizaje: </label>
               <input
                  value={formData.nombreRA}
                  onChange={handleChange}
                  name="nombreRA"
                  type="text"
                  className={`form-control ${errors.nombreRA ? "is-invalid" : ""}`}
                  id="nombreRA"
                  required
               />
               {errors.nombreRA && <span className="invalid-feedback">{errors.nombreRA}</span>}
            </div>
            <div className="form-group col-md-12">
               <label htmlFor="competenciaResultado">Competencia: </label>
               <select
                  value={formData.competenciaResultado}
                  onChange={handleChange}
                  name="competenciaResultado"
                  id="competenciaResultado"
                  className={`form-control ${errors.competenciaResultado ? "is-invalid" : ""}`}
                  required
               >
                  <option value={resultado.competenciaResultado.idCompetencia}>-- {resultado.competenciaResultado.nombreCompetencia} --</option>
                  {claves.competencia.map((programa) => (
                     <option key={programa.idCompetencia} value={programa.idCompetencia}>
                        {programa.nombreCompetencia}
                     </option>
                  ))}
               </select>
               {errors.competenciaResultado && <span className="invalid-feedback">{errors.competenciaResultado}</span>}
            </div>
            <div className="flex justify-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm} >
                  Cancelar
               </button>
               <button
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="smc-success rounded p-2">
                  Actualizar
               </button>
            </div>
         </form>
      </Fragment>
   );
}


const ConsultarRA = ({ resultado }) => {
   return (
      <Fragment>
         <div className="container">
            <div className="row">
               <div className="col-md-5">
                  <div className="form-group">
                     <label htmlFor="documento">Código Resultado Aprendizaje:</label>
                     <p className="font-bold">{resultado.codigoRA}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombreRA">Nombre Resultado Aprendizaje:</label>
                     <p className="font-bold">{resultado.nombreRA}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombre">Competencia:</label>
                     <p className="font-bold">{resultado.competenciaResultado.nombreCompetencia}</p>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );



}

export {
   CreateResultado,
   UpdateRA,
   ConsultarRA
}