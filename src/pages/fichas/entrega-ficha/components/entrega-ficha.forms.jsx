// import React, { useEffect, useState } from "react";
// import { create } from "../../../../config/Api/api";
// import jwt_decode from "jwt-decode"

// const CreateEntregaFicha = ({ fichaInfo, competencias, resultados, traerResultadosE, pasarDatos, pasarForm }) => {
//    // eslint-disable-next-line
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    // eslint-disable-next-line
//    const [fichaInfo2, setFichaInfo2] = useState(localStorage.getItem("fichaV"));
//    const [formData, setFormData] = useState({
//       observacionFicha: "",
//       trimestre: "",
//       usuarioEntregaFicha: user.idUsuario,
//       fichaEntrega: fichaInfo2,
//       competenciaEntregaFicha: "",
//       resultadoEntregaFicha: "",
//    })

//    const handleChange = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       // console.log(formData)
//    }

//    const handleChange2 = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       })
//       traerResultadosE()
//    }

//    const handleSubmit = async (e) => {
//       e.preventDefault()
//       try {
//          // console.log(formData)
//          const data = await create("entrega-ficha", formData)
//          console.log(data)

//          localStorage.setItem('trimestre', JSON.stringify({
//             value: formData.trimestre,
//             content: document.getElementById('trimestre').options[document.getElementById('trimestre').selectedIndex].innerHTML
//          }));
//          localStorage.setItem('competencia', JSON.stringify({
//             value: formData.competenciaEntregaFicha,
//             content: document.getElementById('competenciaEntregaFicha').options[document.getElementById('competenciaEntregaFicha').selectedIndex].innerHTML
//          }));
//          localStorage.setItem('resultadoAprendizaje', JSON.stringify({
//             value: formData.resultadoEntregaFicha,
//             content: document.getElementById('resultadoEntregaFicha').options[document.getElementById('resultadoEntregaFicha').selectedIndex].innerHTML
//          }));

//          pasarForm()
//       } catch (error) {
//          console.log(error)
//       }
//    }
//    console.log(fichaInfo2)
//    return (
//       <div className="card">
//          <div className="card-body">
//             <div className='card-title bg-success text-white p-2'>
//                <h3 className='text-2xl text-center pb-2'>Observación de Ficha</h3>
//             </div>
//             <form className='form row d-flex' onSubmit={handleSubmit} id='entregaFichaForm'>
//                <input type='hidden' value={formData.fichaEntrega} onChange={handleChange} name='fichaEntrega' />
//                <input type='hidden' value={user.idUsuario} onChange={handleChange} name='usuarioEntregaFicha' />
//                <div className='col'>
//                   <div className="form-group">
//                      <label htmlFor="observacionFicha" className="form-label">Observación para la ficha:</label>
//                      <textarea className="form-control" value={formData.observacionFicha} onChange={handleChange} name="observacionFicha" required id="observacionFicha" rows="3"></textarea>
//                   </div>
//                </div>
//                <div className='col'>
//                   <div className='row d-flex'>
//                      <div className='col-4'>
//                         <div className="form-group">
//                            <label htmlFor="trimestre">Trimestre:</label>
//                            <select id="trimestre" value={formData.trimestre} onChange={handleChange} className="form-control" required name="trimestre">
//                               <option>Seleccionar</option>
//                               {fichaInfo.programaFicha ? (
//                                  Array.from({ length: parseInt(fichaInfo.programaFicha.trimestres) }, (_, index) => (
//                                     <option key={index + 1} value={index + 1}>Trimestre {index + 1}</option>
//                                  ))
//                               ) : (
//                                  ''
//                               )}
//                            </select>
//                         </div>
//                      </div>
//                      <div className='col-8'>
//                         <div className="form-group">
//                            <label htmlFor="competenciaEntregaFicha">Competencia:</label>
//                            <select id="competenciaEntregaFicha" value={formData.competenciaEntregaFicha} onChange={handleChange2} required className="form-control" name="competenciaEntregaFicha">
//                               <option>Seleccionar</option>
//                               {competencias.map((i) => {
//                                  if (i.programasCompetencia.idProgramaFormativo === fichaInfo.programaFicha.idProgramaFormativo) {
//                                     return (
//                                        <option key={i.idCompetencia} value={i.idCompetencia}>{i.nombreCompetencia}</option>
//                                     )
//                                  }
//                                  return null;
//                               })}
//                            </select>
//                         </div>
//                      </div>
//                   </div>
//                   <div className='row d-flex align-items-end'>
//                      <div className='col-8'>
//                         <div className="form-group">
//                            <label htmlFor="resultadoEntregaFicha">Resultado de Aprendizaje:</label>
//                            <select id="resultadoEntregaFicha" value={formData.resultadoEntregaFicha} onChange={handleChange} required className="form-control" name="resultadoEntregaFicha">
//                               <option>Seleccionar</option>
//                               {Array.isArray(resultados) && resultados.map((i) => {
//                                  return (
//                                     <option key={i.idResultadoAprendizaje} value={i.idResultadoAprendizaje}>{i.nombreRA}</option>
//                                  )
//                               })}
//                            </select>
//                         </div>
//                      </div>
//                      <div className='col-4'>
//                         <div className='col'>
//                            <div className="form-group">
//                               <button type="submit" className="btn btn-success bg-success w-100">Siguiente</button>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </form>
//          </div>
//       </div>
//    )
// }

