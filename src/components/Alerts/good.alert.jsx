import Swal from "sweetalert2"

const GoodValidate = ({ message }) => {
   Swal.fire({
      position: "center",
      icon: "success",
      title: "Completado",
      text: `${message}`,
      showConfirmButton: false,
      timer: 1500,
   })
   return null
}

export {
   GoodValidate,
}