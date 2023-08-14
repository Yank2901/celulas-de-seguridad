import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Fab,
  Typography,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import cell1 from "../Images/cell1.jpg";
import cell2 from "../Images/cell2.jpg";
import cell3 from "../Images/cell3.jpg";

const FindCells = () => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [location, setLocation] = useState([]);
  const Images = [cell1, cell2, cell3];
  const [cellSecurity, setCellSecurity] = useState([]);
  const colors = ["#A0DCFF", "#C1E5C0", "#C0DAE5", "#FDD9D9", "#FFE3C1"];

  const handleProvinceChange = (event) => {
    const value = event.target.value;
    setProvince(value);
    setCity("");
    setNeighborhood("");
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
    setNeighborhood("");
  };

  const handleNeighborhoodChange = (event) => {
    const value = event.target.value;
    setNeighborhood(value);
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

  const getCells = () => {
    axios
      .get("http://localhost:8000/api/cells")
      .then((response) => {
        const data = response.data;
        setCellSecurity(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const getCellByProvince = () => {
    axios
      .get(`http://localhost:8000/api/cells/${province}`)
      .then((response) => {
        const data = response.data;
        setCellSecurity(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const getCellByProvinceCity = () => {
    axios
      .get(`http://localhost:8000/api/cells/${province}/${city}`)
      .then((response) => {
        const data = response.data;
        setCellSecurity(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const getCellByProvinceCityNeighboor = () => {
    axios
      .get(`http://localhost:8000/api/cells/${province}/${city}/${neighborhood}`)
      .then((response) => {
        const data = response.data;
        setCellSecurity(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const handleSearchClick = () => {
    if (province !== "" && city === "" && neighborhood === "") {
      getCellByProvince();
    } else if (province !== "" && city !== "" && neighborhood === "") {
      getCellByProvinceCity();
    } else if (province !== "" && city !== "" && neighborhood !== "") {
      getCellByProvinceCityNeighboor();
    }
  };

  useEffect(() => {
    getLocations();
    getCells();
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#D5FAFC",
          width: "90%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="on"
      >
        <Chip
          label="FILTROS"
          variant="outlined"
          sx={{
            position: "absolute",
            transform: "translate(0%, -50%)",
            backgroundColor: "#75E3EA",
            zIndex: 1,
            fontWeight: "bold",
            fontSize: "20px",
            padding: "10px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flex: "1",
              margin: "70px 20px 20px 20px",
            }}
          >
            <InputLabel id="demo-province-label">Provincia</InputLabel>
            <Select
              labelId="demo-province-label"
              id="demo-province-select"
              value={province}
              label="Provincia"
              onChange={handleProvinceChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EAFDFE",
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
          </FormControl>
          <FormControl
            sx={{
              display: "flex",
              flex: "1",
              margin: "70px 20px 20px 20px",
            }}
          >
            <InputLabel id="demo-city-label">Ciudad</InputLabel>
            <Select
              labelId="demo-city-label"
              id="demo-city-select"
              value={city}
              label="Ciudad"
              onChange={handleCityChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EAFDFE",
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
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flex: "1",
              margin: "0px 20px 20px 20px",
            }}
          >
            <InputLabel id="demo-neighborhood-label">Barrio</InputLabel>
            <Select
              labelId="demo-neighborhood-label"
              id="demo-neighborhood-select"
              value={neighborhood}
              label="Barrio"
              onChange={handleNeighborhoodChange}
              sx={{ marginBottom: "10px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EAFDFE",
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
          </FormControl>

          <FormControl
            sx={{
              display: "flex",
              flex: "1",
              margin: "5px 20px 20px 20px",
            }}
          >
            <Fab 
              variant="extended" 
              color="primary"
              aria-label="add"
              onClick={handleSearchClick}
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Buscar
            </Fab>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {cellSecurity.map((cell, index) => (
            <Card
              key={index}
              sx={{ display: "flex", width: "40%", margin: "10px 5% 10px 5%"}}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={Images[index % Images.length]}
                  alt={cell.name}
                />
                 <CardContent sx={{ backgroundColor: colors[index % colors.length] }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {cell.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${cell.province}, ${cell.city}, ${cell.neighborhood}, ${cell.address}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default FindCells;
