import { useState } from 'react'
import './App.css'

import Input from './components/Input'
import Main from './components/Main'
import Container from './components/Container'
import InfoSection from './components/InfoSection'
import { CepData } from './types'

function App() {
  const [cep, setCep] = useState<CepData | null>(null)

  function handleCep(data: CepData) {
    setCep(data)
  }

  return (
    <>
      <Container>
        <Input handleCep={handleCep} />
        <Main cep={cep} />
      </Container>
      <InfoSection />
    </>
  )
}

export default App
