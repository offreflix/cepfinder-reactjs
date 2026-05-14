import Swal from 'sweetalert2';

function verification(response) {
  if (Object.keys(response.data).length === 1) {
    Swal.fire({
      title: 'O CEP que você inseriu não existe',
      text: 'Cheque se digitou errado e tente novamente',
      icon: 'error',
    });
  }
}

export { verification };
