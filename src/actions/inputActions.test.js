import { verification } from './inputActions';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));
import Swal from 'sweetalert2';

describe('verification', () => {
  beforeEach(() => {
    Swal.fire.mockClear();
  });

  it('shows error alert when response has only one key (invalid CEP)', () => {
    verification({ data: { erro: true } });
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'O CEP que você inseriu não existe',
      text: 'Cheque se digitou errado e tente novamente',
      icon: 'error',
    });
  });

  it('does not show alert when response has multiple keys (valid CEP)', () => {
    verification({
      data: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      },
    });
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
