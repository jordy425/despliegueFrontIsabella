import { Fragment, useEffect, useState } from 'react';
import { create } from "../../../config/Api/api";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateRole = () => {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      nombreRol: "",
   });
   const [permissions, setPermissions] = useState([]);

   useEffect(() => {
      if (permissions.length === 0) {
         const pp = []
         for (let i = 1; i <= 33; i++) {
            pp.push({
               rol: null,
               permiso: i,
               access: false,
            })
         }
         setPermissions(pp)
      }
   }, [permissions])

   const handleChangeRol = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }



   const handleCheckPermiso = async (e) => {
      const { name, checked } = e.target;
      const permisos = permissions

      permisos[name - 1].access = checked
      setPermissions(permisos)
      console.log(permissions)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const filter = permissions.filter(item => item.access === true)
         if (filter.length > 0) {
            const createRol = await create("roles", formData)

            await Promise.all(permissions.map(async (i) => {
               i.rol = createRol.idRol
               console.log(i)
               await create("roles-permisos", i)
            }))
            await Swal.fire({
               position: "center",
               icon: "success",
               title: "Completado",
               text: `Rol creado correctamente`,
               showConfirmButton: false,
               timer: 1500,
            })
            navigate("/roles")
         } else {
            await Swal.fire({
               position: "center",
               icon: "error",
               title: "ERROR",
               text: `Debes seleccionar al menos un Permiso`,
               showConfirmButton: false,
               timer: 1500,
            })
         }
      } catch (error) {

      }
   }

   return (
      <Fragment>
         <h2 className='text-4xl mb-2'>Crear Rol</h2>
         <div className='card mb-20 p-2 flex'>
            <form method='POST' className='flex justify-between items-end p-2'>
               <div className='form-group'>
                  <label htmlFor="nombreRol">Nombre Rol:</label>
                  <input value={formData.nombreRol} onChange={handleChangeRol} name="nombreRol" type="text" className={`form-control`} id="nombreRol" required />
               </div>
               <div className='form-group flex justify-end'>
                  <Link to={"/roles"}><button type='button' className='s-button-cancel rounded p-2 mr-2'>Cancelar</button></Link>
                  <button type="submit" onClick={handleSubmit} className="s-button-success rounded p-2">Crear</button>
               </div>
            </form>
            <hr className="mx-2 border border-gray-400" />
            <div className="flex justify-between px-1 py-1">
               <div className="flex-row w-full">
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           {/* <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" name='7' id="configuracion" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="configuracion">Configuración</label>
                           </div> */}
                           <h5 className='text-xl font-semibold'>Configuración</h5>
                        </div>
                        <div className="card-body my-2 py-0">
                           <div className="custom-control my-2 custom-checkbox">
                              <input type="checkbox" className="custom-control-input" onChange={handleCheckPermiso} name='1' id="programaFormativo" />
                              <label className="custom-control-label" htmlFor="programaFormativo">Programas Formativos</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input type="checkbox" className="custom-control-input" onChange={handleCheckPermiso} name='2' id="administrador" />
                              <label className="custom-control-label" htmlFor="administrador">Administrador</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input type="checkbox" className="custom-control-input" onChange={handleCheckPermiso} name='3' id="programaCoordinacion" />
                              <label className="custom-control-label" htmlFor="programaCoordinacion">Coordinación Académica</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input type="checkbox" className="custom-control-input" onChange={handleCheckPermiso} name='4' id="roles" />
                              <label className="custom-control-label" htmlFor="roles">Roles y Permisos</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           <div className="custom-control custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='24' id="accessComite" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="accessComite">Comité (Acceso)</label>
                           </div>
                        </div>
                        <div className="card-body my-2 py-0">
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='25' id="crearComite" />
                              <label className="custom-control-label" htmlFor="crearComite">Crear</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='26' id="editarComite" />
                              <label className="custom-control-label" htmlFor="editarComite">Editar</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='27' id="comenzarComite" />
                              <label className="custom-control-label" htmlFor="comenzarComite">Comenzar</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='28' id="finalizarComite" />
                              <label className="custom-control-label" htmlFor="finalizarComite">Finalizar</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='29' id="actualizarComite" />
                              <label className="custom-control-label" htmlFor="actualizarComite">Actualizar</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='30' id="consultarComite" />
                              <label className="custom-control-label" htmlFor="consultarComite">Consultar</label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex-row w-full">
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           {/* <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" name='7' id="usuarios" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="usuarios">Usuarios</label>
                           </div> */}
                           <h5 className='text-xl font-semibold'>Usuarios</h5>
                        </div>
                        <div className="card-body py-0 my-1">
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='5' id="usuarios" />
                              <label className="custom-control-label" htmlFor="usuarios">Usuarios</label>
                           </div>
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='6' id="aprendices" />
                              <label className="custom-control-label" htmlFor="aprendices">Aprendices</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           <div className="custom-control custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='16' id="accessPF" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="accessPF">Proyecto Formativo (Acceso)</label>
                           </div>
                        </div>
                        <div className="card-body py-1 my-1">
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='17' id="subirArchivoPF" />
                              <label className="custom-control-label" htmlFor="subirArchivoPF">Subir Evidencia</label>
                           </div>
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='18' id="editarPF" />
                              <label className="custom-control-label" htmlFor="editarPF">Editar</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           <div className="custom-control custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='19' id="accessQC" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="accessQC">Quejas Comité (Acceso)</label>
                           </div>
                        </div>
                        <div className="card-body my-2 py-0">
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='20' id="crearQC" />
                              <label className="custom-control-label" htmlFor="crearQC">Crear</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='21' id="revertirQC" />
                              <label className="custom-control-label" htmlFor="revertirQC">Revertir Queja</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='22' id="Bot" />
                              <label className="custom-control-label" htmlFor="Bot">Bot</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='23' id="Editar" />
                              <label className="custom-control-label" htmlFor="Editar">Editar</label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex-row w-full">
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           <div className="custom-control custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='7' id="accessFicha" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="accessFicha">Fichas (Acceso)</label>
                           </div>
                        </div>
                        <div className="card-body py-0 my-2">
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='8' id="crearFicha" />
                              <label className="custom-control-label" htmlFor="crearFicha">Crear</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='9' id="asignarFicha" />
                              <label className="custom-control-label" htmlFor="asignarFicha">Asignar Instructor</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='10' id="consultarFicha" />
                              <label className="custom-control-label" htmlFor="consultarFicha">Consultar</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='11' id="editarFicha" />
                              <label className="custom-control-label" htmlFor="editarFicha">Editar Ficha</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='12' id="cambiarVoceroFicha" />
                              <label className="custom-control-label" htmlFor="cambiarVoceroFicha">Editar Vocero</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='13' id="crearGpFicha" />
                              <label className="custom-control-label" htmlFor="crearGpFicha">Crear Grupo de Proyecto</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='14' id="hacerEntregaFicha" />
                              <label className="custom-control-label" htmlFor="hacerEntregaFicha">Hacer Entrega</label>
                           </div>
                           <div className="custom-control my-2 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='15' id="verEntregasFicha" />
                              <label className="custom-control-label" htmlFor="verEntregasFicha">Ver Entregas</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="p-2 w-full">
                     <div className="card">
                        <div className="card-header">
                           <div className="custom-control custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='31' id="accessPlanM" />
                              <label className="custom-control-label text-xl font-semibold" htmlFor="accessPlanM">Plan de Mejoramiento (Acceso)</label>
                           </div>
                        </div>
                        <div className="card-body py-1 my-2">
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='33' id="consultarPlanM" />
                              <label className="custom-control-label" htmlFor="consultarPlanM">Consultar</label>
                           </div>
                           <div className="custom-control my-1 custom-checkbox">
                              <input onChange={handleCheckPermiso} type="checkbox" className="custom-control-input" name='32' id="finalizarPlanM" />
                              <label className="custom-control-label" htmlFor="finalizarPlanM">Finalizar</label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default CreateRole;
