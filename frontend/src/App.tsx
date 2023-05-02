import useLoginRegister from './hooks/useLoginRegister'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { ProfileContextProvider } from './context/ProfileContext'
import LoginRegister from './components/LoginRegister/LoginRegister'
import Profile from './components/Profile/Profile'
import GeneralFeed from './components/GeneralFeed/GeneralFeed'
import { Route, Routes } from 'react-router-dom'

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
    <ProfileContextProvider>
      <ErrorBoundary>
        <Routes>
          <Route path='*' element={<Profile />}/>
          <Route path='/generalfeed' element={<GeneralFeed />}/>
        </Routes>
      </ErrorBoundary>
    </ProfileContextProvider>
  )
}

export default App
