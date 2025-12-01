import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import { TransitionProvider } from './components/Transition.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/HURLINGHAM_PNO_REACT" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <TransitionProvider>
          <App />
        </TransitionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
