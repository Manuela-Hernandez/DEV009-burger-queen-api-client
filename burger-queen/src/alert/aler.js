import Swal from "sweetalert2"

export function showAlertError(text) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
}

export function questionDelete() {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: '#d33',
    confirmButtonText: "Yes, delete it!"
  })
}

export function completed(text) {
  Swal.fire({
    title: "process successfully",
    text: text,
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  }   
  )
}