import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DrawerComp from "./DrawerComp";
import pages from "../Data/Pages.json";

// Barra de estilo personalizada para opciones de secciones
const StyledTabs = styled((props) => (
  <Tabs
    variant="scrollable"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "80%",
    width: "100%",
    backgroundColor: "#2EC5CE",
  },
});

// Estilo para tipo de opciones de cada seccion
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.7)",
    "&.Mui-selected": {
      fontWeight: theme.typography.fontWeightBold,
      color: "#000",
    },
  })
);

// Estilo personalizado para boton de inicio de sesion
const LoginButton = styled(Button)(() => ({
  color: "#8C30F5",
  backgroundColor: "#F1E4FF",
  "&:hover": {
    color: "#8C30F5",
    backgroundColor: "#F1E4FF",
    transform: "scale(1.1)",
  },
  width: "auto", // Ajustar el ancho al texto
  height: "40px", // Alto fijo
}));

// Estilo personalizado para boton de registro
const SingUpButton = styled(Button)(() => ({
  color: "#F1E4FF",
  backgroundColor: "#8C30F5",
  "&:hover": {
    color: "#F1E4FF",
    backgroundColor: "#8C30F5",
    transform: "scale(1.1)",
  },
}));

const Header = () => {
  const [value, setValue] = useState(0); // Índice o valor para seleccionar la sección
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  useEffect(() => {
    // Almacenar el valor de la pestaña seleccionada en localStorage
    localStorage.setItem("selectedTab", value.toString());
  }, [value]);

  useEffect(() => {
    // Recuperar el valor de la pestaña seleccionada desde localStorage al cargar la página
    const selectedTab = localStorage.getItem("selectedTab");
    if (selectedTab) {
      setValue(parseInt(selectedTab));
    }
  }, []);

  useEffect(() => {
    // Actualizar el valor de la pestaña seleccionada al cambiar la ubicación
    const selectedPage = pages.find((page) => page.path === location.pathname);
    if (selectedPage) {
      setValue(pages.indexOf(selectedPage));
    }
  }, [location]);

  // Cambio de seccion entonces cambio el valor para el enfasis en el titulo
  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <AppBar sx={{ backgroundColor: "#fff" }}>
      <Toolbar>
        <HealthAndSafetyIcon sx={{ fontSize: "26px", color: "#FE9A22" }} />
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000",
            marginLeft: "10px",
            fontWeight: "bold",
          }}
        >
          SECURITY CELLS
        </Typography>
        {isMatch ? (
          <DrawerComp />
        ) : (
          <>
            <StyledTabs
              textColor="inherit"
              value={value}
              onChange={handleChange}
              sx={{ marginLeft: "auto", color: "#000" }}
            >
              {pages.map((page, index) => (
                <StyledTab
                  key={index}
                  label={page.title}
                  component={NavLink}
                  to={page.path}
                />
              ))}
            </StyledTabs>
            <LoginButton
              variant="contained"
              sx={{ marginLeft: "auto" }}
              component={NavLink}
              to={'/login'}
            >
              LOG IN
            </LoginButton>
            <SingUpButton 
              variant="contained" 
              sx={{ marginLeft: "10px" }}
              component={NavLink}
              to={'/register'}
            >
              REGISTER
            </SingUpButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
