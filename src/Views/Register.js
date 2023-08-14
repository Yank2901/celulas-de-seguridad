import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LoginImage from "../Images/LoginImage.png";
import {
  validateId,
  validatePassword,
  validateName,
  validateLastName,
  validateEmail,
} from "../Functions/validateFunctions";
import axios from "axios";

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
  const [location, setLocation] = useState([]);

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

  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
    setErrorAddress(value === "");
  };

  const handleRegister = async () => {
    const isIdValid = await validateId(id);
    const isUserNameValid = await validateName(userName);
    const isUserLastNameValid = await validateLastName(userLastName);
    const isEmailValid = await validateEmail(email);
    const isPassValid = await validatePassword(password);
    const isConfirmPassValid =
      confirmPassword === password && confirmPassword !== "";
    const isProvinceValid = province !== "";
    const isCityValid = city !== "";
    const isNeighborhoodValid = neighborhood !== "";
    const isAddressValid = address !== "";

    setErrorId(!isIdValid);
    setErrorUserName(!isUserNameValid);
    setErrorUserLastName(!isUserLastNameValid);
    setErrorEmail(!isEmailValid);
    setErrorPass(!isPassValid);
    setErrorConfirmPass(!isConfirmPassValid);
    setErrorProvince(!isProvinceValid);
    setErrorCity(!isCityValid);
    setErrorNeighborhood(!isNeighborhoodValid);
    setErrorAddress(!isAddressValid);

    if (
      isIdValid &&
      isUserNameValid &&
      isUserLastNameValid &&
      isEmailValid &&
      isPassValid &&
      isConfirmPassValid &&
      isProvinceValid &&
      isCityValid &&
      isNeighborhoodValid &&
      isAddressValid
    ) {
      createNewUser();
    } else {
      alert("Error al registrar el usuario. Por favor, inténtelo de nuevo.");
    }
  };

  const createNewUser = () => {
    const homeDirections = [
      {
        province: province,
        city: city,
        neighborhood: neighborhood,
        address: address,
      }
    ];
  
    axios.post("http://localhost:8000/api/user/new", {
      id: id,
      name: userName,
      lastName: userLastName,
      email: email,
      password: password,
      homeDirections: homeDirections
    })
      .then(response => {
        navigate("/");
        alert("Usuario registrado con éxito.");
      })
      .catch(error => {
        console.error("Error al realizar la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, inténtelo de nuevo.");
      });
  };

  const getLocations = () => {
    axios
      .get("http://localhost:8000/api/locations")
      .then((response) => {
        const data = response.data;
        setLocation(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const handleProvinceChange = (event) => {
    const value = event.target.value;
    setProvince(value);
    setCity("");
    setNeighborhood("");
    const isValid = validateLastName(value);
    setErrorProvince(!isValid);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
    setNeighborhood("");
    const isValid = validateLastName(value);
    setErrorCity(!isValid);
  };

  const handleNeighborhoodChange = (event) => {
    const value = event.target.value;
    setNeighborhood(value);
    const isValid = validateLastName(value);
    setErrorNeighborhood(!isValid);
  };

  useEffect(() => {
    getLocations();
  }, []);

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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-province-label">Provincia</InputLabel>
            <Select
              error={errorProvince}
              labelId="demo-province-label"
              id="demo-province-select"
              value={province}
              label="Provincia"
              onChange={handleProvinceChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#efe4ce",
                  },
                },
              }}
            >
              {location.map((item, index) => (
                <MenuItem key={index} value={item.province}>
                  {item.province}
                </MenuItem>
              ))}
            </Select>
            {errorProvince ? (
              <FormHelperText sx={{ color: "#db4c3d" }}>
                Provincia inválida.
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-city-label">Ciudad</InputLabel>
            <Select
              error={errorCity}
              labelId="demo-city-label"
              id="demo-city-select"
              value={city}
              label="Ciudad"
              onChange={handleCityChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#efe4ce",
                  },
                },
              }}
            >
              {province &&
                location
                  .find((item) => item.province === province)
                  .cities.map((cityItem, index) => (
                    <MenuItem key={index} value={cityItem.city}>
                      {cityItem.city}
                    </MenuItem>
                  ))}
            </Select>
            {errorCity ? (
              <FormHelperText sx={{ color: "#db4c3d" }}>
                Ciudad inválida.
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-neighborhood-label">Barrio</InputLabel>
            <Select
              error={errorNeighborhood}
              labelId="demo-neighborhood-label"
              id="demo-neighborhood-select"
              value={neighborhood}
              label="Barrio"
              onChange={handleNeighborhoodChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#efe4ce",
                  },
                },
              }}
            >
              {city &&
                location
                  .find((item) => item.province === province)
                  .cities.find((cityItem) => cityItem.city === city)
                  .neighborhoods.map((neighborhoodItem, index) => (
                    <MenuItem key={index} value={neighborhoodItem}>
                      {neighborhoodItem}
                    </MenuItem>
                  ))}
            </Select>
            {errorNeighborhood ? (
              <FormHelperText sx={{ color: "#db4c3d" }}>
                Barrio inválido.
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Box>

        <TextField
          fullWidth
          error={errorAddress}
          id="outlined-error-helper-text"
          label="Dirección"
          helperText={errorAddress ? "Direccion inválida." : ""}
          required
          onBlurCapture={handleAddress}
          sx={{
            marginBottom: "10px",
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
