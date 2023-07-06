import React, { useState } from "react";
import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import LoginImage from "../Images/LoginImage.png";
import {
  validateId,
  validatePassword,
  validateName,
  validateLastName,
  validateEmail,
} from "../Functions/validateFunctions";

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
  const [errorUserName, setErrorUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorUserLastName, setErrorUserLastName] = useState(false);
  const [userLastName, setUserLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [password, setPassword] = useState("");
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorProvince, setErrorProvince] = useState(false);
  const [province, setProvince] = useState("");
  const [errorCity, setErrorCity] = useState(false);
  const [city, setCity] = useState("");
  const [errorNeighborhood, setErrorNeighborhood] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleIdChange = (event) => {
    const value = event.target.value;
    setId(value);
    const isValid = validateId(value);
    setErrorId(!isValid);
  };

  const handleUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    const isValid = validateName(value);
    setErrorUserName(!isValid);
  };

  const handleUserLastNameChange = (event) => {
    const value = event.target.value;
    setUserLastName(value);
    const isValid = validateLastName(value);
    setErrorUserLastName(!isValid);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setErrorEmail(!isValid);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    setErrorPass(!isValid);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    const isValid = value === password;
    setErrorConfirmPass(!isValid);
  };

  const handleProvince = (event) => {
    const value = event.target.value;
    setProvince(value);
    const isValid = validateLastName(value);
    setErrorProvince(!isValid);
  };

  const handleCity = (event) => {
    const value = event.target.value;
    setCity(value);
    const isValid = validateLastName(value);
    setErrorCity(!isValid);
  };

  const handleNeighborhood = (event) => {
    const value = event.target.value;
    setNeighborhood(value);
    const isValid = validateLastName(value);
    setErrorNeighborhood(!isValid);
  };

  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
    setErrorAddress((value===''));
  };

  const handleRegister = () => {
    if (
      !errorId &&
      id !== "" &&
      !errorUserName &&
      userName !== "" &&
      !errorUserLastName &&
      userLastName !== "" &&
      !errorEmail &&
      email !== "" &&
      !errorPass &&
      password !== "" &&
      !errorConfirmPass &&
      confirmPassword !== "" &&
      !errorProvince &&
      province !== "" &&
      !errorCity &&
      city !== "" &&
      !errorNeighborhood &&
      neighborhood !== "" &&
      !errorAddress &&
      address !== ""
    ) {
      const newUser = {
        id: id,
        password: password,
        name: userName,
        lastName: userLastName,
        email: email,
        homeDirections: [
          {
            province: province,
            city: city,
            neighborhood: neighborhood,
            address: address
          },
        ]
      };
      props.addNewUser(newUser);
      navigate('/');
    } else {
      alert('Por favor ingrese todos los campos necesarios para el registro.');
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
            color: "var(--text-gray-900, #18191F)",
            fontSize: "72px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "98px",
          }}
        >
          Registrate
        </Typography>
        <TextField
          fullWidth
          error={errorId}
          id="outlined-error-helper-text"
          label="Cedula de Identidad"
          helperText={errorId ? "Número de cedula de identidad inválido." : ""}
          required
          onBlurCapture={handleIdChange}
          variant="outlined"
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorUserName}
          id="outlined-error-helper-text"
          label="Nombre"
          helperText={errorUserName ? "Nombre inválido." : ""}
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
          helperText={errorUserLastName ? "Apellido inválido." : ""}
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
          helperText={errorEmail ? "Correo electrónico inválido." : ""}
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
          helperText={errorPass ? "Contraseña inválida." : ""}
          required
          onBlurCapture={handlePasswordChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          type="password"
          fullWidth
          error={errorConfirmPass}
          id="outlined-error-helper-text"
          label="Verifica tu  contraseña"
          helperText={errorConfirmPass ? "Las contaseñas no coinciden." : ""}
          required
          onBlurCapture={handleConfirmPasswordChange}
          sx={{
            margin: "10px 0px",
          }}
        />

        <Divider
          sx={{ margin: "10px 10px", border: "solid 1px rgba(0, 0, 0, 0.7)" }}
        />

        <TextField
          fullWidth
          error={errorProvince}
          id="outlined-error-helper-text"
          label="Provincia"
          helperText={errorProvince ? "Nombre de provincia inválido." : ""}
          required
          onBlurCapture={handleProvince}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorCity}
          id="outlined-error-helper-text"
          label="Ciudad"
          helperText={errorCity ? "Nombre de ciudad inválido." : ""}
          required
          onBlurCapture={handleCity}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorNeighborhood}
          id="outlined-error-helper-text"
          label="Barrio"
          helperText={errorNeighborhood ? "Nombre de barrio inválido." : ""}
          required
          onBlurCapture={handleNeighborhood}
          sx={{
            margin: "10px 0px",
          }}
        />

        <TextField
          fullWidth
          error={errorAddress}
          id="outlined-error-helper-text"
          label="Dirección"
          helperText={errorAddress ? "Direccion inválida." : ""}
          required
          onBlurCapture={handleAddress}
          sx={{
            margin: "10px 0px",
          }}
        />

        <LoginButton
          variant="contained"
          sx={{ margin: "auto" }}
          onClick={handleRegister}
        >
          Registrate
        </LoginButton>
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
            maxWidth: "100%",
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
