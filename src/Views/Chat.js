import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { React, Fragment, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";
import ChatMessage from "../Components/ChatMessage";
import DoorbellIcon from "@mui/icons-material/Doorbell";
import ReportIcon from "@mui/icons-material/Report";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import backgroundImage from "../Images/background.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { generateUniqueColors } from "../Functions/validateFunctions"

const actions = [
  {
    icon: <DoorbellIcon />,
    name: "Alerta de actividad sospechosa",
    color: "#FF9999",
    code: 2,
  },
  {
    icon: <ReportIcon />,
    name: "Alerta de robo",
    color: "#FFFF99",
    code: 3,
  },
  {
    icon: <TaxiAlertIcon />,
    name: "Alerta de seguridad en las calles",
    color: "#9999FF",
    code: 4,
  },
  {
    icon: <ChildCareIcon />,
    name: "Alerta de seguridad escolar",
    color: "#CC99CC",
    code: 5,
  },
  {
    icon: <LocalFireDepartmentIcon />,
    name: "Alerta de incendio",
    color: "#FFCC99",
    code: 6,
  },
];

const Chat = (props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id } = useParams();
  const [cellData, setCellData] = useState({});
  const [cellUsers, setCellUsers] = useState([]);
  const userId = props.userData.id;
  const [message, setMessage] = useState({
    color: "#e0e0e0",
    code: 0,
    content: "",
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const getDataCell = () => {
    axios
      .get(`http://localhost:8000/api/cell/${id}`)
      .then((response) => {
        const data = response.data;
        const originalCellUsers = data.users;

        const specialUser = originalCellUsers.find(
          (user) => user.id === userId
        );
        const otherUsers = originalCellUsers.filter(
          (user) => user.id !== userId
        );
        otherUsers.sort((a, b) => a.name.localeCompare(b.name));
        const sortedUsers = specialUser
          ? [specialUser, ...otherUsers]
          : otherUsers;

        setCellUsers(sortedUsers);
        setCellData(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const sendMessage = () => {
    let text = message.content.trim();
    if (text !== "") {
      setMessage({ ...message, content: text });
      let messageData = {
        idCell: id,
        idUser: userId,
        message: message.content,
        date: new Date(),
        typeMessage: message.code,
      };
      console.log("Mensaje enviado:");
      console.log(messageData);
    }
    setMessage({ ...message, content: "" });
  };

  const handleColorChange = (color, code) => {
    setMenuAnchorEl(null);
    if (code !== message.code) {
      setMessage({ ...message, code: code, color: color });
    } else {
      setMessage({ ...message, code: 0, color: "#e0e0e0" });
    }
  };

  useEffect(() => {
    getDataCell();
  }, [id]);

  const memoizedColorMap = useMemo(() => {
    const uniqueColors = generateUniqueColors(cellUsers.length);
    const colorMap = {};
    cellUsers.forEach((user, index) => {
      colorMap[user.id] = uniqueColors[index];
    });
    return colorMap;
  }, [cellUsers]);

  return (
    <Fragment>
      <Box
        sx={{
          borderRadius: "20px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flex: "1",
          padding: "15px 0px",
        }}
        noValidate
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            marginLeft: "auto",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cellData.name}
        </Typography>
        <Fab
          variant="extended"
          sx={{ marginLeft: "auto", marginRight: "2%", scale: "0.8" }}
          onClick={toggleDrawer(true)}
        >
          <SupervisedUserCircleIcon sx={{ scale: "2" }} />
        </Fab>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {cellUsers.map((user) => (
            <Fragment key={user.id}>
              <ListItem>
                {user.id === userId ? (
                  <Fragment>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          style={{ backgroundColor: memoizedColorMap[user.id] }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                    </ListItemButton>
                    <ListItemButton>
                      <HighlightOffIcon
                        onClick={() => console.log(user.id)} // Agrega un manejador para eliminar el usuario si es necesario
                        style={{
                          cursor: "pointer",
                          color: "red",
                          scale: "1.8",
                        }}
                      />
                    </ListItemButton>
                  </Fragment>
                ) : (
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        style={{ backgroundColor: memoizedColorMap[user.id] }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                )}
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          borderRadius: "20px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
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
            width: "97%",
            paddingLeft: "5px",
            paddingRight: "5px",
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
            // Establece una altura máxima para el scroll
            maxHeight: "calc(55vh)", // Puedes ajustar esta altura según tus necesidades
          }}
        >
          {/* Mensajes quemados */}
          <ChatMessage
            userId="0450194246"
            userName="Alejandra Escobar"
            content="Hola, ¿cómo están?"
            code={0}
            color={memoizedColorMap["0450194246"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1003450671"
            userName="Yanick De la Torre"
            content="¡Hola! Estoy bien, gracias."
            code={0}
            color={memoizedColorMap["1003450671"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1724146335"
            userName="Joel DelHierro"
            content="¿Qué tal están ustedes?"
            code={0}
            color={memoizedColorMap["1724146335"]}
            userLogged={userId}
          />
          <ChatMessage
            userId="0450194246"
            userName="Alejandra Escobar"
            content="Hola, ¿cómo están?"
            code={0}
            color={memoizedColorMap["0450194246"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1003450671"
            userName="Yanick De la Torre"
            content="¡Hola! Estoy bien, gracias."
            code={0}
            color={memoizedColorMap["1003450671"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1724146335"
            userName="Joel DelHierro"
            content="¿Qué tal están ustedes?"
            code={0}
            color={memoizedColorMap["1724146335"]}
            userLogged={userId}
          />
          <ChatMessage
            userId="0450194246"
            userName="Alejandra Escobar"
            content="Hola, ¿cómo están?"
            code={0}
            color={memoizedColorMap["0450194246"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1003450671"
            userName="Yanick De la Torre"
            content="¡Hola! Estoy bien, gracias."
            code={0}
            color={memoizedColorMap["1003450671"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1724146335"
            userName="Joel DelHierro"
            content="¿Qué tal están ustedes?"
            code={0}
            color={memoizedColorMap["1724146335"]}
            userLogged={userId}
          />
          <ChatMessage
            userId="0450194246"
            userName="Alejandra Escobar"
            content="Hola, ¿cómo están?"
            code={0}
            color={memoizedColorMap["0450194246"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1003450671"
            userName="Yanick De la Torre"
            content="¡Hola! Estoy bien, gracias."
            code={0}
            color={memoizedColorMap["1003450671"]}
            userLogged={userId}
          />

          <ChatMessage
            userId="1724146335"
            userName="Joel DelHierro"
            content="¿Qué tal están ustedes?"
            code={0}
            color={memoizedColorMap["1724146335"]}
            userLogged={userId}
          />
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: "20px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          width: "100%",
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
            backgroundColor: message.color,
            scale: "0.8",
            margin: "0px 5px",
          }}
          onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        >
          <AddIcon />
        </Fab>

        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={() => setMenuAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {actions.map((action) => (
            <MenuItem
              key={action.name}
              onClick={() => handleColorChange(action.color, action.code)}
            >
              {action.icon}
              {action.name}
            </MenuItem>
          ))}
        </Menu>

        <TextField
          id="standard-multiline-static"
          label=""
          multiline
          maxRows={4}
          placeholder="Mensaje"
          variant="standard"
          InputProps={{
            style: {
              color: "black",
            },
          }}
          sx={{
            flexGrow: 1,
            margin: "5px 5px 5px 5px",
          }}
          value={message.content}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
        />

        {/* Botón para enviar mensaje */}
        <Fab
          variant="extended"
          sx={{
            scale: "0.8",
            margin: "0px 5px",
            rotate: "90deg",
          }}
          onClick={sendMessage}
        >
          <NavigationIcon />
        </Fab>
      </Box>
    </Fragment>
  );
};

export default Chat;
