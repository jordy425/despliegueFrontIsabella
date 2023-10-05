import { BsList } from "react-icons/bs"

const WebMobileNavbar = () => {
   return (
      <nav className="fixed top-0 tablet:hidden z-50 w-full sn-theme border-b">
         <div className="px-3 py-3">
            <div className="flex items-center phone:justify-between">
               <BsList className='w-[1.5rem] h-[1.5rem] tablet:hidden' data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                     SENASTION
                  </span>
                  <img src="img/logo_blanco.png" className="h-8 tablet:hidden" alt="Logo" />
            </div>
         </div>
      </nav>
   )
}

export default WebMobileNavbar