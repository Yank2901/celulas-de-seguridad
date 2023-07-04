import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import LoginIcon from '@mui/icons-material/Login';

export default function Steps() {
  return (
    <div style={{display:'flex', flexDirection:'column', width: '100%', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
      
      <Typography gutterBottom variant="h4" component="div"
      
      sx={{
        fontWeight: 'bolder',
        margin:'4%'
      }}
      
      >
            ¿Cómo funciona?
      </Typography>

      <div style={{display:'flex', flexDirection:'row', width: '100%', justifyContent:'center', alignItems:'center'}}>

        <Card sx={{width: '30%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <LoginIcon sx={{ fontSize: "125px", color: "#1e90ff" }}></LoginIcon>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Accede a tu cuenta
            </Typography>
            <Typography variant="body1" color="black">
              Registrate o inicia sesión
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{width: '30%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <LocationOnIcon sx={{ fontSize: "125px", color: "#1e90ff" }}></LocationOnIcon>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Busca tu localidad
            </Typography>
            <Typography variant="body1" color="black">
              Encuentra tu barrio y accede a una célula
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{width: '30%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <NotificationImportantIcon sx={{ fontSize: "125px", color: "#1e90ff" }}></NotificationImportantIcon>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Publica y notifica
            </Typography>
            <Typography variant="body1" color="black">
              Comunícate con las personas de tu localidad
            </Typography>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}