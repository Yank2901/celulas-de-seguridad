import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";
import MyCells from "./Views/MyCells";
import FindCells from "./Views/FindCells";
import ContactUs from "./Views/ContactUs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} userData={userData} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>
        <div className="content-container">
          <Routes>
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>} />
            <Route path="/find-cells" element={<FindCells />} />
            <Route path="/my-cells" element={<MyCells />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
