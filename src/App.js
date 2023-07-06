import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";
import MyCells from "./Views/MyCells";
import FindCells from "./Views/FindCells";
import ContactUs from "./Views/ContactUs";
import MyProfile from "./Views/MyProfile"
import users from "./Data/Users.json";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const userList = users;

  const getData = (user) =>{
    setIsLoggedIn(true);
    setUserData(user);
    console.log('estado actualizado')
    console.log(user);
  }

  const closeSession = () => {
    const remember = localStorage.getItem('remember');
    if(remember==="true") {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUserData(null);
    } else {
      localStorage.removeItem("rememberedUser");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUserData(null);
    }
  }

  const addNewUser = (newUser) => {
    console.log(newUser);
    userList.push(newUser);
  }

  // Fucnion para evitar borrar el estado al refrescar la pagina
  useEffect(() => {
    const storedUser = localStorage.getItem("rememberedUser");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);
  console.log(userData)
  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} userData={userData} closeSession={closeSession}/>
        <div className="content-container">
          <Routes>
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login getData={getData} userList={userList} />} />
            <Route path="/find-cells" element={<FindCells />} />
            <Route path="/my-cells" element={<MyCells />} />
            <Route path="/register" element={<Register addNewUser={addNewUser} />} />
            <Route path="/my-profile" element={<MyProfile userData={userData}/>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
