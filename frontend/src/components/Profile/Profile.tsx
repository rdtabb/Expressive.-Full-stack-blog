import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import Header from "./Header/Header"
import Nav from "./Nav/Nav"
import Feed from "./Feed/Feed"

const Profile = () => {
  return (
    <div className="container">
      <Header />
      <Nav />
      <ErrorBoundary>
        <Feed />
      </ErrorBoundary>
    </div>
  )
}

export default Profile
