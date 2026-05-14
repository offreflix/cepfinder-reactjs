import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import api from './services/api';
import { CepData } from './types';

jest.mock('./services/api');
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

const mockGet = api.get as jest.MockedFunction<typeof api.get>;

const validData = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
} as CepData;

describe('App', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('renders the title and search input', () => {
    render(<App />);
    expect(screen.getByText('Buscador de CEP')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o CEP...')).toBeInTheDocument();
  });

  it('does not show results before any search', () => {
    render(<App />);
    expect(screen.queryByRole('main')).toBeNull();
  });

  it('displays address data after a successful search', async () => {
    mockGet.mockResolvedValue({ data: validData } as any);
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP...'), {
      target: { value: '01001000' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('CEP: 01001-000')).toBeInTheDocument();
      expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
    });
  });
});
