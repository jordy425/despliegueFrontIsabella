import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { Administrador, Aprendices, Comite, ComiteCitado, Competencias, CrearComite, EntregaFicha, Fichas, InfoFicha, InitialPage, Login, NotFound, PlanMejoramiento, ProgramaCoordinacion, ProgramasFormativos, QuejasComite, ResultadosAprendizaje, Roles, Usuarios, Gestion, ProyectosFormativos, GrupoProyecto, GrupoFicha, Perfil, ConsultarAprendiz, ComiteConsultado, ObservacionesAprendiz, ConsultarEntrega } from "../../pages";
import jwt_decode from "jwt-decode";
import CreateRole from "../../pages/configuracion/roles/CreateRole";
import UpdateRole from "../../pages/configuracion/roles/UpdateRole";

const ProtectedRoutes = () => {
   const withoutToken = [
      { path: "/", element: <Login /> },
      { path: "*", element: <Navigate to="/" /> },
   ]
   const withToken = [
      { path: "/", element: <DashboardLayout children={<InitialPage />} /> },
      { path: "*", element: <DashboardLayout children={<NotFound />} /> },
      { path: "/administrador", element: <DashboardLayout children={<Administrador />} /> },
      { path: "/roles", element: <DashboardLayout children={<Roles />} /> },
      { path: "/roles/create", element: <DashboardLayout children={<CreateRole />} /> },
      { path: "/roles/update/:id", element: <DashboardLayout children={<UpdateRole />} /> },
     // { path: "/programasFormativos", element: <DashboardLayout children={<ProgramasFormativos />} /> },
      { path: "/programaCoordinacion", element: <DashboardLayout children={<ProgramaCoordinacion />} /> },
      { path: "/usuarios", element: <DashboardLayout children={<Usuarios />} /> },
      { path: "/aprendices", element: <DashboardLayout children={<Aprendices />} /> },
      { path: "/perfil/:id", element: <DashboardLayout children={<Perfil /> } />},
      { path: "/fichas", element: <DashboardLayout children={<Fichas />} /> },
      { path: "/fichas/:ficha", element: <DashboardLayout children={<InfoFicha />} /> },
      { path: "/fichas/:ficha/gp/:idGrupo", element: <DashboardLayout children={<GrupoFicha />} /> },
      { path: "/entregaFicha/:ficha", element: <DashboardLayout children={<EntregaFicha />} /> },
      { path: "/entregaFicha/:ficha/observaciones", element: <DashboardLayout children={<ObservacionesAprendiz />} /> },
      { path: "/entregaFicha/:ficha/entrega/:idEntrega", element: <DashboardLayout children={<ConsultarEntrega />} /> },
      { path: "/proyectosFormativos", element: <DashboardLayout children={<ProyectosFormativos />} /> },
      { path: "/proyectosFormativos/gp/:idGrupo", element: <DashboardLayout children={<GrupoProyecto />} /> },
      { path: "/quejasComite", element: <DashboardLayout children={<QuejasComite />} /> },
      { path: "/comite", element: <DashboardLayout children={<Comite />} /> },
      { path: "/comite/:comite", element: <DashboardLayout children={<ComiteCitado />} /> },
      { path: "/comite/consult/:comite", element: <DashboardLayout children={<ComiteConsultado />} /> },
      { path: "/nuevoComite", element: <DashboardLayout children={<CrearComite />} /> },
      { path: "/planMejoramiento", element: <DashboardLayout children={<PlanMejoramiento />} /> },
      // { path: "/URL", element: <DashboardLayout children={<VISTA_A_MOSTRAR />} /> },
      { path: "/gestion", element: <DashboardLayout children={<Gestion />} /> },
      { path: "/consultarAprendiz/:idAprendiz", element: <DashboardLayout children={<ConsultarAprendiz />} /> },
   ]
   const token = localStorage.getItem("tokenJWT");
   if (token === null) {
      return createBrowserRouter(withoutToken)
   } else {
      const decodeToken = jwt_decode(token);
      const tokenExpired = decodeToken.exp;
      const time = Math.floor(Date.now() / 1000);
      if (tokenExpired < time) {
         localStorage.removeItem("tokenJWT")
         localStorage.removeItem("tokenExpired")
         return window.location.href = "/"
      } else {
         console.log("si se pudo:", token)
         console.log("decodificado:", decodeToken)
         return createBrowserRouter(withToken)
      }
   }
}

const routes = ProtectedRoutes()

export default routes