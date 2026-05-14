import { Fragment } from 'react';
import { CepData } from '../types';

interface MainProps {
  cep: CepData | null;
}

function Main({ cep }: MainProps) {
  return (
    <Fragment>
      {cep !== null && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </Fragment>
  );
}

export default Main;
