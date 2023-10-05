import React, { Fragment, useState } from "react";
import { create, update } from "../../../../../config/Api/api";
import Swal from "sweetalert2";
import { BsInfoCircleFill } from "react-icons/bs";

const CreateDecisionComite = ({ reloadData }) => {
   const [formData, setFormData] = useState({
      nombreDecision: ""
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }
   const cancelForm = () => {
      setFormData({
         nombreDecision: "",
      })
   }

   const handleSubmit = async () => {
      try {
         await create("decision-comite", formData)
            .then(async (res) => {
               if (res.status === 400) {
                  return await Swal.fire({
                     position: "center",
                     icon: "error",
                     title: "ERROR",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 15000,
                  })
               } else {
                  await Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "Completado",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 15000,
                  })
                  cancelForm()
               }
               if (reloadData) {
                  await reloadData();
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   const infoTooltip = `Recuerda que:\n1. No se debe repetir nombre.\n2. Aquellas que incluyan "Plan de Mejoramiento" crean planes.\n3. Aquellas que incluyan "Cancelación" desactivan el acceso al aprendiz.`

   return (
      <Fragment>
         <form method="POST" className="p-1">
            <div className="form-group">
               <label className="flex items-center justify-between" htmlFor="decision">Nombre Decisión: <BsInfoCircleFill data-toggle="popover" data-placement="top" title={infoTooltip} className="cursor-pointer" /></label>
               <input value={formData.nombreDecision} onChange={handleChange} name="nombreDecision" type="text" className="form-control" id="decision" required />
            </div>
            <div className="flex justify-end">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">Crear</button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdateDecisionComite = ({ decisionInfo, reloadData }) => {
   // eslint-disable-next-line
   const [decision, setDecision] = useState(decisionInfo)
   const [formData, setFormData] = useState({
      nombreDecision: decision.nombreDecision,
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const cancelForm = () => {
      setFormData({
         nombreDecision: decision.nombreDecision,
      })
   }
   const handleSubmit = async () => {
      try {
         await update(`decision-comite/${decision.idDecision}`, formData)
            .then(async (res) => {
               if (res.status === 400) {
                  return await Swal.fire({
                     position: "center",
                     icon: "error",
                     title: "ERROR",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 15000,
                  })
               } else {
                  await Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "Completado",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 15000,
                  })
               }
               if (reloadData) {
                  await reloadData();
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   const infoTooltip = `Recuerda que:\n1. No se debe repetir nombre.\n2. Aquellas que incluyan "Plan de Mejoramiento" crean planes.\n3. Aquellas que incluyan "Cancelación" desactivan el acceso al aprendiz.`

   return (
      <Fragment>
         <form method="POST" className="p-1">
            <div className="form-group">
               <label className="flex items-center justify-between" htmlFor="decision">Nombre Decisión: <BsInfoCircleFill data-toggle="tooltip" data-placement="top" title={infoTooltip} className="cursor-pointer" /></label>
               <input value={formData.nombreDecision} onChange={handleChange} name="nombreDecision" type="text" className="form-control" id="decision" required />
            </div>
            <div className="flex justify-end">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">Actualizar</button>
            </div>
         </form>
      </Fragment>
   )
}

export {
   CreateDecisionComite,
   UpdateDecisionComite
}