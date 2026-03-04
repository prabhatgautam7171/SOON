import { Route, Routes } from "react-router-dom";
import "./App.css";
import VideoMeet from "./pages/VideoMeet";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

import History from "./pages/History";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/meet" element={<Home />} />
        <Route path="/meet/:id" element={<VideoMeet />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