// const CreateObservacionesAprendiz = ({ aprendices, decision, motivos, pasarForm, fichaInfo }) => {
//    const [observaciones, setObservaciones] = useState([]);

//    // eslint-disable-next-line
//    const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")))
//    const [user, setUser] = useState(token.userInfo);
//    const [aprendicesData, setAprendicesData] = useState(aprendices.map((aprendiz) => ({
//       ...aprendiz,
//       decisionObservacion: '',
//       motivoQueja: '',
//     })));

//    useEffect(() => {
//       if (observaciones.length !== 0) {
//          try {
//             console.log("Comienzo.")
//             observaciones.map(async (i) => {
//                console.log("Map.")
//                const observacion = {
//                   trimestre: i.trimestre,
//                   ObservacionAprendiz: i.ObservacionAprendiz,
//                   aprendizObservacion: i.aprendizObservacion,
//                   usuarioObservacion: i.usuarioObservacion,
//                   decisionObservacion: i.decisionObservacion,
//                   competenciaObservacion: i.competencia,
//                   resultadoAObservacion: i.resultadoAprendizaje,
//                }
//                console.log("Observacion")
//                console.log(i.decisionObservacion);
//                const dataObservacion = await create("observaciones-aprendiz", observacion)
//                console.log("hola observaciones aprendiz:")

//                console.log(i.motivoQueja)
//                if (dataObservacion && i.motivoQuejaContent !== "No Aplica") {
//                   const queja = {
//                      trimestre: i.trimestre,
//                      descripcionMotivo: i.descripcionMotivo,
//                      aprendizQueja: i.aprendizObservacion,
//                      usuarioQueja: i.usuarioObservacion,
//                      motivoQueja: i.motivoQueja,
//                      estadoQueja: 1,
//                      competenciaQueja: i.competencia,
//                      resultadoAQueja: i.resultadoAprendizaje,
//                   }
//                   await create("quejas", queja)
//                console.log("hola quejas:")

//                }
//             })
//             localStorage.removeItem("trimestre")
//             localStorage.removeItem("competencia")
//             localStorage.removeItem("resultadoAprendizaje")

//             alert('Has completado la entrega de ficha')
//             // window.location.href = `/fichas/${fichaInfo.codigoFicha}`
//          } catch (error) {
//             console.error(error)
//          }
//       }
//    }, [observaciones, fichaInfo.codigoFicha]);

//    const handleFinalizarEntrega = async () => {
//       const forms = Array.from(document.querySelectorAll("#observacionesAprendizForm"));

