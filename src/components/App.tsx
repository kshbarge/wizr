import Chat from './Chat'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
