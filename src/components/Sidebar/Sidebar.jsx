import { useLocation } from 'react-router-dom'
import WebOtherSidebar from './sidebars/WebOthers'
import { BsBuildingAdd, BsClipboardX, BsGear, BsPeople } from 'react-icons/bs'
// eslint-disable-next-line
import { useEffect, useState } from 'react'
// eslint-disable-next-line
import { get } from "../../config/Api/api";

function Sidebar({ user, sidebarVisible }) {
   const location = useLocation()
   const path = location.pathname

   // const menuList = [
   //    {
   //       icon: BsGear,
   //       span: "Configuración",
   //       colapse: "configCollapse",
   //       inUse: false,
   //       links: [
   //          { link: 'administrador', name: 'Administrador' },
   //          { link: 'roles', name: 'Roles' },
   //        //  { link: 'competencias', name: 'Competencias' },
   //        //  { link: 'programasFormativos', name: 'Programas Formativos' },
   //          { link: 'programaCoordinacion', name: 'Programa Coordinación' },
   //         // { link: 'resultadosAprendizaje', name: 'Resultados de Aprendizaje' },
   //          { link: 'gestion', name: 'Gestion' },
   //          // { link: 'tipoDocumento', name: 'Tipo de Documento' },
   //       ]
   //    },
   //    {
   //       icon: BsPeople,
   //       span: "Usuarios",
   //       colapse: "usersCollapse",
   //       inUse: false,
   //       links: [
   //          { link: "usuarios", name: "Usuarios" },
   //          { link: "aprendices", name: "Aprendices" },
   //       ]
   //    },
   //    {
   //       icon: BsBuildingAdd,
   //       span: "Gestión de Fichas",
   //       colapse: "fichasCollapse",
   //       inUse: false,
   //       links: [
   //          { link: "fichas", name: "Fichas" },
   //          // { link: "grupoProyecto", name: "Proyectos Formativos" },
   //       ]
   //    },
   //    {
   //       icon: BsClipboardX,
   //       span: "Comité",
   //       colapse: "comiteCollapse",
   //       inUse: false,
   //       links: [
   //          { link: "quejasComite", name: "Quejas Comité" },
   //          { link: "comite", name: "Comité" },
   //          { link: "planMejoramiento", name: "Plan de Mejoramiento" },
   //       ]
   //    }
   // ]

   const [menu, setMenuState] = useState([])

   useEffect(() => {
      const menuUserPermissions = async () => {
         try {
            const getPermisos = await get(`roles-permisos/rol/${user.rolUsuario.idRol}`)
            
            const mainMenu = []
            const permissions = []

            const filterPermissions = getPermisos.filter((i) => i.permiso.link !== null && i.access === true)
            filterPermissions.forEach((i) => { permissions.push(i.permiso) })

            if (filterPermissions.length >= 1) {
               const filterConfig = filterPermissions.filter((i) => i.permiso.modulo === "Configuración")
               const config = {
                  icon: BsGear,
                  span: "Configuración",
                  colapse: "configCollapse",
                  inUse: false,
                  links: []
               }
               filterConfig.length >= 1 && filterConfig.forEach((i) => { config.links.push({ link: i.permiso.link, name: i.permiso.subModulo }) })
               config.links.length >= 1 && mainMenu.push(config)
               
               const filterUsers = filterPermissions.filter((i) => i.permiso.modulo === "Usuarios")
               const users = {
                  icon: BsPeople,
                  span: "Usuarios",
                  colapse: "usersCollapse",
                  inUse: false,
                  links: []
               }
               filterUsers.length >= 1 && filterUsers.forEach((i) => { users.links.push({ link: i.permiso.link, name: i.permiso.subModulo })})
               users.links.length >= 1 && mainMenu.push(users)
               
               const filterFichas = filterPermissions.filter((i) => i.permiso.modulo === "Gestión de Fichas")
               const fichas = {
                  icon: BsBuildingAdd,
                  span: "Gestión de Fichas",
                  colapse: "fichasCollapse",
                  inUse: false,
                  links: []
               }
               filterFichas.length >= 1 && filterFichas.forEach((i) => { fichas.links.push({ link: i.permiso.link, name: i.permiso.subModulo })})
               fichas.links.length >= 1 && mainMenu.push(fichas)
               
               const filterComite = filterPermissions.filter((i) => i.permiso.modulo === "Comité de Evaluación")
               const comite = {
                  icon: BsClipboardX,
                  span: "Comité de Evaluación",
                  colapse: "comiteCollapse",
                  inUse: false,
                  links: []
               }
               filterComite.length >= 1 && filterComite.forEach((i) => { comite.links.push({ link: i.permiso.link, name: i.permiso.subModulo }) })
               comite.links.length >= 1 && mainMenu.push(comite)
            }
            setMenuState(mainMenu)
            // console.log("Sidebar: ", mainMenu)
         } catch (error) {
            console.log(error)
         }
      }
      menuUserPermissions()
   }, [user])

   const cambiarActive = (i) => {
      const update = []
      menu.map((item, index) => {
         if (index === i) {
            item.inUse = !item.inUse
            return update.push(item)
         } else {
            if (item.inUse === true) {
               item.inUse = false
               return update.push(item)
            } else {
               return update.push(item)
            }
         }
      })
      setMenuState(update)
   }
   const moduleActive = (i) => {
      if (menu[i].inUse === true) {
         return 'ss-modules-active'
      }
   }

   return (
      <aside id="logo-sidebar" className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ${sidebarVisible ? 'translate-x-0' : '-translate-x-48 hover:translate-x-0'}`} aria-label="Sidebar">
         <WebOtherSidebar
            sidebarVisible={sidebarVisible}
            menu={menu}
            cambiarActive={cambiarActive}
            moduleActive={moduleActive}
            path={path}
         />
      </aside>
   )
}

export default Sidebar
