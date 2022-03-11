import { useState } from 'react';
import './App.css';

import Input from './components/Input';
import Main from './components/Main';
import Container from './components/Container';

function App() {
  const [cep, setCep] = useState({});

  function handleCep(input) {
    setCep(input);
  }

  return (
    <Container>
      <Input handleCep={handleCep} />

      <Main cep={cep} />
    </Container>
  );
}

export default App;
