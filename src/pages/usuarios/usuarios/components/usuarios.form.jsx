import React, { useState, Fragment, useEffect } from "react";
import { create, get, update } from "../../../../config/Api/api";
import Swal from "sweetalert2";

const CreateUsuario = ({ claves, others }) => {
   const [formData, setFormData] = useState({
      tipoDocumentoUsuario: "",
      documento: "",
      rolUsuario: "",
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
   });

   const [errors, setErrors] = useState({
      tipoDocumentoUsuario: false,
      documento: false,
      rolUsuario: false,
      nombre: false,
      apellidos: false,
      email: false,
      telefono: false,
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

      if (name === "documento") {
         if (!/^\d{7,13}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-13 dígitos)";
         } else {
            const usuarios = await get("usuarios");



            console.log(usuarios);



            if (usuarios.some(usuario => usuario.documento == value)) {
               newErrors[name] = "El documento ya está registrado";
            }
         }
      }

      if (name === "nombre" || name === "apellidos") {
         if (/^\d+$/.test(value)) {
            newErrors[name] = "No se permiten números";
         }
      }

      if (name === "email") {
         if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors[name] = "Ingrese un correo válido";
         } else {
            const emails = await get("usuarios");
            if (emails.some(usuario => usuario.email == value)) {
               newErrors[name] = "El correo ya está registrado";
            }
         }
      }

      if (name === "telefono") {
         if (!/^\d{7,10}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-10 dígitos)";
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
            const data = await create("usuarios", formData);
            await Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Registro exitoso',
               showConfirmButton: false,
               timer: 1500
            })

            cancelForm();
            others.reloadData();

            console.log(data);
            //window.location.reload();
         } catch (error) {
            console.log(error);
         }

      }

   };

   const cancelForm = () => {
      setFormData({
         tipoDocumentoUsuario: "",
         documento: "",
         rolUsuario: "",
         nombre: "",
         apellidos: "",
         email: "",
         telefono: "",
      })
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div className="form-row">

            <div className="form-group col-md-4">
                  <label htmlFor="tipoDocumentoUsuario">
                     Tipo Documento: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                     value={formData.tipoDocumentoUsuario}
                     onChange={handleChange}
                     name="tipoDocumentoUsuario"
                     id="tipoDocumentoUsuario"
                     className={`form-control ${errors.tipoDocumentoUsuario ? "is-invalid" : ""}`}
                     required
                  >
                     <option value="">Seleccionar</option>
                     {claves.tipoDoc.map((i) => (
                        <option key={i.idTipoDocumento} value={i.idTipoDocumento}>
                           {i.nombreTipoDocumento}
                        </option>
                     ))}
                  </select>
                  {errors.tipoDocumentoUsuario && <span className="invalid-feedback">{errors.tipoDocumentoUsuario}</span>}
               </div>

               <div className="form-group col-md-4">
                  <label htmlFor="documento">
                     Documento: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.documento}
                     onChange={handleChange}
                     name="documento"
                     type="number"
                     className={`form-control ${errors.documento ? "is-invalid" : ""}`}
                     id="documento"
                     required
                  />
                  {errors.documento && <span className="invalid-feedback">{errors.documento}</span>}
               </div>

               

               <div className="form-group col-md-4">
                  <label htmlFor="rolUsuario">
                     Rol: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                     value={formData.rolUsuario}
                     onChange={handleChange}
                     name="rolUsuario"
                     id="rolUsuario"
                     className={`form-control ${errors.rolUsuario ? "is-invalid" : ""}`}
                     required
                  >
                     <option value="">Seleccionar rol</option>
                     {claves.rol.map((i) => (
                        <option key={i.idRol} value={i.idRol}>
                           {i.nombreRol}
                        </option>
                     ))}
                  </select>
                  {errors.rolUsuario && <span className="invalid-feedback">{errors.rolUsuario}</span>}
               </div>
            </div>
            <div className="form-row">
               <div className="form-group col-md-6">
                  <label htmlFor="nombre">
                     Nombre: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.nombre}
                     onChange={handleChange}
                     name="nombre"
                     type="text"
                     className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                     id="nombre"
                     required
                  />
                  {errors.nombre && <span className="invalid-feedback">{errors.nombre}</span>}
               </div>
               <div className="form-group col-md-6">
                  <label htmlFor="apellidos">
                     Apellidos: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.apellidos}
                     onChange={handleChange}
                     name="apellidos"
                     type="text"
                     className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                     id="apellidos"
                     required
                  />
                  {errors.apellidos && <span className="invalid-feedback">{errors.apellidos}</span>}
               </div>
            </div>
            <div className="form-row">
               <div className="form-group col-md-6">
                  <label htmlFor="telefono">
                     Teléfono: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.telefono}
                     onChange={handleChange}
                     name="telefono"
                     type="number"
                     className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                     id="telefono"
                     required
                  />
                  {errors.telefono && <span className="invalid-feedback">{errors.telefono}</span>}
               </div>
               <div className="form-group col-md-6">
                  <label htmlFor="email">
                     Correo: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                     value={formData.email}
                     onChange={handleChange}
                     name="email"
                     type="text"
                     className={`form-control ${errors.email ? "is-invalid" : ""}`}
                     id="email"
                     required
                  />
                  {errors.email && <span className="invalid-feedback">{errors.email}</span>}
               </div>
            </div>
            <div className="col d-flex justify-content-end">
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
   );
};

