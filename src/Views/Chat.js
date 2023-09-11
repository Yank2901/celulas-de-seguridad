import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
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
import { generateUniqueColors } from "../Functions/validateFunctions";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8000");

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
  const [cellMessages, setCellMessages] = useState([]);
  const userId = props.userData ? props.userData.id : null;
  const [message, setMessage] = useState({
    color: "#e0e0e0",
    code: "0",
    content: "",
  });
  const navigate = useNavigate();

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

  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("mensaje-confirmado", (data) => {
      setCellMessages((prevState) => [
        ...prevState,
        {
          idCell: data.idCell,
          idUser: data.idUser,
          nameUser: data.nameUser,
          message: data.message,
          date: data.date,
          typeMessage: data.typeMessage,
        },
      ]);
      scrollToBottom();
    });

    socket.on("usuarios-actualizados", (data) => {
      setCellUsers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      });
  };

  const getMessages = () => {
    axios
      .get(`http://localhost:8000/api/chats/${id}`)
      .then((response) => {
        const data = response.data;
        setCellMessages(data);
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert(
          "Error al cargar el formulario. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const hanleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8000/api/cell//deleteUser/${id}/${userId}`)
      .then((response) => {
        const data = response.data;
        setCellUsers(data);
        sendExitMessage();
        navigate("/my-cells");
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  const sendExitMessage = () => {
    axios
      .post("http://localhost:8000/api/chat/new", {
        idCell: id,
        idUser: userId,
        nameUser: props.userData.name + " " + props.userData.lastName,
        message: "Se ha retirado de la celula de seguridad.",
        date: new Date(),
        typeMessage: 1,
      })
      .then((_) => {
        console.log("Mensaje de salida enviado");
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  const sendMessage = () => {
    let text = message.content.trim();
    if (text !== "") {
      socket.emit("mensaje", {
        idCell: id,
        idUser: userId,
        nameUser: props.userData.name + " " + props.userData.lastName,
        message: text,
        date: new Date(),
        typeMessage: message.code,
      });
    }
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
    getMessages();
  }, [id]);

  const memorizedColorMap = useMemo(() => {
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
                          style={{
                            backgroundColor: memorizedColorMap[user.id],
                          }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                    </ListItemButton>
                    <ListItemButton>
                      <HighlightOffIcon
                        onClick={() => hanleDeleteUser(user.id)}
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
                        style={{ backgroundColor: memorizedColorMap[user.id] }}
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
      >
        <Box
          ref={messageContainerRef}
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
            maxHeight: "calc(55vh)",
          }}
        >
          {cellMessages.map((message, index) => (
            <ChatMessage
              key={index}
              userId={message.idUser}
              userName={message.nameUser}
              content={message.message}
              code={message.typeMessage}
              color={memorizedColorMap[message.idUser]}
              userLogged={userId}
            />
          ))}
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
