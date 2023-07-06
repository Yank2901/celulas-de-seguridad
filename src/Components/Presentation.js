import React from "react";
import { Typography, Box, Button } from "@mui/material";
import imgpresentation from "../Images/imgpresentation.jpg";
import { useNavigate } from "react-router-dom";

const Presentation = () => {
  let navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Typography
          variant="h2"
          sx={{ padding: "100px 75px 50px" }}
          fontWeight="bolder"
        >
          Security Cells
        </Typography>
        <Typography variant="body1" sx={{ padding: "0px 75px 50px" }}>
          ¡Bienvenido a tu App Segura! Aquí encontrarás la tranquilidad que
          necesitas para proteger tu hogar. Conéctate con usuarios de tu zona,
          vigila tu entorno y colabora en tiempo real para mantener la seguridad
          de tu comunidad. Presiona el botón "Comenzar" y únete a nuestra red
          segura. Juntos, construiremos un entorno residencial más protegido y
          confiable.
        </Typography>
        <Button
          onClick={() => navigate("/login")}
          sx={{
            color: "#F1E4FF",
            backgroundColor: "#8C30F5",
            marginLeft: "85px",
            "&:hover": {
              color: "#F1E4FF",
              backgroundColor: "#8C30F5",
              transform: "scale(1.1)",
            },
          }}
        >
          Inicio sesión
        </Button>
      </Box>
      <Box padding={10}>
        <img
          src={imgpresentation}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="Imagen presentación"
        />
      </Box>
    </Box>
  );
};

export default Presentation;
