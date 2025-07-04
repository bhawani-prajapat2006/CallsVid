import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import SignUp from "./pages/signup.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import Home from "./pages/home.jsx";
import History from "./pages/history.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/:url" element={<VideoMeet />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