//       const observacionesAprendices = forms.map((form) => {
//          const trimestre = form.elements["trimestre"].value;
//          const competencia = form.elements["competenciaObservacion"].value;
//          const resultadoAprendizaje = form.elements["resultadoAObservacion"].value;
//          const ObservacionAprendiz = form.elements["ObservacionAprendiz"].value;
//          const decisionObservacion = form.elements["decisionObservacion"].value;

//          // ! Me trae el valor del input
//          const motivoQueja = form.elements["motivoQueja"].value;

//          // ! Me trae el valor de la vista
//          const motivoQuejaContent = form.elements["motivoQueja"].innerHTML;

//          const descripcionMotivo = form.elements["descripcionMotivo"].value;
//          const aprendizObservacion = form.elements["aprendizObservacion"].value;
//          const usuarioObservacion = form.elements["usuarioObservacion"].value;

//          return {
//             trimestre,
//             competencia,
//             resultadoAprendizaje,
//             ObservacionAprendiz,
//             decisionObservacion,
//             motivoQueja,
//             motivoQuejaContent,
//             descripcionMotivo,
//             aprendizObservacion,
//             usuarioObservacion
//          };
//       });

//       setObservaciones(observacionesAprendices);
//    };

//    const changeValue = (index, target) => {
//      console.log(index, target)
//    }

//    const t = JSON.parse(localStorage.getItem("trimestre"));
//    const c = JSON.parse(localStorage.getItem("competencia"));
//    const r = JSON.parse(localStorage.getItem("resultadoAprendizaje"));

//    return (
//       <div className="card">
//          <div className="card-body">
//             <div className="card-title bg-success text-white p-2">
//                <h3 className='text-2xl font-semibold text-center pb-2'>Observaciones de Aprendices</h3>
//             </div>
//             <div className="col">
//                <div className="col d-flex">
//                   <div className="col">
//                      <div className="form-group">
//                         <label htmlFor="">Trimestre:</label>
//                         <h5 className="font-bold text-lg">{t.content}</h5>

//                      </div>
//                   </div>
//                   <div className="col">
//                      <div className="form-group">
//                         <label htmlFor="">Competencia:</label>
//                         <h5 className="font-bold text-lg">{c.content}</h5>
//                      </div>
//                   </div>
//                   <div className="col">
//                      <div className="form-group">
//                         <label htmlFor="">Resultado de Aprendizaje:</label>
//                         <h5 className="font-bold text-lg">{r.content}</h5>
//                      </div>
//                   </div>
//                </div>
//                <div className="col">
//                   {aprendices.map((aprendiz, index) => (
//                      <form key={index} className="form row d-flex" id="observacionesAprendizForm">
//                         <input type="hidden" name="trimestre" id="trimestre" value={t.value} />
//                         <input type="hidden" name="aprendizObservacion" id="aprendizObservacion" value={aprendiz.idAprendiz} />
//                         <input type="hidden" name="usuarioObservacion" id="usuarioObservacion" value={user.idUsuario} />
//                         <input type="hidden" name="competenciaObservacion" id="competenciaObservacion" value={c.value} />
//                         <input type="hidden" name="resultadoAObservacion" id="resultadoAObservacion" value={r.value} />
//                         <div key={aprendiz.idAprendiz}>
//                            <hr className="my-4 border-top" />
//                            <div className="row">
//                               <div className="col">
//                                  <div className="form-group">
//                                     <label>Aprendiz:</label>
//                                     <h5 className="font-bold text-lg">{aprendiz.nombre} {aprendiz.apellidos}</h5>
//                                  </div>
//                               </div>
//                               <div className="col">
//                                  <div className="form-group">
//                                     <label>Observación Aprendiz: <font color="red">*</font></label>
//                                     <textarea className="form-control" name={`ObservacionAprendiz`} required rows="2"></textarea>
//                                  </div>
//                               </div>
//                               <div className="col">
//                                  <div className="form-group">
//                                     <label>Decisión: <font color="red">*</font></label>
//                                     <select className="form-control" onChange={(e) => changeValue(index, e.target.innerHTML)} name={`decisionObservacion`} required>
//                                        <option value="">Seleccionar</option>
//                                        {decision.map((i) => (
//                                           <option key={i.idEstadoDecision} value={i.idEstadoDecision}>
//                                              {i.nombreEstadoDecision}
//                                           </option>
//                                        ))}
//                                     </select>
//                                  </div>
//                               </div>
//                               <div className="col">
//                                  <div className="form-group">
//                                     <label>Motivo Comité: <font color="red">*</font></label>
//                                     <select className="form-control" name={`motivoQueja`} required>
//                                        <option id={`motivo${index}`} value="">Seleccionar</option>
//                                        {motivos.map((i) => (
//                                           <option key={i.idMotivoComite} value={i.idMotivoComite}>{i.nombreMotivo}</option>
//                                        ))}
//                                     </select>
//                                  </div>
//                               </div>
//                               <div className="col" id={`descripcion${index}`}>
//                                  <div className="form-group">
//                                     <label>Descripción motivo:</label>
//                                     <textarea className="form-control" name={`descripcionMotivo`} rows="2"></textarea>
//                                  </div>
//                               </div>
//                            </div>
//                         </div>
//                      </form>
//                   ))}
//                   <div className="col d-flex justify-content-end">
//                      <div className="form-group mr-3">
//                         <button type="button" onClick={pasarForm} className="btn btn-danger bg-danger w-100">Atrás</button>
//                      </div>
//                      <div className="form-group mr-3">
//                         <button type="button" onClick={handleFinalizarEntrega} className="btn btn-success bg-success">Finalizar Entrega</button>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    )
// }

