import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      <div className="titleBlock">
        <div className="titleDecor">✦ República Federativa do Brasil ✦</div>
        <div className="titleRule">
          <span className="titleRuleDiamond">◆</span>
        </div>
        <h1 className="title">
          Buscador de <em>CEP</em>
        </h1>
        <p className="subtitle">Sistema de Localização Postal Brasileiro</p>
      </div>

      {children}
    </div>
  );
}

export default Container;
