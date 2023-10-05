import React, { Fragment, useState } from "react";
import { create, update } from "../../../../../config/Api/api";
import Swal from "sweetalert2";

const CreateMotivo = ({ listData }) => {
   const [formData, setFormData] = useState({
      nombreMotivo: "",
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async () => {
      try {
         await create("motivos-comite", formData)
            .then(async (res) => {
               if (res.status === 400) {
                  return await Swal.fire({
                     position: "center",
                     icon: "error",
                     title: "ERROR",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 1500,
                  })
               } else {
                  await Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "Completado",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 1500,
                  })
                  cancelForm()
               }
               if (listData) {
                  await listData();
               }
            })
      } catch (error) {
         console.error(error);
      }
   };

   const cancelForm = () => {
      setFormData({
         nombreMotivo: "",
      })
   }

   return (
      <Fragment>
         <form method="POST" className="p-1">
            <div className="form-group">
               <label htmlFor="motivo">Nombre Motivo:</label>
               <input value={formData.nombreMotivo} onChange={handleChange} name='nombreMotivo' type="text" className="form-control" id="motivo" required />
            </div>
            <div className="flex justify-end">
               <button type="button" className="s-button-cancel rounded p-2 mr-2" data-dismiss="modal" onClick={cancelForm}>Cancelar</button>
               <button type="submit" onClick={handleSubmit} data-dismiss="modal" className="s-button-success rounded p-2">Crear</button>
            </div>
         </form>
      </Fragment>
   )
}

const UpdateMotivo = ({ motivoInfo, listData }) => {
   // eslint-disable-next-line
   const [motivo, setMotivo] = useState(motivoInfo)
   const [formData, setFormData] = useState({
      nombreMotivo: motivo.nombreMotivo,
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async () => {
      try {
         await update(`motivos-comite/${motivo.idMotivoComite}`, formData)
            .then(async (res) => {
               if (res.status === 400) {
                  await Swal.fire({
                     position: "center",
                     icon: "error",
                     title: "ERROR",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 1500,
                  })
               } else {
                  await Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "Completado",
                     text: `${res.msg}`,
                     showConfirmButton: false,
                     timer: 1500,
                  })
               }
               if (listData) {
                  await listData();
               }
            })
      } catch (error) {
         console.error(error);
      }
   };

   const cancelForm = () => {
      setFormData({
         nombreMotivo: motivo.nombreMotivo,
      })
   }

   return (
      <Fragment>
         <form method="POST" className="p-1">
            <div className="form-group">
               <label htmlFor="motivo">Nombre Motivo:</label>
               <input value={formData.nombreMotivo} onChange={handleChange} name='nombreMotivo' type="text" className="form-control" id="motivo" required />
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
   CreateMotivo,
   UpdateMotivo
}