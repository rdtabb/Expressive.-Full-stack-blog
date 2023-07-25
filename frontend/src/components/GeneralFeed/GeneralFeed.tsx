import { Routes, Route } from "react-router-dom";
import Posts from "./PostsG/PostsG";
import Header from "../Profile/Header/Header";
import Nav from "../Profile/Nav/Nav";
import Footer from "../Profile/Footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import PostpageG from "./PostpageG/PostpageG";
import AnotherUser from "../AnotherUser/AnotherUser";
import Container from "../Container/Container";
import { GeneralFeedContextProvider } from "../../context/GeneralFeedContext";

const GeneralFeed = () => {
  return (
    <>
      <Container>
        <Header />
        <Nav />
        <GeneralFeedContextProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/:id" element={<PostpageG />} />
              <Route path="/:id/user" element={<AnotherUser />} />
            </Routes>
          </ErrorBoundary>
        </GeneralFeedContextProvider>
      </Container>
      <Footer />
    </>
  );
};

export default GeneralFeed;
