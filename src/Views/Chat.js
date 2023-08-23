import { Box, Fab, TextField, Typography } from "@mui/material";
import { React, Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';

const Chat = () => {
  const { id } = useParams();
  const [cellData, setCellData] = useState({}); // Cambio aquí
  const [chatMessages, setChatMessages] = useState([]);

  const getChatMessages = () => {
    // Simulación de mensajes de chat (reemplazar con tu lógica de obtención de mensajes)
    const exampleMessages = [
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
      { id: 1, text: "Hola, ¿cómo estás?" },
      { id: 2, text: "¡Bien, gracias! ¿Y tú?" },
    ];
    setChatMessages(exampleMessages);
  };

  const getDataCell = () => {
    console.log(`http://localhost:8000/api/cell/${id}`);
    axios
      .get(`http://localhost:8000/api/cell/${id}`)
      .then((response) => {
        const data = response.data;
        setCellData(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  useEffect(() => {
    getDataCell();
    getChatMessages();
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#75E3EA",
          width: "100%", // Agregar esta línea para ocupar todo el espacio disponible verticalmente
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1",
          padding: "15px 0px",
        }}
        noValidate
        autoComplete="on"
      >
        {cellData.name}
      </Box>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#75E3EA",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "8",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        noValidate
        autoComplete="on"
      >
        <Box
          sx={{
            overflowY: "scroll",
            maxHeight: "300px",
            width: "97%",
            padding: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "#555555 #999999",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#555555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#999999",
            },
          }}
        >
          {chatMessages.map((message) => (
            <Typography key={message.id} variant="body1">
              {message.text}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#75E3EA",
          width: "100%", // Agregar esta línea para ocupar todo el espacio disponible verticalmente
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flex: "1",
        }}
        noValidate
        autoComplete="on"
      >
        <Fab 
          variant="extended"
          sx={{ 
            scale: "0.6",
            padding: "5px 0px",	 
          }}
          >
          <AddIcon />
        </Fab>
        <TextField
          id="standard-multiline-static"
          label=""
          multiline
          maxRows={4}
          placeholder="Mensaje"
          variant="standard"
          sx={{ 
            width: "90%",
            padding: "5px 0px",	 
          }}
        />
        <Fab 
          variant="extended"
          sx={{ 
            scale: "0.6",
            padding: "5px 0px",	 
            rotate: "90deg",
          }}
          >
        <NavigationIcon/>
      </Fab>
      </Box>
    </Fragment>
  );
};

export default Chat;
