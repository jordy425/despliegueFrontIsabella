import { useState } from "react"
import { UploadActa, UploadResolucion } from "./comite.forms"

const ActaResolucionStepper = ({ comiteInfo, reloadData }) => {
   // eslint-disable-next-line
   const [comite, setComite] = useState(comiteInfo)
   // eslint-disable-next-line
   const [stepActive, setStepActive] = useState(comite.acta === null ? 0 : 1)

   // onNext() seria la función que pasa el step de adelante hacia atrás, recordar hacerlo en columna
   return (
      <div className="w-full p-2">
         {stepActive === 0 && (
            <UploadActa reload={reloadData} comiteInfo={comite} />
         )}
         {stepActive === 1 && (
            <UploadResolucion reload={reloadData} comiteInfo={comite} />
         )}
      </div>
   )
}

export {
   ActaResolucionStepper,
}