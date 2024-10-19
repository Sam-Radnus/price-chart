import { useState } from 'react'
import './App.css'
import  Pricechart  from './components/Pricechart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pricechart/>
    </>
  )
}

export default App
