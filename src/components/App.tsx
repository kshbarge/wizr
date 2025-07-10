import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/ProfilePage";
import SessionPage from "../pages/SessionPage";
import UserCard from "./UserCard";
import Header from "./Header";
import Chat from './Chat'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/session" element={<SessionPage />} />
<<<<<<< HEAD
        <Route path="/match" element={<UserCard />} />
=======
        <Route path="/chat" element={<Chat/>}/>
>>>>>>> origin/main
      </Routes>
    </>
  );
}

export default App;
