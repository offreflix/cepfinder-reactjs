import { render, screen } from '@testing-library/react';
import Main from './Main';
import { CepData } from '../types';

const validCep: CepData = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  complemento: '',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
  ibge: '3550308',
  gia: '1004',
  ddd: '11',
  siafi: '7107',
};

describe('Main', () => {
  it('renders nothing when cep is null', () => {
    render(<Main cep={null} />);
    expect(screen.queryByRole('main')).toBeNull();
  });

  it('renders address data for a valid CEP', () => {
    render(<Main cep={validCep} />);
    expect(screen.getByText('CEP: 01001-000')).toBeInTheDocument();
    expect(screen.getByText('Praça da Sé')).toBeInTheDocument();
    expect(screen.getByText('Sé')).toBeInTheDocument();
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
  });
});
