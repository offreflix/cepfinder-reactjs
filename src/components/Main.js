import { Fragment } from 'react';

function Main(props) {
  return (
    <Fragment>
      {Object.keys(props.cep).length > 1 && (
        <main className="main">
          <h2>CEP: {props.cep.cep}</h2>

          <span>{props.cep.logradouro}</span>
          <span>{props.cep.bairro}</span>
          <span>
            {props.cep.localidade} - {props.cep.uf}
          </span>
        </main>
      )}
    </Fragment>
  );
}

export default Main;
