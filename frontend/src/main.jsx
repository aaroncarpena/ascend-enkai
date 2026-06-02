import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import SportProvider from './providers/SportProvider.jsx'
import SportCenterProvider from './providers/SportCenterProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SportProvider>
          <SportCenterProvider>
            <App />
          </SportCenterProvider>
        </SportProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
