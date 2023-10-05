
import React, { Fragment, useEffect, useState } from "react";
import { create, get, update } from "../../../../../config/Api/api";
import Swal from "sweetalert2";
import DataTable from "../../../../../components/Datatable/Datatable";

const CreateCompetencia = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      nombreCompetencia: "",
      nombreNSCL: "",
      codigoCompetencia: "",
      programasCompetencia: ""
   });

   const [errors, setErrors] = useState({
      nombreCompetencia: false,
      codigoCompetencia: false,
      nombreNSCL: false,
      programasCompetencia: false
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

      if (name === "codigoCompetencia") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese un número válido ";
         } else {
            const competencias = await get("competencias");
            if (competencias.some(compe => compe.codigoCompetencia === value)) {
               newErrors[name] = "El código ya está en uso";
            }
         }
      }

      // if (name === "nombreCompetencia") {
      //    const nombres = await get("competencias");
      //    if (nombres.some(nom => nom.nombreCompetencia === value)) {
      //       newErrors[name] = "El nombre ya existe ";
      //    }
      // }

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
            const data = await create("competencias", formData);
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Registro exitoso",
               showConfirmButton: false,
               timer: 1500,
            });
            cancelForm();
            others.reloadData();
            window.location.href = "/gestion"
         } catch (error) {
            console.log(error);
         }
      }
   };

   const cancelForm = () => {
      setFormData({
         nombreCompetencia: "",
         codigoCompetencia: "",
         nombreNSCL:"",
         programasCompetencia: ""
      })
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6">
               <label htmlFor="codigoCompetencia">Código Competencia: <span style={{ color: "red" }}>*</span>
               </label>
               <input
                  value={formData.codigoCompetencia}
                  onChange={handleChange}
                  name="codigoCompetencia"
                  type="number"
                  className={`form-control ${errors.codigoCompetencia ? "is-invalid" : ""}`}
                  id="codigoCompetencia"
                  required
               />
               {errors.codigoCompetencia && <span className="invalid-feedback">{errors.codigoCompetencia}</span>}
            </div>

            <div className="form-group col-md-9">
               <label htmlFor="nombreCompetencia">
                  Nombre Competencia: <span style={{ color: "red" }}>*</span>
               </label>
               <input
                  value={formData.nombreCompetencia}
                  onChange={handleChange}
                  name="nombreCompetencia"
                  type="text"
                  className={`form-control ${errors.nombreCompetencia ? "is-invalid" : ""}`}
                  id="nombreCompetencia"
                  required
               />
               {errors.nombreCompetencia && <span className="invalid-feedback">{errors.nombreCompetencia}</span>}
            </div>
            <div className="form-group col-md-9">
               <label htmlFor="nombreNSCL">
                  Nombre de NCSL: <span style={{ color: "red" }}>*</span>
               </label>
               <input
                  value={formData.nombreNSCL}
                  onChange={handleChange}
                  name="nombreNSCL"
                  type="text"
                  className={`form-control ${errors.nombreNSCL ? "is-invalid" : ""}`}
                  id="nombreNSCL"
                  required
               />
               {errors.nombreNSCL && <span className="invalid-feedback">{errors.nombreNSCL}</span>}
            </div>
            <div className="form-group col-md-9">
               <label htmlFor="programasCompetencia">Programa formativo: <span style={{ color: "red" }}>*</span></label>
               <select
                  value={formData.programasCompetencia}
                  onChange={handleChange}
                  name="programasCompetencia"
                  id="programasCompetencia"
                  className={`form-control ${errors.programasCompetencia ? "is-invalid" : ""}`}
                  required
               >
                  <option value="">-- --</option>
                  {claves.programaFormativo.map((i) => (
                     <option key={i.idProgramaFormativo} value={i.idProgramaFormativo}>
                        {i.nombrePF}
                     </option>
                  ))}
               </select>
               {errors.programasCompetencia && <span className="invalid-feedback">{errors.programasCompetencia}</span>}
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

const UpdateCompetencia = ({ competencia, claves, others }) => {
   const [formData, setFormData] = useState({
      codigoCompetencia: competencia.codigoCompetencia,
      nombreNSCL: competencia.nombreNSCL,
      nombreCompetencia: competencia.nombreCompetencia,
      programasCompetencia: competencia.programasCompetencia.idProgramaFormativo
   });

   const [errors, setErrors] = useState({
      codigoCompetencia: false,
      nombreCompetencia: false,
      nombreNSCL: false,
      programasCompetencia: false
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

      if (name === "codigoCompetencia") {
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
            const data = await update(`competencias/${competencia.idCompetencia}`, formData);
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
         codigoCompetencia: competencia.codigoCompetencia,
         nombreCompetencia: competencia.nombreCompetencia,
         nombreNSCL: competencia.nombreNSCL,
         programasCompetencia: competencia.programasCompetencia.idProgramaFormativo
      })
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-2">
            <div className="form-group col-md-6">
               <label htmlFor="codigoCompetencia">Código Competencia: </label>
               <input
                  value={formData.codigoCompetencia}
                  onChange={handleChange}
                  name="codigoCompetencia"
                  type="number"
                  className={`form-control ${errors.codigoCompetencia ? "is-invalid" : ""}`}
                  id="codigoCompetencia"
                  required
               />
               {errors.codigoCompetencia && <span className="invalid-feedback">{errors.codigoCompetencia}</span>}
            </div>
            <div className="form-group col-md-10">
               <label htmlFor="nombreCompetencia">Nombre Competencia: </label>
               <input
                  value={formData.nombreCompetencia}
                  onChange={handleChange}
                  name="nombreCompetencia"
                  type="text"
                  className={`form-control ${errors.nombreCompetencia ? "is-invalid" : ""}`}
                  id="nombreCompetencia"
                  required
               />
               {errors.nombreCompetencia && <span className="invalid-feedback">{errors.nombreCompetencia}</span>}
            </div>
            <div className="form-group col-md-12">
               <label htmlFor="nombreNSCL">Nombre de NSCL: </label>
               <input
                  value={formData.nombreNSCL}
                  onChange={handleChange}
                  name="nombreNSCL"
                  type="text"
                  className={`form-control ${errors.nombreNSCL ? "is-invalid" : ""}`}
                  id="nombreNSCL"
                  required
               />
               {errors.nombreNSCL && <span className="invalid-feedback">{errors.nombreNSCL}</span>}
            </div>
            <div className="form-group col-md-12">
               <label htmlFor="programasCompetencia">Programa Formativo: </label>
               <select
                  value={formData.programasCompetencia}
                  onChange={handleChange}
                  name="programasCompetencia"
                  id="programasCompetencia"
                  className={`form-control ${errors.programasCompetencia ? "is-invalid" : ""}`}
                  required
               >
                  <option value={`${competencia.programasCompetencia.idProgramaFormativo}`}>-- {competencia.programasCompetencia.nombrePF} --</option>
                  {claves.programaFormativo.map((programa) => (
                     <option key={programa.idProgramaFormativo} value={programa.idProgramaFormativo}>
                        {programa.nombrePF}
                     </option>
                  ))}
               </select>
               {errors.programasCompetencia && <span className="invalid-feedback">{errors.programasCompetencia}</span>}
            </div>
            <div className="flex justify-end">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm} >
                  Cancelar
               </button>
               <button
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">
                  Actualizar
               </button>
            </div>
         </form>
      </Fragment>
   );


}

