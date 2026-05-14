import { useState } from 'react';
import { FiSearch, FiLoader } from 'react-icons/fi';
import Swal from 'sweetalert2';
import api from '../services/api';
import { CepData } from '../types';

interface InputProps {
  handleCep: (data: CepData) => void;
}

function Input({ handleCep }: InputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (input === '') {
      setError('Insira um CEP válido.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await api.get<CepData | { erro: true }>(`${input}/json`);
      setInput('');
      if (!('erro' in response.data)) {
        handleCep(response.data);
      } else {
        Swal.fire({
          title: 'CEP não encontrado',
          text: 'Verifique o código e tente novamente.',
          icon: 'error',
          background: '#1A1612',
          color: '#EDE5D5',
          iconColor: '#C85A45',
          confirmButtonColor: '#C8A96E',
        });
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
      setInput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="searchSection">
      <label htmlFor="cep-input" className="searchLabel">
        Código Postal
      </label>
      <div className="containerInput">
        <input
          id="cep-input"
          type="text"
          placeholder="00000-000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          maxLength={9}
        />
        <button
          className="buttonSearch"
          onClick={handleSearch}
          disabled={loading}
          aria-label="Buscar CEP"
        >
          {loading
            ? <FiLoader size={20} className="spinIcon" />
            : <FiSearch size={20} />
          }
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default Input;
