import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Events from "./pages/Events";
import Costumes from "./pages/Costumes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App min-h-screen bg-[var(--background)]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/feed"
              element={
                <>
                  <Navigation />
                  <Feed />
                </>
              }
            />
            <Route
              path="/events"
              element={
                <>
                  <Navigation />
                  <Events />
                </>
              }
            />
            <Route
              path="/costumes"
              element={
                <>
                  <Navigation />
                  <Costumes />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Navigation />
                  <Profile />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
