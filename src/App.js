import { FiSearch } from 'react-icons/fi';

function App() {
  return (
    <div className="container">
      <h1>Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP..."></input>
        <button className="buttonSearch" onClick={() => {}}>
          <FiSearch size={25} color={'#FFF'} />
        </button>
      </div>
      <main>
        <h2>CEP: 90909090</h2>
        <span>Rua Grounded</span>
        <span>Complemento: Sim</span>
        <span>Vila Não</span>
        <span>Algum Lugar - SM</span>
      </main>
    </div>
  );
}

export default App;
