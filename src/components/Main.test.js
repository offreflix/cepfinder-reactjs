import { render, screen } from '@testing-library/react';
import Main from './Main';

const validCep = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
};

describe('Main', () => {
  it('renders nothing when cep is empty', () => {
    const { container } = render(<Main cep={{}} />);
    expect(container.querySelector('.main')).toBeNull();
  });

  it('renders nothing when cep has only one key (invalid)', () => {
    const { container } = render(<Main cep={{ erro: true }} />);
    expect(container.querySelector('.main')).toBeNull();
  });

  it('renders address data for a valid CEP', () => {
    render(<Main cep={validCep} />);
    expect(screen.getByText('CEP: 01001-000')).toBeInTheDocument();
    expect(screen.getByText('Praça da Sé')).toBeInTheDocument();
    expect(screen.getByText('Sé')).toBeInTheDocument();
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
  });
});
