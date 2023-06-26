import { Routes, Route } from "react-router-dom";
import Posts from "./PostsG/PostsG";
import Header from "../Profile/Header/Header";
import Nav from "../Profile/Nav/Nav";
import Footer from "../Profile/Footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import PostpageG from "./PostpageG/PostpageG";
import AnotherUser from "../AnotherUser/AnotherUser";
import { GeneralFeedContextProvider } from "../../context/GeneralFeedContext";

const GeneralFeed = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Nav />
        <GeneralFeedContextProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/:id" element={<PostpageG />} />
              <Route path="/user/:id" element={<AnotherUser />} />
            </Routes>
          </ErrorBoundary>
        </GeneralFeedContextProvider>
      </div>
      <Footer />
    </>
  );
};

export default GeneralFeed;
