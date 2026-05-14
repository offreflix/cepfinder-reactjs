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
          <div className="mainHeader">
            <span className="mainHeaderLabel">Endereço Localizado</span>
            <span className="mainCep">{cep.cep}</span>
          </div>

          <div className="mainFields">
            <div className="field">
              <span className="fieldLabel">Logradouro</span>
              <span className={`fieldValue${!cep.logradouro ? ' fieldEmpty' : ''}`}>
                {cep.logradouro || 'Não informado'}
              </span>
            </div>

            {cep.complemento && (
              <div className="field">
                <span className="fieldLabel">Complemento</span>
                <span className="fieldValue">{cep.complemento}</span>
              </div>
            )}

            <div className="field">
              <span className="fieldLabel">Bairro</span>
              <span className={`fieldValue${!cep.bairro ? ' fieldEmpty' : ''}`}>
                {cep.bairro || 'Não informado'}
              </span>
            </div>

            <div className="fieldRow">
              <div className="field">
                <span className="fieldLabel">Município</span>
                <span className="fieldValue">{cep.localidade}</span>
              </div>
              <div className="field">
                <span className="fieldLabel">Estado</span>
                <span className="fieldValue">{cep.uf}</span>
              </div>
            </div>

            <div className="fieldRow">
              {cep.ddd && (
                <div className="field">
                  <span className="fieldLabel">DDD</span>
                  <span className="fieldValue mono">{cep.ddd}</span>
                </div>
              )}
              {cep.ibge && (
                <div className="field">
                  <span className="fieldLabel">Cód. IBGE</span>
                  <span className="fieldValue mono">{cep.ibge}</span>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}

export default Main;
