import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DestinationPage from "./pages/Destination";
import Profile from "./pages/Profile";
import NavBar from "@/components/NavBar";
import RandomBackgroundImage from "./components/RandomBackgroundImage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <RandomBackgroundImage />
      </div>
      <UserProvider>
        <div className="relative">
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <div>
            <Routes>
              <Route path="/" element={<Welcome isLoggedIn={isLoggedIn} />} />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />
                }
              />
              <Route
                path="/profile/:id"
                element={
                  isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />
                }
              />
              <Route
                path="/login"
                element={
                  !isLoggedIn ? <Login onLogin={handleLogin} /> : <Dashboard />
                }
              />
              <Route
                path="/sign-up"
                element={
                  !isLoggedIn ? (
                    <SignUp setIsLoggedIn={setIsLoggedIn} />
                  ) : (
                    <Dashboard />
                  )
                }
              />
              <Route path="/destination/:id" element={<DestinationPage />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