// export {
//    CreateEntregaFicha,
//    CreateObservacionesAprendiz
// }

import React, { useEffect, useState, useMemo } from "react";
import { create } from "../../../../config/Api/api";
import jwt_decode from "jwt-decode";

const CreateEntregaFicha = ({
  fichaInfo,
  competencias,
  resultados,
  traerResultadosE,
  pasarDatos,
  pasarForm,
}) => {
  // eslint-disable-next-line
  const [token, setToken] = useState(
    jwt_decode(localStorage.getItem("tokenJWT"))
  );
  const [user, setUser] = useState(token.userInfo);
  // eslint-disable-next-line
  const [fichaInfo2, setFichaInfo2] = useState(localStorage.getItem("fichaV"));
  const [formData, setFormData] = useState({
    observacionFicha: "",
    trimestre: "",
    usuarioEntregaFicha: user.idUsuario,
    fichaEntrega: fichaInfo2,
    competenciaEntregaFicha: "",
    resultadoEntregaFicha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData)
  };

  const handleChange2 = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    traerResultadosE();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData)
      const data = await create("entrega-ficha", formData);
      console.log(data);

      localStorage.setItem(
        "trimestre",
        JSON.stringify({
          value: formData.trimestre,
          content:
            document.getElementById("trimestre").options[
              document.getElementById("trimestre").selectedIndex
            ].innerHTML,
        })
      );
      localStorage.setItem(
        "competencia",
        JSON.stringify({
          value: formData.competenciaEntregaFicha,
          content: document.getElementById("competenciaEntregaFicha").options[
            document.getElementById("competenciaEntregaFicha").selectedIndex
          ].innerHTML,
        })
      );
      localStorage.setItem(
        "resultadoAprendizaje",
        JSON.stringify({
          value: formData.resultadoEntregaFicha,
          content: document.getElementById("resultadoEntregaFicha").options[
            document.getElementById("resultadoEntregaFicha").selectedIndex
          ].innerHTML,
        })
      );

      pasarForm();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(fichaInfo2);
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title bg-success text-white p-2">
          <h3 className="text-2xl text-center pb-2">Observación de Ficha</h3>
        </div>
        <form
          className="form row d-flex"
          onSubmit={handleSubmit}
          id="entregaFichaForm"
        >
          <input
            type="hidden"
            value={formData.fichaEntrega}
            onChange={handleChange}
            name="fichaEntrega"
          />
          <input
            type="hidden"
            value={user.idUsuario}
            onChange={handleChange}
            name="usuarioEntregaFicha"
          />
          <div className="col">
            <div className="form-group">
              <label htmlFor="observacionFicha" className="form-label">
                Observación para la ficha:
              </label>
              <textarea
                className="form-control"
                value={formData.observacionFicha}
                onChange={handleChange}
                name="observacionFicha"
                required
                id="observacionFicha"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="col">
            <div className="row d-flex">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="trimestre">Trimestre:</label>
                  <select
                    id="trimestre"
                    value={formData.trimestre}
                    onChange={handleChange}
                    className="form-control"
                    required
                    name="trimestre"
                  >
                    <option>Seleccionar</option>
                    {fichaInfo.programaFicha
                      ? Array.from(
                          {
                            length: parseInt(
                              fichaInfo.programaFicha.trimestres
                            ),
                          },
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              Trimestre {index + 1}
                            </option>
                          )
                        )
                      : ""}
                  </select>
                </div>
              </div>
              <div className="col-8">
                <div className="form-group">
                  <label htmlFor="competenciaEntregaFicha">Competencia:</label>
                  <select
                    id="competenciaEntregaFicha"
                    value={formData.competenciaEntregaFicha}
                    onChange={handleChange2}
                    required
                    className="form-control"
                    name="competenciaEntregaFicha"
                  >
                    <option>Seleccionar</option>
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
                  <label htmlFor="resultadoEntregaFicha">
                    Resultado de Aprendizaje:
                  </label>
                  <select
                    id="resultadoEntregaFicha"
                    value={formData.resultadoEntregaFicha}
                    onChange={handleChange}
                    required
                    className="form-control"
                    name="resultadoEntregaFicha"
                  >
                    <option>Seleccionar</option>
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
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success bg-success w-100"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateObservacionesAprendiz = ({
  aprendices,
  decision,
  motivos,
  pasarForm,
  fichaInfo,
}) => {
  const [observaciones, setObservaciones] = useState([]);
  // eslint-disable-next-line
  const [token, setToken] = useState(
    jwt_decode(localStorage.getItem("tokenJWT"))
  );
  const [user, setUser] = useState(token.userInfo);
  const [aprendicesData, setAprendicesData] = useState(
    aprendices.map((aprendiz) => ({
      ...aprendiz,
      decisionObservacion: "",
      motivoQueja: "",
    }))
  );

  const [validations, setValidations] = useState({
    vObservacionA: {
      valid: 0,
      msg: "",
    },

    vDecision: {
      valid: 0,
      msg: "",
    },

    vMotivo: {
      valid: 0,
      msg: "",
    },

    vDescripcion: {
      valid: 0,
      msg: "",
    },

   
  });

  useEffect(() => {
    if (observaciones.length !== 0) {
      try {
        observaciones.map(async (i) => {
          const observacion = {
            trimestre: i.trimestre,
            ObservacionAprendiz: i.ObservacionAprendiz,
            aprendizObservacion: i.aprendizObservacion,
            usuarioObservacion: i.usuarioObservacion,
            decisionObservacion: i.decisionObservacion,
            competenciaObservacion: i.competencia,
            resultadoAObservacion: i.resultadoAprendizaje,
          };
          console.log(i.decisionObservacion);
          const dataObservacion = await create(
            "observaciones-aprendiz",
            observacion
          );
          console.log("Si creó:");

          console.log(i.motivoQueja);
          if (dataObservacion && i.motivoQuejaContent !== "No Aplica") {
            const queja = {
              trimestre: i.trimestre,
              descripcionMotivo: i.descripcionMotivo,
              aprendizQueja: i.aprendizObservacion,
              usuarioQueja: i.usuarioObservacion,
              motivoQueja: i.motivoQueja,
              estadoQueja: 1,
              competenciaQueja: i.competencia,
              resultadoAQueja: i.resultadoAprendizaje,
            };
            await create("quejas", queja);
          }
        });
        localStorage.removeItem("trimestre");
        localStorage.removeItem("competencia");
        localStorage.removeItem("resultadoAprendizaje");

      //   alert("Has completado la entrega de ficha");
        // window.location.href = `/fichas/${fichaInfo.codigoFicha}`
      } catch (error) {
        console.error(error);
      }
    }
  }, [observaciones, fichaInfo.codigoFicha]);

  const handleFinalizarEntrega = async () => {
    const forms = Array.from(
      document.querySelectorAll("#observacionesAprendizForm")
    );

    const observacionesAprendices = forms.map((form) => {
      const trimestre = form.elements["trimestre"].value;
      const competencia = form.elements["competenciaObservacion"].value;
      const resultadoAprendizaje = form.elements["resultadoAObservacion"].value;
      const ObservacionAprendiz = form.elements["ObservacionAprendiz"].value;
      const decisionObservacion = form.elements["decisionObservacion"].value;

      // ! Me trae el valor del input
      const motivoQueja = form.elements["motivoQueja"].value;

      // ! Me trae el valor de la vista
      const motivoQuejaContent = form.elements["motivoQueja"].innerHTML;

      const descripcionMotivo = form.elements["descripcionMotivo"].value;
      const aprendizObservacion = form.elements["aprendizObservacion"].value;
      const usuarioObservacion = form.elements["usuarioObservacion"].value;

      const errorChanges = { ...validations };
      if (
        ObservacionAprendiz === "" ||
        decisionObservacion === "" ||
        motivoQueja === "" ||
        descripcionMotivo === ""
      ) {
        if (ObservacionAprendiz === "") {
          errorChanges.vObservacionA.msg =
            "Las observaciones de aprendices no pueden ir vacias";
          errorChanges.vObservacionA.valid = 2;
        } else {
          errorChanges.vObservacionA.msg = "";
          errorChanges.vObservacionA.valid = 1;
        }

        if(decisionObservacion === ""){
         errorChanges.vDecision.msg = "Las decisiones son obligatorias"
         errorChanges.vDecision.valid  = 2
        }else{
         errorChanges.vDecision.msg = ""
         errorChanges.vDecision.valid  = 1
        }

        if(motivoQueja === ""){
         errorChanges.vMotivo.msg = "Los motivos son obligatorias"
         errorChanges.vMotivo.valid  = 2
        }else{
         errorChanges.vMotivo.msg = ""
         errorChanges.vMotivo.valid  = 1
        }
      //   if(descripcionMotivo === "" && motivoQueja !== 1){
      //    errorChanges.vDescripcion.msg = "La descripcion es obligatoria"
      //    errorChanges.vDescripcion.valid  = 2
      //   }else{
      //    errorChanges.vDescripcion.msg = ""
      //    errorChanges.vDescripcion.valid  = 1
      //   }
      }

      console.log("este es : conteNT ", motivoQuejaContent);
      console.log("este es : sin content ", motivoQueja)

      return {
        trimestre,
        competencia,
        resultadoAprendizaje,
        ObservacionAprendiz,
        decisionObservacion,
        motivoQueja,
        motivoQuejaContent,
        descripcionMotivo,
        aprendizObservacion,
        usuarioObservacion,
      };
    });
    setObservaciones(observacionesAprendices);
  };

  const changeValue = (index, target) => {
    console.log(index, target);
  };

  const t = JSON.parse(localStorage.getItem("trimestre"));
  const c = JSON.parse(localStorage.getItem("competencia"));
  const r = JSON.parse(localStorage.getItem("resultadoAprendizaje"));

  const validated = useMemo(() => {
    return validations;
  }, [validations]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title bg-success text-white p-2">
          <h3 className="text-2xl font-semibold text-center pb-2">
            Observaciones de Aprendices
          </h3>
        </div>
        <div className="col">
          <div className="col d-flex">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Trimestre:</label>
                <h5 className="font-bold text-lg">{t.content}</h5>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Competencia:</label>
                <h5 className="font-bold text-lg">{c.content}</h5>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Resultado de Aprendizaje:</label>
                <h5 className="font-bold text-lg">{r.content}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            {aprendices.map((aprendiz, index) => (
              <form
                key={index}
                className="form row d-flex"
                id="observacionesAprendizForm"
              >
                <input
                  type="hidden"
                  name="trimestre"
                  id="trimestre"
                  value={t.value}
                />
                <input
                  type="hidden"
                  name="aprendizObservacion"
                  id="aprendizObservacion"
                  value={aprendiz.idAprendiz}
                />
                <input
                  type="hidden"
                  name="usuarioObservacion"
                  id="usuarioObservacion"
                  value={user.idUsuario}
                />
                <input
                  type="hidden"
                  name="competenciaObservacion"
                  id="competenciaObservacion"
                  value={c.value}
                />
                <input
                  type="hidden"
                  name="resultadoAObservacion"
                  id="resultadoAObservacion"
                  value={r.value}
                />
                <div key={aprendiz.idAprendiz}>
                  <hr className="my-4 border-top" />
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Aprendiz:</label>
                        <h5 className="font-bold text-lg">
                          {aprendiz.nombre} {aprendiz.apellidos}
                        </h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>
                          Observación Aprendiz: <font color="red">*</font>
                        </label>
                        <textarea
                          className={`form-control ${
                            validated.vObservacionA.valid === 2 && "is-invalid"
                          } ${
                            validated.vObservacionA.valid === 1 && "is-valid"
                          }`}
                          name={`ObservacionAprendiz`}
                          required
                          rows="2"
                        ></textarea>
                        {validated.vObservacionA.msg !== "" && (
                          <span className="text-xs text-red-600">
                            {validated.vObservacionA.msg}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>
                          Decisión: <font color="red">*</font>
                        </label>
                        <select
                          className={`form-control ${
                           validated.vDecision.valid === 2 && "is-invalid"
                         } ${
                           validated.vDecision.valid === 1 && "is-valid"
                         }`}
                          onChange={(e) =>
                            changeValue(index, e.target.innerHTML)
                          }
                          name={`decisionObservacion`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          {decision.map((i) => (
                            <option
                              key={i.idEstadoDecision}
                              value={i.idEstadoDecision}
                            >
                              {i.nombreEstadoDecision}
                            </option>
                          ))}
                        </select>
                        {validated.vDecision.msg !== "" && (
                          <span className="text-xs text-red-600">
                            {validated.vDecision.msg}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>
                          Motivo Comité: <font color="red">*</font>
                        </label>
                        <select
                           className={`form-control ${
                              validated.vMotivo.valid === 2 && "is-invalid"
                            } ${
                              validated.vMotivo.valid === 1 && "is-valid"
                            }`}
                          name={`motivoQueja`}
                          required
                        >
                          <option id={`motivo${index}`} value="">
                            Seleccionar
                          </option>
                          {motivos.map((i) => (
                            <option
                              key={i.idMotivoComite}
                              value={i.idMotivoComite}
                            >
                              {i.nombreMotivo}
                            </option>
                          ))}
                        </select>
                        {validated.vMotivo.msg!== "" && (
                          <span className="text-xs text-red-600">
                            {validated.vMotivo.msg}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col" id={`descripcion${index}`}>
                      <div className="form-group">
                        <label>
                          Descripción motivo: <font color="red">*</font>
                        </label>
                        <textarea
                           className={`form-control ${
                              validated.vDescripcion.valid === 2 && "is-invalid"
                            } ${
                              validated.vDescripcion.valid === 1 && "is-valid"
                            }`}
                          name={`descripcionMotivo`}
                          rows="2"
                        ></textarea>
                          {validated.vDescripcion.msg !== "" && (
                          <span className="text-xs text-red-600">
                            {validated.vDescripcion.msg}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ))}
            <div className="col d-flex justify-content-end">
              <div className="form-group mr-3">
                <button
                  type="button"
                  onClick={pasarForm}
                  className="btn btn-danger bg-danger w-100"
                >
                  Atrás
                </button>
              </div>
              <div className="form-group mr-3">
                <button
                  type="button"
                  onClick={handleFinalizarEntrega}
                  className="btn btn-success bg-success"
                >
                  Finalizar Entrega
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateEntregaFicha, CreateObservacionesAprendiz };
