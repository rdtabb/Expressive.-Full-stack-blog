import { Routes, Route } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import Header from "./Header/Header"
import Nav from "./Nav/Nav"
import Feed from "./Feed/Feed"
import AddPost from "./AddPost/AddPost"

const Profile = () => {
  return (
    <div className="container">
      <Header />
      <Nav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/post" element={<AddPost />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}
export default Profile

