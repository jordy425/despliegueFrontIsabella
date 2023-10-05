import { BsCaretDownFill, BsList } from "react-icons/bs"
import { Link } from "react-router-dom"

const WebOthersNavbar = ({ logout, user, toggleSidebar }) => {
   const userMail = user.email.length > 12 ? `${user.email.substring(0, 12)}...` : `${user.email.substring(0, 12)}`
   return (
      <div className="px-3 py-2 w-full">
         <div className="flex items-center justify-between">
            <BsList className='w-[2rem] h-[2rem]' type="button" onClick={toggleSidebar} />
            <button className="flex text-sm w-44 justify-between p-1 items-center border rounded-full text-current" id="session-user" type="button" aria-expanded="true" data-dropdown-toggle="dropdown-user">
               <div className="rounded-full mr-2">
                  <img className="w-8 h-8 rounded-full" src="/img/perfil-usuario.png" alt="Usuario" />
               </div>
               <div className='mr-1'>
                  {userMail}
               </div>
               <div className='mr-2'>
                  <BsCaretDownFill />
               </div>
            </button>
            <div id="dropdown-user" className="z-50 hidden my-1 text-base list-none bg-white divide-y divide-gray-400 rounded shadow">
               <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900" role="none">
                     {user.nombre} {user.apellidos}
                  </p>
               </div>
               <ul className="py-1" role="none">
                  <li>
                     <Link to={{ pathname: `/perfil/${user.idUsuario}` }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Perfil
                     </Link>
                  </li>
                  <li>
                     <Link onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Cerrar sesión
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default WebOthersNavbar

