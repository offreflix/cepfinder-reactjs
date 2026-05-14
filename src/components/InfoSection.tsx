function InfoSection() {
  return (
    <aside className="infoSection" aria-label="Informações sobre CEP">
      <div className="infoRule">
        <span className="infoRuleDiamond">◆</span>
      </div>

      <div className="infoGrid">
        <section className="infoCard">
          <h2 className="infoTitle">O que é CEP?</h2>
          <p className="infoText">
            O <strong>CEP</strong> (Código de Endereçamento Postal) é um sistema
            numérico de 8 dígitos criado pelos Correios em 1971 para identificar
            logradouros, localidades e regiões em todo o território brasileiro.
            O formato padrão é <strong>XXXXX-XXX</strong>.
          </p>
        </section>

        <section className="infoCard">
          <h2 className="infoTitle">Como usar</h2>
          <p className="infoText">
            Digite o CEP no campo acima (somente números) e pressione{' '}
            <strong>Enter</strong> ou clique na lupa. O endereço completo é
            exibido instantaneamente com logradouro, bairro, município e estado.
          </p>
        </section>

        <section className="infoCard">
          <h2 className="infoTitle">Dados retornados</h2>
          <p className="infoText">
            A consulta retorna <strong>logradouro</strong>, bairro, complemento,
            município, <strong>UF</strong>, DDD telefônico e código{' '}
            <strong>IBGE</strong> do município, diretamente da base pública
            ViaCEP.
          </p>
        </section>

        <section className="infoCard">
          <h2 className="infoTitle">Gratuito e público</h2>
          <p className="infoText">
            A ferramenta é <strong>100% gratuita</strong> e utiliza a API
            ViaCEP, serviço público que cobre todos os CEPs ativos do Brasil.
            Nenhum cadastro ou chave de API é necessário.
          </p>
        </section>
      </div>
    </aside>
  );
}

export default InfoSection;
