import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import { TransitionProvider } from './components/Transition.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// HashRouter evita problemas de 404 en GitHub Pages al usar #
// No necesita redirección desde 404.html ni configuración del servidor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <TransitionProvider>
          <App />
        </TransitionProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
