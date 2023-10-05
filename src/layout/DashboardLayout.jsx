import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import jwt_decode from "jwt-decode";

const DashboardLayout = ({ children }) => {
   const [sidebarVisible, setSidebarVisible] = useState(true)
   // eslint-disable-next-line
   const [token, setToken] = useState(localStorage.getItem("tokenJWT"))
   // eslint-disable-next-line
   const [tokenExp, setTokenExp] = useState(localStorage.getItem("tokenExpired"))

   useEffect(() => {
      const time = Math.floor(Date.now() / 1000);
      if (tokenExp < time) {
         alert("Sesión cerrada")
         window.location.href = "/"
      }
   }, [tokenExp])

   const handleLogout = () => {
      localStorage.clear()
      window.location.href = "/"
   }

   const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible)
   }
   const user = useMemo(() => {
      const decoded = jwt_decode(token)
      return decoded.userInfo
   }, [token])
   return (
      <div className="flex overflow-hidden h-screen" id="body-content">
         <Sidebar
            user={user}
            sidebarVisible={sidebarVisible}
         />
         <div className={`flex-grow h-full overflow-clip transition-all duration-300 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}>
            <Navbar
               logout={handleLogout}
               user={user}
               toggleSidebar={toggleSidebar}
               sidebarVisible={sidebarVisible}
            />
            <div className="h-full py-8 tablet:pl-[6%] overflow-auto tablet:pr-[6%] 2xl:pr-[8%]" aria-label="Content">
               {children}
            </div>
         </div>
      </div>
   )
}

export default DashboardLayout