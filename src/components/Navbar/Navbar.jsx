import WebOthersNavbar from './navs/WebOthers'

function Navbar({ logout, user, toggleSidebar, sidebarVisible }) {
   return (
      <nav aria-label='Navbar' id='logo-navbar' className={`h-16 top-0`}>
         <WebOthersNavbar
            logout={logout}
            user={user}
            toggleSidebar={toggleSidebar}
         />
      </nav>
   )
}

export default Navbar
