import React, { Fragment, useState } from "react";
import { create } from "../../../../../config/Api/api";

const CreateEstado = () => {
   const [formData, setFormData] = useState({
      nombreEstadoDecision: ""
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const data = await create("estado-decision", formData)
         console.log(data)
         window.location.reload()
      } catch (error) {
         console.error(error)
      }
   }

   const cancelForm = () => {
      setFormData({
         nombreEstadoDecision: "",
      })
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label htmlFor="estado">Nombre Decisión:</label>
               <input value={formData.nombreEstadoDecision} onChange={handleChange} name="nombreEstadoDecision" type="text" className="form-control" id="estado" required />
            </div>
            <div className="col d-flex justify-content-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" className="smc-success rounded p-2">Crear</button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdateEstado = () => {

}

export {
   CreateEstado,
   UpdateEstado
}