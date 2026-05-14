import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      {children}
    </div>
  );
}

export default Container;
