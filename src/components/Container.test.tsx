import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders the app title', () => {
    render(<Container />);
    expect(screen.getByText('Buscador de CEP')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Container><p>filho</p></Container>);
    expect(screen.getByText('filho')).toBeInTheDocument();
  });
});
