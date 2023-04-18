import useLoginRegister from './hooks/useLoginRegister'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { ProfileContextProvider } from './context/ProfileContext'
import LoginRegister from './components/LoginRegister/LoginRegister'
import Profile from './components/Profile/Profile'
import { Route, Routes } from 'react-router-dom'

import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './axios/axios'

const App = () => {
  const { isAuth } = useLoginRegister()

  useEffect(() => {
    axios.get(`${BASE_URL}/getusers`).then((result) => {
      console.log(result)
    })
  }, [])

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <LoginRegister />
      </ErrorBoundary>
    )
  }

  return (
    <ProfileContextProvider>
      <Routes>
        <Route path='/' element={<Profile />}/>
      </Routes>
    </ProfileContextProvider>
  )
}

export default App
