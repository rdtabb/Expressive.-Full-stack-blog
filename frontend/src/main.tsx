import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { LoginRegisterProvider } from './context/LoginRegister'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginRegisterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginRegisterProvider>
  </React.StrictMode>,
)
