import useLoginRegister from "./hooks/useContextHooks/useLoginRegister";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ProfileContextProvider } from "./context/ProfileContext";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Profile from "./components/Profile/Profile";
import GeneralFeed from "./components/GeneralFeed/GeneralFeed";
import { Route, Routes } from "react-router-dom";
import { CommentsContextProvider } from "./context/CommentsContext";

const App = () => {
  const { isAuth } = useLoginRegister();

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <LoginRegister />
      </ErrorBoundary>
    );
  }

  return (
    <ProfileContextProvider>
      <CommentsContextProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/*" element={<Profile />} />
            <Route path="/generalfeed/*" element={<GeneralFeed />} />
          </Routes>
        </ErrorBoundary>
      </CommentsContextProvider>
    </ProfileContextProvider>
  );
};

export default App;
