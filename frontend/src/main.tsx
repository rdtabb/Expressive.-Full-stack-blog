import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { LoginRegisterProvider } from './context/LoginRegister'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginRegisterProvider>
          <App />
      </LoginRegisterProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
