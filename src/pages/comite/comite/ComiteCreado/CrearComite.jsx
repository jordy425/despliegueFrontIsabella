import { Fragment } from "react"
import { CreateComite } from "../components/comite.forms"

const CrearComite = () => {
   return (
      <Fragment>
         <h2 className="text-4xl pb-2">Crear Comité</h2>
         <div className="card mb-20">
            <div className="card-body">
               <CreateComite />
            </div>
         </div>
      </Fragment>
   )
}

export default CrearComite