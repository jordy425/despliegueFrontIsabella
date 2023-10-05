import React, { Fragment, useState, useEffect } from "react";
import { create, get, update } from "../../../../../config/Api/api";
import Swal from "sweetalert2";
import DataTable from "../../../../../components/Datatable/Datatable";
const CreateProgramaFormativo = ({ others }) => {
   const [formData, setFormData] = useState({
      nombrePF: "",
      codigoPF: "",
      trimestres: "",
      abreviaturaPF: "",
   });

   const [errors, setErrors] = useState({
      nombrePF: "",
      codigoPF: "",
      trimestres: "",
      abreviaturaPF: "",
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

      if (name === "codigoPF") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese un número válido ";
         } else {
            const programasFormativos = await get("programas-formativos");
            if (programasFormativos.some((pf) => pf.codigoPF === value)) {
               newErrors[name] = "El código ya está en uso";
            }
         }
      }

      // if (name === "nombrePF") {
      //    const nombres = await get("programas-formativos");
      //    if (nombres.some((nom) => nom.nombrePF === value)) {
      //       newErrors[name] = "El nombre ya existe ";
      //    }
      // }

      // if (name === "abreviaturaPF") {
      //    const nombres = await get("programas-formativos");
      //    if (nombres.some((nom) => nom.abreviaturaPF === value)) {
      //       newErrors[name] = "La abreviatura ya existe ";
      //    }
      // }

      if (name === "trimestres") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese solo números";
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
            const data = await create("programas-formativos", formData);
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Registro exitoso",
               showConfirmButton: false,
               timer: 1500,
            });
            cancelForm();
            others.reloadData();
            window.location.href = "/gestion";
         } catch (error) {
            console.log(error);
         }
      }
   };

   const cancelForm = () => {
      setFormData({
         nombrePF: "",
         codigoPF: "",
         trimestres: "",
         abreviaturaPF: ""
      });
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-2">
            <div className="flex-row justify-between">
               <div className="flex justify-between">
                  <div className="form-group col-md-4">
                     <label htmlFor="codigoPF">
                        Código Programa: <span style={{ color: "red" }}>*</span>
                     </label>
                     <input
                        value={formData.codigoPF}
                        onChange={handleChange}
                        name="codigoPF"
                        type="number"
                        className={`form-control ${errors.codigoPF ? "is-invalid" : ""}`}
                        id="codigoPF"
                        required
                     />
                     {errors.codigoPF && (
                        <span className="invalid-feedback">{errors.codigoPF}</span>
                     )}
                  </div>
                  <div className="form-group col-md-6 ">
                     <label htmlFor="nombrePF">
                        Nombre Programa: <span style={{ color: "red" }}>*</span>
                     </label>
                     <input
                        value={formData.nombrePF}
                        onChange={handleChange}
                        name="nombrePF"
                        type="text"
                        className={`form-control ${errors.nombrePF ? "is-invalid" : ""}`}
                        id="nombrePF"
                        required
                     />
                     {errors.nombrePF && (
                        <span className="invalid-feedback">{errors.nombrePF}</span>
                     )}
                  </div>
               </div>
               <div className="flex justify-between">
                  <div className="form-group col-md-4">
                     <label htmlFor="trimestres">
                        Trimestres: <span style={{ color: "red" }}>*</span>
                     </label>
                     <input
                        value={formData.trimestres}
                        onChange={handleChange}
                        name="trimestres"
                        type="text"
                        className={`form-control ${errors.trimestres ? "is-invalid" : ""
                           }`}
                        id="trimestres"
                        required
                     />
                     {errors.trimestres && (
                        <span className="invalid-feedback">{errors.trimestres}</span>
                     )}
                  </div>
                  <div className="form-group col-md-6">
                     <label htmlFor="abreviaturaPF">
                        Abreviatura: <span style={{ color: "red" }}>*</span>
                     </label>
                     <input
                        value={formData.abreviaturaPF}
                        onChange={handleChange}
                        name="abreviaturaPF"
                        type="text"
                        className={`form-control ${errors.abreviaturaPF ? "is-invalid" : ""
                           }`}
                        id="abreviaturaPF"
                        required
                     />
                     {errors.abreviaturaPF && (
                        <span className="invalid-feedback">{errors.abreviaturaPF}</span>
                     )}
                  </div>
               </div>
            </div>


            <div className="flex justify-end">
               <button
                  type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}
               >
                  Cancelar
               </button>
               <button
                  type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">
                  Crear
               </button>
            </div>
         </form>
      </Fragment>
   );
};

