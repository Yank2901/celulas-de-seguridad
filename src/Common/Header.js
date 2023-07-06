import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const Header = (props) => {
  const [value, setValue] = useState(0); // Índice o valor para seleccionar la sección
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

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

  const clearTabSelection = () => {
    setValue(-1);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/my-profile");
    clearTabSelection();
    handleMenuClose();
  };

  // Manejador para la opción "Cerrar sesión"
  const handleLogout = () => {
    navigate("/");
    props.closeSession();
    clearTabSelection();
    handleMenuClose();
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
          <DrawerComp isLoggedIn={props.isLoggedIn} closeSession={props.closeSession} />
        ) : (
          <>
            <StyledTabs
              textColor="inherit"
              value={value}
              onChange={handleChange}
              sx={{ marginLeft: "auto", marginRight: "auto", color: "#000" }}
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
            {props.isLoggedIn ? (
              <div>
                <IconButton
                  size="small"
                  onClick={handleMenuOpen}
                  sx={{ marginLeft: "auto" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#8C30F5",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    alt={props.userData.name + props.userData.lastName}
                    src="/static/images/avatar/1.jpg"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  getContentAnchorEl={null}
                >
                  <MenuItem onClick={handleProfile}>MI PERFIL</MenuItem>
                  <MenuItem onClick={handleLogout}>CERRAR SESIÓN</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <LoginButton
                  variant="contained"
                  sx={{ marginLeft: "auto" }}
                  component={NavLink}
                  to={"/login"}
                  onClick={clearTabSelection}
                >
                  INICIAR SESIÓN
                </LoginButton>
                <SingUpButton
                  variant="contained"
                  sx={{ marginLeft: "10px" }}
                  component={NavLink}
                  to={"/register"}
                  onClick={clearTabSelection}
                >
                  REGISTRATE
                </SingUpButton>
              </div>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
