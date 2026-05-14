import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Input from './Input';
import api from '../services/api';
import Swal from 'sweetalert2';
import { CepData } from '../types';

jest.mock('../services/api');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

const mockGet = api.get as jest.MockedFunction<typeof api.get>;
const mockFire = Swal.fire as jest.MockedFunction<typeof Swal.fire>;

const validData = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
} as CepData;

describe('Input', () => {
  let handleCep: jest.MockedFunction<(data: CepData) => void>;

  beforeEach(() => {
    handleCep = jest.fn();
    mockGet.mockReset();
    mockFire.mockClear();
  });

  it('renders the text input and search button', () => {
    render(<Input handleCep={handleCep} />);
    expect(screen.getByPlaceholderText('Digite o CEP...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not call the API when input is empty', async () => {
    render(<Input handleCep={handleCep} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(mockGet).not.toHaveBeenCalled());
    expect(handleCep).not.toHaveBeenCalled();
  });

  it('shows error message when input is empty', async () => {
    render(<Input handleCep={handleCep} />);
    fireEvent.click(screen.getByRole('button'));
    await screen.findByText('Insira um CEP!');
  });

  it('calls the API with the typed CEP and passes data to handleCep', async () => {
    mockGet.mockResolvedValue({ data: validData } as any);
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '01001000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(handleCep).toHaveBeenCalledWith(validData));
    expect(mockGet).toHaveBeenCalledWith('01001000/json');
  });

  it('shows error alert and does not call handleCep for invalid CEP', async () => {
    mockGet.mockResolvedValue({ data: { erro: true } } as any);
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '00000000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockFire).toHaveBeenCalledWith({
        title: 'O CEP que você inseriu não existe',
        text: 'Cheque se digitou errado e tente novamente',
        icon: 'error',
      }),
    );
    expect(handleCep).not.toHaveBeenCalled();
  });

  it('clears the input field after a successful search', async () => {
    mockGet.mockResolvedValue({ data: validData } as any);
    render(<Input handleCep={handleCep} />);

    const input = screen.getByPlaceholderText('Digite o CEP...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '01001000' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(input.value).toBe(''));
  });

  it('clears the input and does not throw when the API call fails', async () => {
    mockGet.mockRejectedValue(new Error('Network error'));
    render(<Input handleCep={handleCep} />);

    const input = screen.getByPlaceholderText('Digite o CEP...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '00000000' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(input.value).toBe(''));
    expect(handleCep).not.toHaveBeenCalled();
  });

  it('shows error message when the API call fails', async () => {
    mockGet.mockRejectedValue(new Error('Network error'));
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '00000000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await screen.findByText('Erro ao buscar o CEP. Verifique sua conexão.');
  });

  it('disables the button while the request is in flight', async () => {
    mockGet.mockReturnValue(new Promise(() => {}));
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '01001000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('triggers search when Enter is pressed in the input', async () => {
    mockGet.mockResolvedValue({ data: validData } as any);
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '01001000' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Digite o CEP...'), {
      key: 'Enter',
    });

    await waitFor(() => expect(handleCep).toHaveBeenCalledWith(validData));
  });
});
