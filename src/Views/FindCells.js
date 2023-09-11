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
  Skeleton,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
  TextField,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cell1 from "../Images/cell1.jpg";
import cell2 from "../Images/cell2.jpg";
import cell3 from "../Images/cell3.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const FindCells = (props) => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [location, setLocation] = useState([]);
  const Images = [cell1, cell2, cell3];
  const [cellSecurity, setCellSecurity] = useState([]);
  const colors = ["#A0DCFF", "#C1E5C0", "#C0DAE5", "#FDD9D9", "#FFE3C1"];
  const [isSearching, setIsSearching] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // Estados para generar nueva celula de seguridad
  const [cellName, setCellName] = useState("");
  const [cellProvince, setCellProvince] = useState("");
  const [cellCity, setCellCity] = useState("");
  const [cellNeighboor, setCellNeighboor] = useState("");
  const [cellAddress, setCellAddress] = useState("");
  // Estados de error para campos de celula de seguridad
  const [cellNameError, setCellNameError] = useState(false);
  const [cellProvinceError, setCellProvinceError] = useState(false);
  const [cellCityError, setCellCityError] = useState(false);
  const [cellNeighboorError, setCellNeighboorError] = useState(false);
  const [cellAddressError, setCellAddressError] = useState(false);
  const navigate = useNavigate();

  const handleCellClick = (cellId) => {
    axios
      .get(`http://localhost:8000/api/cell/${cellId}`)
      .then((response) => {
        const users = response.data.users;
        const user = users.find((user) => user.id === props.userData.id);
        if (!user) {
          addNewUserToCell(cellId)
        }
        setTimeout(() => {
          navigate(`/chat/${cellId}`);
        }, 250);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  const addNewUserToCell = (cellId) => {
    axios.put(`http://localhost:8000/api/cell/addUser/${cellId}`, {
      id: props.userData.id,
      name: props.userData.name + " " + props.userData.lastName,
    })
    .then((_) => {
      console.log("Usuario agregado a la celula de seguridad");
      sendRegisterMessage(cellId);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
  };

  const sendRegisterMessage = (cellId) => {
      axios
        .post("http://localhost:8000/api/chat/new", {
          idCell: cellId,
          idUser: props.userData.id,
          nameUser: props.userData.name + " " + props.userData.lastName,
          message: "Se ha registrado en la celula de seguridad.",
          date: new Date(),
          typeMessage: 1,
        })
        .then((_) => {
          console.log("Mensaje de registro enviado");
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCreateNewCell = () => {
    setCellNameError(cellName === "");
    setCellProvinceError(cellProvince === "");
    setCellCityError(cellCity === "");
    setCellNeighboorError(cellNeighboor === "");
    setCellAddressError(cellAddress === "");
    if (
      cellNameError ||
      cellProvinceError ||
      cellCityError ||
      cellNeighboorError ||
      cellAddressError
    ) {
      return;
    }
    axios
      .post("http://localhost:8000/api/cell/new", {
        name: cellName,
        province: cellProvince,
        city: cellCity,
        neighborhood: cellNeighboor,
        address: cellAddress,
        users: [
          {
            id: props.userData.id,
          },
        ],
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Celula de seguridad creada con exito.");
        setOpenDialog(false);
        setCellName("");
        setCellProvince("");
        setCellCity("");
        setCellNeighboor("");
        setCellAddress("");
        setCellNameError(false);
        setCellProvinceError(false);
        setCellCityError(false);
        setCellNeighboorError(false);
        setCellAddressError(false);
        getCells();
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };
  const handleNewCellNameChange = (event) => {
    const value = event.target.value;
    setCellName(value);
    setCellNameError(value === "");
  };

  const handleNewProvinceChange = (event) => {
    const value = event.target.value;
    setCellProvince(value);
    setCellCity("");
    setCellNeighboor("");
    setCellAddress("");
    setCellProvinceError(value === "");
  };

  const handleNewCityChange = (event) => {
    const value = event.target.value;
    setCellCity(value);
    setCellNeighboor("");
    setCellAddress("");
    setCellCityError(value === "");
  };

  const handleNewNeighborhoodChange = (event) => {
    const value = event.target.value;
    setCellNeighboor(value);
    setCellAddress("");
    setCellNeighboorError(value === "");
  };

  const handleNewAddressChange = (event) => {
    const value = event.target.value;
    setCellAddress(value);
    setCellAddressError(value === "");
  };

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
      .get(
        `http://localhost:8000/api/cells/${province}/${city}/${neighborhood}`
      )
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
    setIsSearching(true);

    if (province !== "" && city === "" && neighborhood === "") {
      getCellByProvince();
    } else if (province !== "" && city !== "" && neighborhood === "") {
      getCellByProvinceCity();
    } else if (province !== "" && city !== "" && neighborhood !== "") {
      getCellByProvinceCityNeighboor();
    }
    setIsSearching(false);
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

        <Box
          sx={{
            borderRadius: "20px",
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="on"
        >
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}
            sx={{
              color: "#8C30F5",
              backgroundColor: "#F1E4FF",
              marginBottom: "20px",
              "&:hover": {
                color: "#8C30F5",
                backgroundColor: "#F1C4FF",
              },
            }}
          >
            Agregar Celula de Seguridad
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Agregar celula de seguridad"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            error={cellNameError}
            id="outlined-error-helper-text"
            label="Nombre"
            helperText={cellNameError ? "Nombre de celula inválido." : ""}
            required
            onBlurCapture={handleNewCellNameChange}
            sx={{
              marginBottom: "10px",
            }}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-province-label">Provincia</InputLabel>
              <Select
                error={cellProvinceError}
                labelId="demo-province-label"
                id="demo-province-select"
                value={cellProvince}
                label="Provincia"
                required
                onChange={handleNewProvinceChange}
                sx={{ marginBottom: "10px" }}
              >
                {location.map((item, index) => (
                  <MenuItem key={index} value={item.province}>
                    {item.province}
                  </MenuItem>
                ))}
              </Select>
              {cellProvinceError ? (
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
                error={cellCityError}
                labelId="demo-city-label"
                id="demo-city-select"
                value={cellCity}
                label="Ciudad"
                required
                onChange={handleNewCityChange}
                sx={{ marginBottom: "10px" }}
              >
                {cellProvince &&
                  location
                    .find((item) => item.province === cellProvince)
                    .cities.map((cityItem, index) => (
                      <MenuItem key={index} value={cityItem.city}>
                        {cityItem.city}
                      </MenuItem>
                    ))}
              </Select>
              {cellCityError ? (
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
                error={cellNeighboorError}
                labelId="demo-neighborhood-label"
                id="demo-neighborhood-select"
                value={cellNeighboor}
                label="Barrio"
                required
                onChange={handleNewNeighborhoodChange}
                sx={{ marginBottom: "10px" }}
              >
                {cellCity &&
                  location
                    .find((item) => item.province === cellProvince)
                    .cities.find((cityItem) => cityItem.city === cellCity)
                    .neighborhoods.map((neighborhoodItem, index) => (
                      <MenuItem key={index} value={neighborhoodItem}>
                        {neighborhoodItem}
                      </MenuItem>
                    ))}
              </Select>
              {cellNeighboorError ? (
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
            error={cellAddressError}
            id="outlined-error-helper-text"
            label="Dirección"
            helperText={cellAddressError ? "Direccion inválida." : ""}
            required
            onBlurCapture={handleNewAddressChange}
            sx={{
              marginBottom: "10px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreateNewCell} autoFocus>
            Agregar Celula
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {isSearching ? (
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
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  width: "40%",
                  margin: "10px 5% 10px 5%",
                }}
              >
                <CardActionArea>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    animation="wave"
                  />
                  <CardContent>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        ) : cellSecurity.length > 0 ? (
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
                sx={{
                  display: "flex",
                  width: "40%",
                  margin: "10px 5% 10px 5%",
                }}
                onClick={() => handleCellClick(cell._id)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={Images[index % Images.length]}
                    alt={cell.name}
                  />
                  <CardContent
                    sx={{ backgroundColor: colors[index % colors.length] }}
                  >
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
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography variant="h5" component="div">
              No se encontraron Celulas de Seguridad en el Area.
            </Typography>
            <SentimentDissatisfiedIcon sx={{ fontSize: 100 }} />
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default FindCells;
