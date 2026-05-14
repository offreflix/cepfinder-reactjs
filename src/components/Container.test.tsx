import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders the app title', () => {
    render(<Container />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('CEP')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Container><p>filho</p></Container>);
    expect(screen.getByText('filho')).toBeInTheDocument();
  });
});
