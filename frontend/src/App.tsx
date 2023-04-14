import { useState } from 'react'
import useLoginRegister from './hooks/useLoginRegister'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoginRegister from './components/LoginRegister/LoginRegister'

const App = () => {
  const { isAuth, setIsAuth } = useLoginRegister()


  if (!isAuth) {
    return (
      <ErrorBoundary>
        <LoginRegister />
      </ErrorBoundary>
    )
  }

  return (
    <div className="app">

    </div>
  )
}

export default App
