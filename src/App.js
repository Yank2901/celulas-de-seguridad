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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  // Guardar datos de usuario cuando se realiza login
  const getData = (user) =>{
    setIsLoggedIn(true);
    setUserData(user);
    console.log(user);
  }

  // Borrar datos de estado cuando el usuario cierra sesion y en base a si queria recordar o no sus datos para un proximo login borro el coockie rememberedUser
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
  
  return (
    <Router>
      <div className="app-container">
        {/* 
        Es el header donde se mostraran las secciones para navegar dentro de la pagina,
        - Se envia el isLoggedIn para mostrar o no los botones de inicio de sesion y registro o en caso contrario el de avatar
        - Se envia el usuario logueado para usar el componente Avatar de Material UI
        - Se envia el closeSession para ser usado como evento de cierre de sesion
        */}
        <Header isLoggedIn={isLoggedIn} userData={userData} closeSession={closeSession}/>
        <div className="content-container">
          <Routes>
            <Route path="/contact-us" element={<ContactUs />} />
            {/* 
              - Se envia el metodo getData para tomar la informacion del usuario logueado
              - se envia el userlist para buscar las credenciales de loggin ingresadas
            */}
            <Route path="/login" element={<Login getData={getData}/>} />
            <Route path="/find-cells" element={<FindCells />} />
            <Route path="/my-cells" element={<MyCells />} />
            {/* 
              - Se envia el metodo addNewUser para agregar un usuario luego del registro
            */}
            <Route path="/register" element={<Register/>} />
            {/* 
              - Se envia el userData para mostrar la informacion en la vista Mi perfil
            */}
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
