import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Input from './Input';
import api from '../services/api';

jest.mock('../services/api');
jest.mock('../actions/inputActions', () => ({ verification: jest.fn() }));

const validData = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
};

describe('Input', () => {
  let handleCep;

  beforeEach(() => {
    handleCep = jest.fn();
    api.get.mockReset();
  });

  it('renders the text input and search button', () => {
    render(<Input handleCep={handleCep} />);
    expect(screen.getByPlaceholderText('Digite o CEP...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not call the API when input is empty', async () => {
    render(<Input handleCep={handleCep} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(api.get).not.toHaveBeenCalled());
    expect(handleCep).not.toHaveBeenCalled();
  });

  it('shows error message when input is empty', async () => {
    render(<Input handleCep={handleCep} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Insira um CEP!')).toBeInTheDocument()
    );
  });

  it('calls the API with the typed CEP and passes data to handleCep', async () => {
    api.get.mockResolvedValue({ data: validData });
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '01001000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('01001000/json');
      expect(handleCep).toHaveBeenCalledWith(validData);
    });
  });

  it('clears the input field after a successful search', async () => {
    api.get.mockResolvedValue({ data: validData });
    render(<Input handleCep={handleCep} />);

    const input = screen.getByPlaceholderText('Digite o CEP...');
    fireEvent.change(input, { target: { value: '01001000' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(input.value).toBe(''));
  });

  it('clears the input and does not throw when the API call fails', async () => {
    api.get.mockRejectedValue(new Error('Network error'));
    render(<Input handleCep={handleCep} />);

    const input = screen.getByPlaceholderText('Digite o CEP...');
    fireEvent.change(input, { target: { value: '00000000' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(input.value).toBe(''));
    expect(handleCep).not.toHaveBeenCalled();
  });

  it('shows error message when the API call fails', async () => {
    api.get.mockRejectedValue(new Error('Network error'));
    render(<Input handleCep={handleCep} />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '00000000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(
        screen.getByText('Erro ao buscar o CEP. Verifique sua conexão.')
      ).toBeInTheDocument()
    );
  });
});
