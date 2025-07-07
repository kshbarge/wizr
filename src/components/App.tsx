import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
