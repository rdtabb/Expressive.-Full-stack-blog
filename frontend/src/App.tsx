import { useState } from 'react'
import useLoginRegister from './hooks/useLoginRegister'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoginRegister from './components/LoginRegister/LoginRegister'

const App = () => {
  const { isAuth } = useLoginRegister()


  if (!isAuth) {
    return (
      <ErrorBoundary>
        <LoginRegister />
      </ErrorBoundary>
    )
  }

  return (
    <div className="app">
      <h1>You are authorized!</h1>
    </div>
  )
}

export default App
