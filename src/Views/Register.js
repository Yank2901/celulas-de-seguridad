import React, { useState } from "react";
import users from "../Data/Users.json";
import { Box, TextField, Typography, Button, Checkbox } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import LoginImage from '../Images/LoginImage.png';
import { validateId, validatePassword } from '../Functions/validateFunctions';
// Estilo personalizado para boton de inicio de sesion
const LoginButton = styled(Button)(() => ({
  color: "#8C30F5",
  backgroundColor: "#F1E4FF",
  textAlign: "center",
  fontSize: "16px",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
  "&:hover": {
    color: "#8C30F5",
    backgroundColor: "#F1E4FF",
    transform: "scale(1.1)",
  },
  width: "60%", // Ajustar el ancho al texto
  height: "40px", // Alto fijo
}));

const Login = () => {
  const [errorId, setErrorId] = useState(false);
  const [id, setId] = useState("");
  const [errorUserName, setErrorUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorUserLastName, setErrorUserLastName] = useState(false);
  const [userLastName, setUserLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleIdChange = (event) => {
    const value = event.target.value;
    setId(value);
    const isValid = validateId(value); 
    setErrorId(!isValid);
  };
  
  const handleUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    const isValid = validatePassword(value);
    setErrorUserName(!isValid);
  };

  const handleUserLastNameChange = (event) => {
    const value = event.target.value;
    setUserLastName(value);
    const isValid = validatePassword(value);
    setErrorUserLastName(!isValid);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const isValid = validatePassword(value);
    setErrorEmail(!isValid);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    setErrorPass(!isValid);
  };

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = () => {
    const user = users.find((user) => user.id === id && user.password === password);
    if (errorId || id===""){
      alert("Por favor ingrese un numero de cedula para iniciar sesión.")
    } else if (errorPass || password===""){
      alert("Por favor ingrese la contraseña de la cuenta.")
    } else if (user) {
      const message = `Se ha iniciado sesión\n\nid: ${id}\nPassword: ${password}`;
      alert(message);

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ id, password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }
    } else {
      alert("Inicio de sesión fallido");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        component="form"
        sx={{
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "2%",
          marginRight: "2%",
          flex: "1",
          padding: "5% 5%",
          background: "#FFC278",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography 
          variant="h1" 
          gutterBottom
          sx={{
            color: 'var(--text-gray-900, #18191F)',
            fontSize: '72px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '800',
            lineHeight: '98px',
          }}
        >
          Registrate
        </Typography>
        <TextField
          fullWidth
          error={errorId}
          id="outlined-error-helper-text"
          label="Cedula de Identidad"
          helperText={errorId ? 'Número de cedula de identidad inválido.' : ''}
          required
          onBlurCapture={handleIdChange}
          variant="outlined"
          sx={{
            margin: '10px 0px',
          }}
        />

        <TextField
          fullWidth
          error={errorUserName}
          id="outlined-error-helper-text"
          label="Nombre"
          helperText={errorUserName ? 'Nombre inválido.' : ''} 
          required
          onBlurCapture={handleUserNameChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorUserLastName}
          id="outlined-error-helper-text"
          label="Apellido"
          helperText={errorUserLastName ? 'Apellido inválido.' : ''} 
          required
          onBlurCapture={handleUserLastNameChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorEmail}
          id="outlined-error-helper-text"
          label="Email"
          helperText={errorEmail ? 'Correo electrónico inválido.' : ''} 
          required
          onBlurCapture={handleEmailChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          type="password"
          fullWidth
          error={errorPass}
          id="outlined-error-helper-text"
          label="Contraseña"
          helperText={errorPass ? 'Contraseña inválida.' : ''} 
          required
          onBlurCapture={handlePasswordChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          type="password"
          fullWidth
          error={errorPass}
          id="outlined-error-helper-text"
          label="Verifica tu  contraseña"
          helperText={errorPass ? 'Contraseña inválida.' : ''} 
          required
          onBlurCapture={handlePasswordChange}
          sx={{
            margin: "10px 0px",
          }}
        />
        
        <LoginButton
          variant="contained"
          sx={{ margin: "auto" }}
          onClick={handleLogin}
          component={ NavLink }
          to={undefined} 
        >
          Iniciar Sesión
        </LoginButton>
        <Typography 
          variant="body2"
          sx={{
            color: "#18191F",
            fontSize: "18px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "32px",
            margin: "10px 0px",
          }} 
        >
          No tienes cuenta.&nbsp;
          <a 
            href="/register" 
            style={{
              color: "#8C30F5",
              textDecoration: "none",
            }}
          >
            Registrate.
          </a>
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "auto 0 ",
          flex: "1",
        }}
      >
        <img
          src={LoginImage}
          loading="lazy"
          alt="Register"
          style={{
            maxWidth:'100%',
            width:'100%',
            height:'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
