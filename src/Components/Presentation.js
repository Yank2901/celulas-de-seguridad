import React from "react";
import { Typography, Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

const Presentation = () => {
let navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Typography variant="h2"padding={10} >
          Security Cells
        </Typography>
        <Typography variant="body1" padding={10} >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem30
        </Typography>
        <Button  onClick={()=> navigate("/login")} sx={{
          color: "#F1E4FF",
          backgroundColor: "#8C30F5",
          marginLeft:"85px",
          "&:hover": {
            color: "#F1E4FF",
            backgroundColor: "#8C30F5",
            transform: "scale(1.1)",
        }}}>Inicio sesión</Button>


      </Box>
      <Box padding={10}>
        <LoginIcon sx={{ width:"200px",height:"400px" }}></LoginIcon>

      </Box>
    </Box>
  );
};

export default Presentation;