const UpdateUsuario = ({ usuario, claves, others }) => {
   const [formData, setFormData] = useState({
      documento: usuario.documento,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      telefono: usuario.telefono,
      rolUsuario: usuario.rolUsuario.idRol,
      tipoDocumentoUsuario: usuario.tipoDocumentoUsuario.idTipoDocumento,
   });

   const [errors, setErrors] = useState({
      documento: "",
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      tipoDocumentoUsuario: "",
      rolUsuario: ""
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

      if (name === "documento") {
         if (!/^\d{7,13}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-13 dígitos)";
         } else {
            const usuarios = await get("usuarios");

            if (usuarios.some(usuario => usuario.documento == value)) {
               newErrors[name] = "El documento ya está registrado";
            }
         }
      }

      if (name === "nombre" || name === "apellidos") {
         if (/^\d+$/.test(value)) {
            newErrors[name] = "No se permiten números";
         }
      }

      if (name === "email") {
         if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors[name] = "Ingrese un correo válido";
         } else {
            const emails = await get("usuarios");
            if (emails.some(usuario => usuario.email == value)) {
               newErrors[name] = "El correo ya está registrado";
            }
         }
      }

      if (name === "telefono") {
         if (!/^\d{7,10}$/.test(value)) {
            newErrors[name] = "Ingrese un número válido (7-10 dígitos)";
         }
      }

      setErrors(newErrors);
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      let newErrors = { ...errors };

      // Validaciones
      if (formData.documento.trim() === "") {
         newErrors.documento = "Campo requerido";
      } else if (!/^\d{7,13}$/.test(formData.documento)) {
         newErrors.documento = "Ingrese un número válido (7-13 dígitos)";
      } else {
         // Realiza la validación de documento si es necesario
      }

      if (formData.nombre.trim() === "") {
         newErrors.nombre = "Campo requerido";
      } else if (/^\d+$/.test(formData.nombre)) {
         newErrors.nombre = "No se permiten números";
      }

      // Agrega más validaciones aquí para los otros campos

      setErrors(newErrors);

      // Si hay errores, detener la actualización
      if (Object.values(newErrors).some((error) => error)) {
         console.log("Existen errores en el formulario.");
         return;
      }

      // Si no hay errores, realizar la actualización
      try {
         const data = await update(`usuarios/${usuario.idUsuario}`, formData);
         console.log(data);
         await Swal.fire({
            position: "center",
            icon: "success",
            title: "Actualización exitosa",
            showConfirmButton: false,
            timer: 1500,
         });
         others.reloadData();
         //window.location.reload();
      } catch (error) {
         console.log(error);
      }

   };


   const cancelForm = () => {
      setFormData({
         documento: usuario.documento,
         nombre: usuario.nombre,
         apellidos: usuario.apellidos,
         email: usuario.email,
         telefono: usuario.telefono,
         rolUsuario: usuario.rolUsuario.idRol,
         tipoDocumentoUsuario: usuario.tipoDocumentoUsuario.idTipoDocumento,
      });

      setErrors({
         documento: "",
         nombre: "",
         apellidos: "",
         email: "",
         telefono: "",
         tipoDocumentoUsuario: "",
         rolUsuario: "",
      });
   };


   return (
      <Fragment>
         <div className="modal-body">
            <form onSubmit={handleSubmit}>
               <div className="row">
                                    <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="tipoDocumentoUsuario">Tipo Documento:</label>
                        <select
                           value={formData.tipoDocumentoUsuario}
                           onChange={handleChange}
                           name="tipoDocumentoUsuario"
                           id="tipoDocumentoUsuario"
                           className={`form-control ${errors.tipoDocumentoUsuario ? "is-invalid" : ""}`}
                           required
                        >
                           <option value="">Seleccionar</option>
                           {claves.tipoDoc.map((i) => (
                              <option key={i.idTipoDocumento} value={i.idTipoDocumento}>
                                 {i.nombreTipoDocumento}
                              </option>
                           ))}
                        </select>
                        {errors.tipoDocumentoUsuario && <span className="invalid-feedback">{errors.tipoDocumentoUsuario}</span>}
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="documento">Documento:</label>
                        <input
                           value={formData.documento}
                           onChange={handleChange}
                           name="documento"
                           type="number"
                           className={`form-control ${errors.documento ? "is-invalid" : ""}`}
                           id="documento"
                           required
                        />
                        {errors.documento && <span className="invalid-feedback">{errors.documento}</span>}
                     </div>
                  </div>

                  <div className="col-md-4">
                     <div className="form-group">
                        <label htmlFor="rolUsuario">Rol:</label>
                        <select
                           value={formData.rolUsuario}
                           onChange={handleChange}
                           name="rolUsuario"
                           id="rolUsuario"
                           className={`form-control ${errors.rolUsuario ? "is-invalid" : ""}`}
                           required
                        >
                           <option>Seleccionar rol</option>
                           {claves.rol.map((i) => (
                              <option key={i.idRol} value={i.idRol}>
                                 {i.nombreRol}
                              </option>
                           ))}
                        </select>
                        {errors.rolUsuario && <span className="invalid-feedback">{errors.rolUsuario}</span>}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                           value={formData.nombre}
                           onChange={handleChange}
                           name="nombre"
                           type="text"
                           className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                           id="nombre"
                           required
                        />
                        {errors.nombre && <span className="invalid-feedback">{errors.nombre}</span>}
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                           value={formData.apellidos}
                           onChange={handleChange}
                           name="apellidos"
                           type="text"
                           className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                           id="apellidos"
                           required
                        />
                        {errors.apellidos && <span className="invalid-feedback">{errors.apellidos}</span>}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="email">Correo:</label>
                        <input
                           value={formData.email}
                           onChange={handleChange}
                           name="email"
                           type="text"
                           className={`form-control ${errors.email ? "is-invalid" : ""}`}
                           id="email"
                           required
                        />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                           value={formData.telefono}
                           onChange={handleChange}
                           name="telefono"
                           type="number"
                           className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                           id="telefono"
                           required
                        />
                        {errors.telefono && <span className="invalid-feedback">{errors.telefono}</span>}
                     </div>
                  </div>
               </div>
               <div className="col d-flex justify-content-end">
                  <button type="button" className="s-button-cancel rounded p-2 mr-2" onClick={cancelForm} data-dismiss="modal">Cancelar</button>
                  <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">Actualizar</button>
               </div>
            </form>
         </div>
      </Fragment>
   );
};

const ConsultarUsuarios = ({ usuario }) => {
   return (
      <Fragment>
         <div className="container">
            <div className="row">
               <div className="col-md-4">
                  <div className="form-group">
                     <label htmlFor="documento">Documento:</label>
                     <p className="font-bold">{usuario.documento}</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="form-group">
                     <label htmlFor="tipoDocumentoUsuario">Tipo de Documento:</label>
                     <p className="font-bold">{usuario.tipoDocumentoUsuario.nombreTipoDocumento}</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="form-group">
                     <label htmlFor="rolUsuario">Rol:</label>
                     <p className="font-bold">{usuario.rolUsuario.nombreRol}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label htmlFor="nombre">Nombre:</label>
                     <p className="font-bold">{usuario.nombre}</p>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label htmlFor="apellidos">Apellidos:</label>
                     <p className="font-bold">{usuario.apellidos}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label htmlFor="email">Correo Electrónico:</label>
                     <p className="font-bold">{usuario.email}</p>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label htmlFor="telefono">Teléfono:</label>
                     <p className="font-bold">{usuario.telefono}</p>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};




export {
   CreateUsuario,
   UpdateUsuario,
   ConsultarUsuarios
}