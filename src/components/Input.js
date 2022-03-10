import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../services/api';
import { verification } from '../actions/inputActions';

function Input(props) {
  const [input, setInput] = useState('');

  async function handleSearch() {
    if (input === '') {
      console.log('Insira um CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      props.handleCep(response.data);
      setInput('');
      verification(response);
    } catch (err) {
      console.log(err);
      setInput('');
    }
  }

  return (
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
  );
}

export default Input;
