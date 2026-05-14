import { verification } from './inputActions';

jest.mock('sweetalert', () => jest.fn());
import swal from 'sweetalert';

describe('verification', () => {
  beforeEach(() => {
    swal.mockClear();
  });

  it('shows error alert when response has only one key (invalid CEP)', () => {
    verification({ data: { erro: true } });
    expect(swal).toHaveBeenCalledWith(
      'O CEP que você inseriu não existe',
      'Cheque se digitou errado e tente novamente',
      'error'
    );
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
    expect(swal).not.toHaveBeenCalled();
  });
});
