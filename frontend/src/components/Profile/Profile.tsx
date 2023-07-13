import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import Feed from "./Feed/Feed";
import AddPost from "./AddPost/AddPost";
import PostPage from "./PostPage/PostPage";
import EditPost from "./EditPost/EditPost";
import Footer from "./Footer/Footer";
import LogoutConfirm from "./LogoutConfirm/LogoutConfirm";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import Container from "../Container/Container";

const Profile = () => {
  return (
    <>
      <Container>
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
      </Container>
      <Footer />
      <LogoutConfirm />
      <EditProfilePopup />
    </>
  );
};
export default Profile;
