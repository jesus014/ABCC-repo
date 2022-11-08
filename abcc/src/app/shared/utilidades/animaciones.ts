import Swal from "sweetalert2";

export function guardarMensaje(){

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Se a realizado la accion',
    showConfirmButton: false,
    timer: 3000
  })
}