const UpdateProgramaFormativo = ({ programaFormativo, others }) => {
   const [formData, setFormData] = useState({
      nombrePF: programaFormativo.nombrePF,
      codigoPF: programaFormativo.codigoPF,
      trimestres: programaFormativo.trimestres,
      abreviaturaPF: programaFormativo.abreviaturaPF
   });

   const [errors, setErrors] = useState({
      nombrePF: "",
      codigoPF: "",
      trimestres: "",
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

      if (name === "codigoPF") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese un número válido ";
         } else {
            const programasFormativos = await get("programas-formativos");

            if (programasFormativos.some((pf) => pf.codigoPF === value)) {
               newErrors[name] = "El código ya está en uso";
            }
         }
      }

      // if (name === "nombrePF") {
      //    const nombres = await get("programas-formativos");
      //    if (nombres.some((nom) => nom.nombrePF === value)) {
      //       newErrors[name] = "El nombre ya existe ";
      //    }
      // }

      if (name === "trimestres") {
         if (!/^\d+$/.test(value)) {
            newErrors[name] = "Ingrese solo números";
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
      }
      try {
         await update(
            `programas-formativos/${programaFormativo.idProgramaFormativo}`,
            formData
         );

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
         console.error(error);
      }
   };

   const cancelForm = () => {
      setFormData({
         nombrePF: programaFormativo.nombrePF,
         codigoPF: programaFormativo.codigoPF,
         trimestres: programaFormativo.trimestres,
         abreviaturaPF: programaFormativo.abreviaturaPF
      })
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="p-2">
            <div className="flex-row">
               <div className="flex justify-between">
                  <div className="form-group col-md-4">
                     <label htmlFor="codigoPF">Código Programa: </label>
                     <input
                        value={formData.codigoPF}
                        onChange={handleChange}
                        name="codigoPF"
                        type="number"
                        className={`form-control ${errors.codigoPF ? "is-invalid" : ""}`}
                        id="codigoPF"
                        required
                     />
                     {errors.codigoPF && (
                        <span className="invalid-feedback">{errors.codigoPF}</span>
                     )}
                  </div>
                  <div className="form-group col-md-6">
                     <label htmlFor="nombrePF">Nombre Programa:</label>
                     <input
                        value={formData.nombrePF}
                        onChange={handleChange}
                        name="nombrePF"
                        type="text"
                        className={`form-control ${errors.nombrePF ? "is-invalid" : ""}`}
                        id="nombrePF"
                        required
                     />
                     {errors.nombrePF && (
                        <span className="invalid-feedback">{errors.nombrePF}</span>
                     )}
                  </div>
               </div>
               <div className="flex justify-between">
                  <div className="form-group col-md-4">
                     <label htmlFor="trimestres">Trimestres:</label>
                     <input
                        value={formData.trimestres}
                        onChange={handleChange}
                        name="trimestres"
                        type="text"
                        className={`form-control ${errors.trimestres ? "is-invalid" : ""
                           }`}
                        id="trimestres"
                        required
                     />
                     {errors.trimestres && (
                        <span className="invalid-feedback">{errors.trimestres}</span>
                     )}
                  </div>
                  <div className="form-group col-md-6">
                     <label htmlFor="abreviaturaPF">
                        Abreviatura:
                     </label>
                     <input
                        value={formData.abreviaturaPF}
                        onChange={handleChange}
                        name="abreviaturaPF"
                        type="text"
                        className={`form-control ${errors.abreviaturaPF ? "is-invalid" : ""
                           }`}
                        id="abreviaturaPF"
                        required
                     />
                     {errors.abreviaturaPF && (
                        <span className="invalid-feedback">{errors.abreviaturaPF}</span>
                     )}
                  </div>
               </div>
            </div>
            <div className="flex justify-end">
               <button
                  type="button"
                  className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal"
                  onClick={cancelForm}
               >
                  Cancelar
               </button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">Actualizar</button>
            </div>
         </form>
      </Fragment>
   );
};

const ConsultarPF = ({ programa ,pf }) => {
   const [programas, setPrograma] = useState([])
   const getData = async() =>{
      try {
         const getP = await get(`programas-formativos`)
         setPrograma(getP)
         
      } catch (error) {
         console.log(error)
      }
   }


   useEffect(()=>{
      getData()
   },[])
  const headers  =[
   {title : "Código", prop : "codigoCompetencia"},
   {title : "Nombre Competencia", prop : "nombreCompetencia"},
   {title: "Nombre de NSCL", prop: "nombreNSCL"},
   {title : "Resultado de Aprendizaje", prop : "actions", cell: (row) => (
      <div>
         { 
            row.resultadosCompetencia.map((i)=>(
               i.nombreRA
            ))
         }
      </div>
   )},
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
                     <label htmlFor="documento">Código Programa:</label>
                     <p className="font-bold">{pf.codigoPF}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                     <label htmlFor="tipoDocumentopf">Trimestres:</label>
                     <p className="font-bold">{pf.trimestres}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                     <label htmlFor="rolpf">Abreviatura:</label>
                     <p className="font-bold">{pf.abreviaturaPF}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-10">
                  <div className="form-group">
                     <label htmlFor="nombre">Nombre Programa:</label>
                     <p className="font-bold">{pf.nombrePF}</p>
                  </div>
               </div>
            </div>
            <DataTable

            headers={headers}
            body = {programa }
            configTable={configTable}


            />
         </div>
      </Fragment>
   );
};

export { CreateProgramaFormativo, UpdateProgramaFormativo, ConsultarPF };
