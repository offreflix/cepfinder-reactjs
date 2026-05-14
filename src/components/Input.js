import { useState } from 'react';
import { FiSearch, FiLoader } from 'react-icons/fi';
import Swal from 'sweetalert2';
import api from '../services/api';

function Input(props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (input === '') {
      setError('Insira um CEP!');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await api.get(`${input}/json`);
      setInput('');
      if (!response.data.erro) {
        props.handleCep(response.data);
      } else {
        Swal.fire({
          title: 'O CEP que você inseriu não existe',
          text: 'Cheque se digitou errado e tente novamente',
          icon: 'error',
        });
      }
    } catch (err) {
      setError('Erro ao buscar o CEP. Verifique sua conexão.');
      setInput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="containerInput">
        <label htmlFor="cep-input" className="srOnly">CEP</label>
        <input
          id="cep-input"
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="buttonSearch"
          onClick={handleSearch}
          disabled={loading}
          aria-label="Buscar CEP"
        >
          {loading
            ? <FiLoader size={25} color={'#FFF'} className="spinIcon" />
            : <FiSearch size={25} color={'#FFF'} />
          }
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
    </>
  );
}

export default Input;
