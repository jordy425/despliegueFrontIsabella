import React, { Fragment, useState } from "react";
import { create, get, update } from "../../../../config/Api/api";

const CreateRol = () => {
  const [formData, setFormData] = useState({
    nombreRol: ""
  });

  const [errors, setErrors] = useState({
    nombreRol: ""
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
      newErrors[name] = "";
    }

    if (name === "nombreRol") {
      const roles = await get("roles");
      if (roles.some((rol) => rol.nombre  === value)) {
        newErrors[name] = "El nombre del rol ya existe";
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
        const data = await create("roles", formData);
        console.log(data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelForm = () => {
    setFormData({
      nombreRol: ""
    });
    setErrors({
      nombreRol: ""
    });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreRol">
            Rol: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={formData.nombreRol}
            onChange={handleChange}
            name="nombreRol"
            type="text"
            className={`form-control ${errors.nombreRol ? "is-invalid" : ""}`}
            id="nombreRol"
            required
          />
          {errors.nombreRol && (
            <span className="invalid-feedback">{errors.nombreRol}</span>
          )}
        </div>
        <div className="col d-flex justify-content-end">
          <button
            type="button"
            className="sm-cancel rounded p-2 mr-2"
            data-dismiss="modal"
            onClick={cancelForm}
          >
            Cancelar
          </button>
          <button type="submit" className="smc-success rounded p-2">
            Crear
          </button>
        </div>
      </form>
    </Fragment>
  );
};

const UpdateRol = ({roles}) => {
   const [formData, setFormData] = useState({
      nombreRol : roles.nombre
   });

   const [errors, setErrors] = useState({
      nombreRol: ""
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
        newErrors[name] = "";
      }
  
      if (name === "nombreRol") {
        const roles = await get("roles");
        if (roles.some((rol) => rol.nombreRol === value)) {
          newErrors[name] = "El nombre del rol ya existe";
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
            const data = await update(`roles/${roles.idRol}`, formData);
            console.log(data);
            window.location.reload();
         } catch (error) {
            console.error(error);
         
      }
   };

   const cancelForm = () => {
      setFormData({
         nombreRol: roles.nombreRol
      });
   };

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
         <div className="form-group">
          <label htmlFor="nombreRol">
            Rol: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={formData.nombreRol}
            onChange={handleChange}
            name="nombreRol"
            type="text"
            className={`form-control ${errors.nombreRol ? "is-invalid" : ""}`}
            id="nombreRol"
            required
          />
          {errors.nombreRol && (
            <span className="invalid-feedback">{errors.nombreRol}</span>
          )}
        </div>
        <div className="col d-flex justify-content-end">
          <button
            type="button"
            className="sm-cancel rounded p-2 mr-2"
            data-dismiss="modal"
            onClick={cancelForm}
          >
            Cancelar
          </button>
          <button type="submit" className="smc-success rounded p-2">
            Crear
          </button>
        </div>
         </form>
      </Fragment>
   );
};

export { CreateRol, UpdateRol };
