import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Checkbox } from "@mui/material";
import { useNavigate } from 'react-router-dom';
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

const Login = (props) => {
  const [errorId, setErrorId] = useState(false);
  const [id, setId] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleIdChange = (event) => {
    const value = event.target.value;
    setId(value);
    const isValid = validateId(value); 
    setErrorId(!isValid);
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
    const user = props.userList.find((user) => user.id === id && user.password === password);
    console.log('Este es el usuario:')
    console.log(user)
    if (errorId || !user || user.id === "") {
      alert("Por favor ingrese un número de cédula válido para iniciar sesión.");
    } else if (errorPass || user.password === "") {
      alert("Por favor ingrese la contraseña de la cuenta.");
    } else {
      props.getData(user);
      localStorage.setItem("rememberedUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem('remember', JSON.stringify(rememberMe));
      navigate("/");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("rememberedUser");
    if (storedUser) {
      const storedUserObj = JSON.parse(storedUser);
      setId(storedUserObj.id);
      setPassword(storedUserObj.password);
      setRememberMe(true);
    }
  }, []);  
  
  return (
    <Box
      sx={{
        display: "flex",
        flex: '1',
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
          background: "#A0DCFF",
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
          Iniciar Sesión
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
        <Typography 
          variant="body1"
          sx={{
            color: "var(--text-gray-900, #18191F)",
            fontSize: "24px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "32px",
            margin: "10px 0px",
          }} 
        >
          <Checkbox
            icon={<RadioButtonUncheckedIcon  />}
            checkedIcon={<RadioButtonCheckedIcon />}
            checked={rememberMe}
            onChange={handleCheckboxChange}
          />
          Recuerdame
        </Typography>
        <LoginButton
          variant="contained"
          sx={{ margin: "auto" }}
          onClick={handleLogin}
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
          alt="login"
          src={LoginImage}
          loading="lazy"
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
