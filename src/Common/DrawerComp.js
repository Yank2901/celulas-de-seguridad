import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import pages from "../Data/Pages.json";
import { ListItemButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;

const DrawerComp = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  /*
  const handlerCloseSesion = () => {
    const needRemember = localStorage.getItem("remember");

    if (needRemember==="true") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem('remember');
    } else {
      localStorage.removeItem("rememberedUser");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem('remember');
    }
    setOpenDrawer(false);
  };
  */
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.map((page, index) => (
            <ListItem
              key={index}
              component={NavLink}
              to={page.path}
              onClick={handleDrawerClose}
            >
              <ListItemButton>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {props.isLoggedIn ? (
          <>
            <List>
              <ListItem
                key="myprofile"
                component={NavLink}
                to={"/"}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemButton>
                  <ListItemText primary={"MI PERFIL"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                key="logOut"
                component={NavLink}
                to={"/"}
                onClick={handleDrawerClose}
              >
                <ListItemButton>
                  <ListItemText primary={"CERRAR SESIÓN"} />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          <List>
            <ListItem
              key="login"
              component={NavLink}
              to={"/login"}
              onClick={handleDrawerClose}
            >
              <ListItemButton>
                <ListItemText primary={"INICIAR SESIÓN"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="register"
              component={NavLink}
              to={"/register"}
              onClick={handleDrawerClose}
            >
              <ListItemButton>
                <ListItemText primary={"REGISTRATE"} />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>

      <IconButton
        sx={{ color: "#8C30F5", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
