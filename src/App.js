import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';
import swal from 'sweetalert';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  function verification(response) {
    if (Object.keys(response.data).length === 1) {
      // alert('Verifique o campo preenchido e tente novamente!');
      swal(
        'O CEP que você inseriu não existe',
        'Cheque se digitou errado e tente novamente',
        'error'
      );
    }
  }

  async function handleSearch() {
    if (input === '') {
      console.log('Insira um CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      // if ((response.data.erro = true)) {
      //   return;
      // }
      setCep(response.data);
      setInput('');
      verification(response);
    } catch (err) {
      console.log(err);
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color={'#FFF'} />
        </button>
      </div>
      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
