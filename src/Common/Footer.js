import React from 'react';
import { styled } from '@mui/material/styles';
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HomeIcon from '@mui/icons-material/Home';
import { Typography, Box, Button } from '@mui/material';




const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto',
  backgroundColor: "#07090A",
  color: theme.palette.primary.contrastText,
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
       <Box>
        <Typography variant="body1"
         sx={{      
           color: "#FFF",
           marginLeft: "5px",
           fontWeight: "bold",
         }}
         >
         <HealthAndSafetyIcon sx={{ fontSize: "17px", color: "#FE9A22" }} /> 
        SECURITY CELLS
         </Typography>
      </Box>
      <Box>
      <Typography sx={{
           fontSize: "10px",   
           color: "#FFF",
           marginLeft: "5px",
         }} 
      >Integrantes: Yannick De La Torre, Joel del Hierrro, Alejandra Escobar.</Typography>
      </Box>
      <Box>
      <Button href='/'><HomeIcon sx={{ fontSize: "15px", color: "#FFF" }} /></Button> 
      </Box>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
