import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import EventPreCheckout from "./pages/EventPreCheckout";
import EventCheckout from "./pages/EventCheckout";
import EventConfirmation from "./pages/EventConfirmation";
import Costumes from "./pages/Costumes";
import CostumeDetail from "./pages/CostumeDetail";
import CostumePreCheckout from "./pages/CostumePreCheckout";
import CostumeCheckout from "./pages/CostumeCheckout";
import CostumeConfirmation from "./pages/CostumeConfirmation";
import CreateFeed from "./pages/CreateFeed";
import CreateEvent from "./pages/CreateEvent";
import CreateCostume from "./pages/CreateCostume";
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
            <Route path="/feed" element={<><Navigation /><Feed /></>} />
            <Route path="/events" element={<><Navigation /><Events /></>} />
            <Route path="/events/:id" element={<><Navigation /><EventDetail /></>} />
            <Route path="/events/:id/pre-checkout" element={<><Navigation /><EventPreCheckout /></>} />
            <Route path="/events/:id/checkout" element={<><Navigation /><EventCheckout /></>} />
            <Route path="/events/:id/confirmation" element={<><Navigation /><EventConfirmation /></>} />
            <Route path="/costumes" element={<><Navigation /><Costumes /></>} />
            <Route path="/costumes/:id" element={<><Navigation /><CostumeDetail /></>} />
            <Route path="/costumes/:id/pre-checkout" element={<><Navigation /><CostumePreCheckout /></>} />
            <Route path="/costumes/:id/checkout" element={<><Navigation /><CostumeCheckout /></>} />
            <Route path="/costumes/:id/confirmation" element={<><Navigation /><CostumeConfirmation /></>} />
            <Route path="/create-feed" element={<><Navigation /><CreateFeed /></>} />
            <Route path="/create-event" element={<><Navigation /><CreateEvent /></>} />
            <Route path="/create-costume" element={<><Navigation /><CreateCostume /></>} />
            <Route path="/profile" element={<><Navigation /><Profile /></>} />
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
