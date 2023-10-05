import { BsArrowReturnRight, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const WebOtherSidebar = ({ sidebarVisible, menu, cambiarActive, moduleActive, path }) => {
   return (
      <div className="flex-col h-full">
         <div className="px-4 py-3 w-full h-16 ss-header">
            <Link to={'/'} className="flex text-decoration-none text-white">
               <img src="./img/logo_blanco.png" className="h-8 mr-3" alt="Logo" />
               <span className={`self-center text-xl font-semibold sm:text-2xl whitespace-nowrap`}>
                  SENASTION
               </span>
            </Link>
         </div>
         <div className="h-full px-2 py-2 overflow-auto">
            <ul className="font-semibold">
               {menu.map((i, index) => (
                  <li key={index} className={`mb-2 ss-modules rounded ${moduleActive(index)}`}>
                     <button type="button" className="flex items-center justify-between w-full p-3 rounded-lg group" aria-controls={`${i.colapse}`} data-collapse-toggle={`${i.colapse}`} onClick={() => cambiarActive(index)}>
                        <i.icon className="w-[1.5rem] h-[1.5rem]" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                           {i.span}
                        </span>
                        {i.inUse ? <BsCaretUpFill /> : <BsCaretDownFill />}
                     </button>
                     <ul id={`${i.colapse}`} className={`px-2 py-2 rounded-lg ${i.inUse !== true && 'hidden'}`}>
                        {i.links.map((j, index) => (
                           <li key={index} className="mb-2">
                              <Link to={`/${j.link}`} className={`ss-items flex items-center p-3 rounded-lg text-decoration-none ${path.startsWith(`/${j.link}`) && 'ss-active'}`}>
                                 <BsArrowReturnRight className="w-[1.2rem] h-[1.3rem]" />
                                 <span className="ml-3">{j.name}</span>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default WebOtherSidebar