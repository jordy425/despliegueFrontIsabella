import Swal from "sweetalert2"

const ErrorValidate = ({ message }) => {
   Swal.fire({
      position: "center",
      icon: "error",
      title: "ERROR",
      text: `${message}`,
      showConfirmButton: false,
      timer: 1500,
   })
   return null
}

export {
   ErrorValidate,
}