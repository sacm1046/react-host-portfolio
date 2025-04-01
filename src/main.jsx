import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home'
import './styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>React Host App</h1>
    <Home />
  </StrictMode>,
)
