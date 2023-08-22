import { Fab, Typography, Divider, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

const MyProfile = (props) => {
  // quiero crear una variable para almacenar el resultado de la peticion get
  const [location, setLocation] = useState([]);

  const handleClickOpen = () => {
    console.log("hola");
  };

  const getLocations = () => {
    /*
    Utilizando axios voy a realizar una peticion get para obtener mi JSON de provincias, ciudades y barrios para que en el formulario en lugar de usar un textfield use un dropdown que me muestre las opciones de provincias, ciudades y barrios
    axios.get("http://localhost:8000/api/location",
    */

    axios
      .get("http://localhost:8000/api/location")
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

  return (
    <div
      style={{
        borderRadius: "20px",
        backgroundColor: "#A0DCFF",
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <AccountCircleIcon
        style={{
          color: "var(--text-gray-900, #3C64C8)",
          width: "20%",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <Divider>
        <Chip label="INFORMACIÓN DE CONTACTO" />
      </Divider>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{
          color: "var(--text-gray-900, #18191F)",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "800",
          lineHeight: "2", // Ajustar el valor de lineHeight
          marginBottom: "10px", // Agregar margen inferior
        }}
      >
        Nombre:
        <Typography
          variant="h5"
          component="span"
          style={{
            fontWeight: "normal",
            marginLeft: "5px",
          }}
        >
          {props.userData.name} {props.userData.lastName}
        </Typography>
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{
          color: "var(--text-gray-900, #18191F)",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "800",
          lineHeight: "2", // Ajustar el valor de lineHeight
          marginBottom: "10px", // Agregar margen inferior
        }}
      >
        Cédula:
        <Typography
          variant="h5"
          component="span"
          style={{
            fontWeight: "normal",
            marginLeft: "5px",
          }}
        >
          {props.userData.id}
        </Typography>
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{
          color: "var(--text-gray-900, #18191F)",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "800",
          lineHeight: "2", // Ajustar el valor de lineHeight
          marginBottom: "10px", // Agregar margen inferior
        }}
      >
        Correo Electrónico:
        <Typography
          variant="h5"
          component="span"
          style={{
            fontWeight: "normal",
            marginLeft: "5px",
          }}
        >
          {props.userData.email}
        </Typography>
      </Typography>

      <Divider>
        <Chip label="RESIDENCIAS" />
      </Divider>
      {props.userData.homeDirections.map((home) => (
        <div>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            style={{
              color: "var(--text-gray-900, #18191F)",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "800",
              lineHeight: "2", // Ajustar el valor de lineHeight
              marginBottom: "10px", // Agregar margen inferior
            }}
          >
            Dirección:
            <Typography
              variant="h5"
              component="span"
              style={{
                fontWeight: "normal",
                marginLeft: "5px",
              }}
            >
              {home.province}, {home.city}, {home.neighborhood}, {home.address}
            </Typography>
          </Typography>
        </div>
      ))}
      <Fab
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default MyProfile;
