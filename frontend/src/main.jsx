import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import SportProvider from './providers/SportProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <SportProvider>
        <App />
      </SportProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
