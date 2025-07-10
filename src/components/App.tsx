import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/ProfilePage";
import SessionPage from "../pages/SessionPage";
import Header from "./Header";
import Chat from './Chat'
import Video from "./Video"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/video" element={<Video/>}/>
      </Routes>
    </>
  );
}

export default App;
