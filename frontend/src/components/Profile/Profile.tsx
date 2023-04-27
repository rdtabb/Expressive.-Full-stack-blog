import { Routes, Route } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import Header from "./Header/Header"
import Nav from "./Nav/Nav"
import Feed from "./Feed/Feed"
import AddPost from "./AddPost/AddPost"
import PostPage from "./PostPage/PostPage"
import EditPost from "./PostPage/PostPage"

const Profile = () => { 
  return (
    <div className="container">
      <Header />
      <Nav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/post" element={<AddPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}
export default Profile

