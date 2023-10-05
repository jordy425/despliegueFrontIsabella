import { LoginForm } from "./components/login.forms"


const Login = () => {
   return (
      <section
         className="vh-100 bg-cover position-relative"
         style={{
            backgroundImage: "url('./img/wallpaper.jpg')",
         }}
      >
         <div
            className="position-absolute top-0 bottom-0 left-0 right-0"
            style={{
               background: "rgba(0, 0, 0, 0.3)",
               backdropFilter: "blur(8px)",
            }}
         />
         <div className="container py-5 h-100">
            <div className="flex justify-center items-center h-100">
               <div className="w-full md:w-3/4 lg:w-1/2">
                  <div className="card rounded-xl shadow-md">
                     <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bg-white md:rounded-l-xl md:p-10 flex items-center justify-center position-relative overflow-hidden">
                           <img
                              src="./img/login_form.jpg"
                              alt="login form"
                              className="h-100 w-100 position-absolute"
                              style={{ objectFit: 'cover' }}
                           />
                        </div>
                        <div className="p-5 md:p-10 flex items-center">
                           <div>
                              <div className="flex items-center mb-3 pb-1">
                                 <i className="fas fa-cubes fa-2x me-3" style={{ color: 'green' }}></i>
                                 <span className="text-2xl font-bold mb-0" style={{ marginLeft: '-3.5%' }}>SENASTION</span>
                              </div>
                              <LoginForm />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Login