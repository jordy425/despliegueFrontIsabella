import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CreateEntregaFicha, CreateObservacionesAprendiz } from './components/entrega-ficha.forms';
import { get } from '../../../config/Api/api';
import jwt_decode from "jwt-decode";


const EntregaFicha = () => {
   const { ficha } = useParams()
   const [getInfoFicha, setGetInfoFicha] = useState([])
   const [competencias, setCompetencias] = useState([])
   // eslint-disable-next-line
   const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
   // eslint-disable-next-line
   const [user, setUser] = useState(token.userInfo)

   useEffect(() => {
      const loadData = async () => {
         const dataFicha = await get(`fichas/${ficha}`)
         setGetInfoFicha(dataFicha)

         const dataCompetencias = await get("competencias")
         setCompetencias(dataCompetencias)
      }
      loadData()
   }, [ficha])

   const fichaInfo = useMemo(() => {
      return getInfoFicha
   }, [getInfoFicha])

   const [formData, setFormData] = useState({
      observacionFicha: "",
      trimestre: "",
      usuarioEntregaFicha: user.idUsuario,
      fichaEntrega: "",
      competenciaEntregaFicha: "",
      resultadoEntregaFicha: ""
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const [resultados, setResultados] = useState([])

   const handleChangeGetRAP = async (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      })
      const dataRAP = await get(`resultado-aprendizaje/competencia/${value}`)
      setResultados(dataRAP)
   }

   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault()
      var fichaId = fichaInfo.idFicha
      const data = { ...formData }
      data.fichaEntrega = fichaId

      localStorage.setItem("entregaFicha", JSON.stringify(data))
      navigate(`/entregaFicha/${ficha}/observaciones`)
   }
   return (
      <Fragment>
         <h2 className="text-4xl pb-2">Observación de Ficha - {fichaInfo.codigoFicha}</h2>
         <div className="card">
            <div className="card-body">
               <form className="form row d-flex" method='POST' id="entregaFichaForm">
                  <div className="col">
                     <div className="form-group">
                        <label htmlFor="observacionFicha" className="form-label">Observación para la ficha:</label>
                        <textarea className="form-control" value={formData.observacionFicha} onChange={handleChange} name="observacionFicha" id="observacionFicha" rows="4"></textarea>
                     </div>
                  </div>
                  <div className="col">
                     <div className="row d-flex">
                        <div className="col-4">
                           <div className="form-group">
                              <label htmlFor="trimestre">Trimestre:</label>
                              <select id="trimestre" value={formData.trimestre} onChange={handleChange} className="form-control" name="trimestre">
                                 <option value="">-- --</option>
                                 {fichaInfo.programaFicha ? Array.from({
                                    length: parseInt(
                                       fichaInfo.programaFicha.trimestres
                                    )
                                 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>Trimestre {index + 1}</option>
                                 )) : null}
                              </select>
                           </div>
                        </div>
                        <div className="col-8">
                           <div className="form-group">
                              <label htmlFor="competenciaEntregaFicha">Competencia:</label>
                              <select id="competenciaEntregaFicha" value={formData.competenciaEntregaFicha} onChange={handleChangeGetRAP} className="form-control" name="competenciaEntregaFicha">
                                 <option value="">-- --</option>
                                 {competencias.map((i) => {
                                    if (
                                       i.programasCompetencia.idProgramaFormativo ===
                                       fichaInfo.programaFicha.idProgramaFormativo
                                    ) {
                                       return (
                                          <option key={i.idCompetencia} value={i.idCompetencia}>
                                             {i.nombreCompetencia}
                                          </option>
                                       );
                                    }
                                    return null;
                                 })}
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="row d-flex align-items-end">
                        <div className="col-8">
                           <div className="form-group">
                              <label htmlFor="resultadoEntregaFicha">Resultado de Aprendizaje:</label>
                              <select id="resultadoEntregaFicha" value={formData.resultadoEntregaFicha} onChange={handleChange} className="form-control" name="resultadoEntregaFicha">
                                 <option value="">-- --</option>
                                 {Array.isArray(resultados) &&
                                    resultados.map((i) => {
                                       return (
                                          <option
                                             key={i.idResultadoAprendizaje}
                                             value={i.idResultadoAprendizaje}
                                          >
                                             {i.nombreRA}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                        </div>
                        <div className="col-4">
                           <div className="col">
                              <div className="form-group flex">
                                 <Link to={{ pathname: `/fichas/${ficha}` }}><button type="button" className={`s-button-cancel rounded p-2 mr-2`} >Cancelar</button></Link>
                                 <button type="submit" onClick={handleSubmit} className="s-button-success rounded p-2">Siguiente</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </Fragment>
   );
}

export default EntregaFicha;