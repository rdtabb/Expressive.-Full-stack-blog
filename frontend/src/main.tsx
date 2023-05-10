import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { LoginRegisterProvider } from './context/LoginRegister'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient/queryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LoginRegisterProvider>
            <App />
        </LoginRegisterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