const ConsultarCompetencia = ({ competencia, compeR }) => {
   const [pcompesR, setCompeR] = useState([])
   const getData = async() =>{
      try {
         const getC = await get(`competencias`)
         setCompeR(getC)
         
      } catch (error) {
         console.log(error)
      }
   }


   useEffect(()=>{
      getData()
   },[])
  const headers  =[
   {title : "Código", prop : "codigoRA"},
   {title : "Resultado de Aprendizaje", prop : "nombreRA"},

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
   return (
      <Fragment>
         <div className="container">
            <div className="row">
               <div className="col-md-5">
                  <div className="form-group">
                     <label htmlFor="documento">Código Competencia:</label>
                     <p className="font-bold">{competencia.codigoCompetencia}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombreCompetencia">Nombre Competencia:</label>
                     <p className="font-bold">{competencia.nombreCompetencia}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombreNSCL">Nombre de NSCL:</label>
                     <p className="font-bold">{competencia.nombreNSCL}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombreCompetencia">Programa Formativo:</label>
                     <p className="font-bold">{competencia.programasCompetencia.nombrePF}</p>
                  </div>
               </div>
            </div>
            <DataTable

            headers={headers}
            body = {compeR }
            configTable={configTable}
            />
         </div>
      </Fragment>
   );

}

export {
   CreateCompetencia,
   UpdateCompetencia,
   ConsultarCompetencia
}