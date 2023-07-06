import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";

export default function Comment() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{
          fontWeight: "bolder",
          margin: "4%",
        }}
      >
        Nuestros usuarios hablan
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            flex:'1',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: '10px'
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Diseño intuitivo
            </Typography>
            <Typography variant="body1" color="black" margin={3}>
              Para iniciar sesión, buscar células o acceder a mis células lo puedo realizar en la parte superior de la pestaña, se puede visualizar fácilmente estas opciones de menú.
            </Typography>
            <FaceIcon sx={{ fontSize: "50px", color: "#1e90ff" }}></FaceIcon>
            <Typography variant="body1" color="black">
              Pedro Gómez
            </Typography>
            <Typography variant="body1" color="black">
              Bellavista Alta
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex:'1',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: '10px'
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Fácil de utilizar
            </Typography>
            <Typography variant="body1" color="black" margin={3}>
              Puedo acceder al chat de mis célula en una sola página y publicar mensajes como en cualquier aplicación de mensajería.
            </Typography>
            <Face2Icon sx={{ fontSize: "50px", color: "#1e90ff" }}></Face2Icon>
            <Typography variant="body1" color="black">
              Luisa Méndez
            </Typography>
            <Typography variant="body1" color="black">
              La Vicentina
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Servicio útil y práctico
            </Typography>
            <Typography variant="body1" color="black" margin={3}>
              Puedo alertar a los miembros de la células de mi barrio de forma más rápida con el envío se mensajes ya que esta aplicación se enfoca en mi barrio.
            </Typography>
            <Face3Icon sx={{ fontSize: "50px", color: "#1e90ff" }}></Face3Icon>
            <Typography variant="body1" color="black">
            </Typography>
            Natalia López
            <Typography variant="body1" color="black">
            San Fernando

            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
