import { Routes, Route } from "react-router-dom";
import Posts from "./PostsG/PostsG";
import Header from "../Profile/Header/Header";
import Nav from "../Profile/Nav/Nav";
import Footer from "../Profile/Footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import PostpageG from "./PostpageG/PostpageG";

const GeneralFeed = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Nav />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/postpage/:id" element={<PostpageG />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
};

export default GeneralFeed;
