import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Skeleton,
  Typography,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import React, { useState, useEffect } from "react";
import axios from "axios";
import cell1 from "../Images/cell1.jpg";
import cell2 from "../Images/cell2.jpg";
import cell3 from "../Images/cell3.jpg";
import { useNavigate } from "react-router-dom";

const MyCells = (props) => {
  const Images = [cell1, cell2, cell3];
  const [cellSecurity, setCellSecurity] = useState([]);
  const colors = ["#A0DCFF", "#C1E5C0", "#C0DAE5", "#FDD9D9", "#FFE3C1"];
  const [isSearching, setIsSearching] = useState(false);
  const userId = props.userData.id;
  const navigate = useNavigate();

  const getMyCells = () => {
    axios
      .get("http://localhost:8000/api/cells")
      .then((response) => {
        const data = response.data;
        const filteredCells = data.filter(cell => {
          return cell.users.some(user => user.id === userId);
        });
        setCellSecurity(filteredCells);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const handleCellClick = (cellId) => {
    navigate(`/chat/${cellId}`)
  };

  
  useEffect(() => {
    getMyCells();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default MyCells;
