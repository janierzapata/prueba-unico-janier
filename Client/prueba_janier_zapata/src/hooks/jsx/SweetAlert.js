import Swal from 'sweetalert2'

export const SweetAlert = (title, text, icon, duration) => {
  if (!title || !text || !icon) {
    console.log("Error: Missing parameters");
    return;
  }
  if (duration) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: duration,
    });
  }
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};
