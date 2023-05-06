import { Routes, Route } from "react-router-dom";
import Posts from "./Posts/Posts";
import Header from "../Profile/Header/Header";
import Nav from "../Profile/Nav/Nav";

const GeneralFeed = () => {
  return (
    <div className="container">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Posts />}/>
      </Routes>
    </div>
  );
};

export default GeneralFeed;
