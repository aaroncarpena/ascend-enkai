import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import 'primeicons/primeicons.css'
import App from './App.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import SportProvider from './providers/SportProvider.jsx'
import SportCenterProvider from './providers/SportCenterProvider.jsx'
import MatchProvider from './providers/MatchProvider.jsx'
import NotificationProvider from './providers/NotificationProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <SportProvider>
            <SportCenterProvider>
              <MatchProvider>
                <App />
              </MatchProvider>
            </SportCenterProvider>
          </SportProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
