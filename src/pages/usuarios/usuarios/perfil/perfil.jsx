import React, { useState, useEffect, Fragment } from 'react'
import jwt_decode from "jwt-decode";

const Perfil = () => {
  const [token, setToken] = useState(jwt_decode(localStorage.getItem("tokenJWT")));
  const [user, setUser] = useState(token.userInfo)
  console.log(user)

  // const getData = async () => {
  //   try {
  //     const InfoUser = await get(`usuarios/${user.idUsuario}`)
  //     console.log(InfoUser)
  //     setGetInfo(InfoUser);
  //   } catch (error) {
  //     console.log(`Error: ${error}`)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <Fragment>
      <div className="mx-auto" style={{ width: "80%" }}>
        <h2 className='text-4xl mb-2'></h2>
        <div class="card mb-3" >
          <div class="card-header font-bold">Vista General</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Nombre del Usuario</h5>
                <p class="card-text">{user.nombre} {user.apellidos}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Correo electrónico</h5>
                <p class="card-text">{user.email}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Documento del Usuario</h5>
                <p class="card-text">{user.documento}</p>
              </div>
            </li>

            <li class="list-group-item">
              <div class="card-body row">
                <h5 class="card-title col-3 text-muted">Número celular</h5>
                <p class="card-text">{user.telefono}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default Perfil
