import swal from 'sweetalert';

function verification(response) {
  if (Object.keys(response.data).length === 1) {
    // alert('Verifique o campo preenchido e tente novamente!');
    swal(
      'O CEP que você inseriu não existe',
      'Cheque se digitou errado e tente novamente',
      'error'
    );
  }
}

export { verification };
