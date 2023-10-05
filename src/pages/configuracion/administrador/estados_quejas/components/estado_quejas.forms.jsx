import React, { Fragment, useState } from "react";
import { create } from "../../../../../config/Api/api";

const CreateEstadoQueja = () => {
   const [formData, setFormData] = useState({
      nombreEstadoQuejas: ""
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
         const data = await create("estado-quejas", formData)
         console.log(data)
         window.location.reload()
      } catch (error) {
         console.log(error)
      }
   }

   const cancelForm = () => {
      setFormData({
         nombreEstadoQuejas: "",
      })
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label htmlFor="queja">Nombre Estado Queja:</label>
               <input value={formData.nombreEstadoQuejas} onChange={handleChange} name="nombreEstadoQuejas" type="text" className="form-control" id="queja" required />
            </div>
            <div className="col d-flex justify-content-end">
               <button type="button" className="sm-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" className="smc-success rounded p-2">Crear</button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdateEstadoQueja = () => {

}

export {
   CreateEstadoQueja,
   UpdateEstadoQueja
}