import { useState } from 'react';
import './App.css';

import Input from './components/Input';
import Main from './components/Main';

function App() {
  const [cep, setCep] = useState({});

  function handleCep(input) {
    setCep(input);
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <Input handleCep={handleCep} />

      {Object.keys(cep).length > 1 && <Main cep={cep} />}
    </div>
  );
}

export default App;
