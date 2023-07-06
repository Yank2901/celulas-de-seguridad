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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500sLorem30
            </Typography>
            <FaceIcon sx={{ fontSize: "50px", color: "#1e90ff" }}></FaceIcon>
            <Typography variant="body1" color="black">
              Usuario1
            </Typography>
            <Typography variant="body1" color="black">
              Comisión A1
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Typography>
            <Face2Icon sx={{ fontSize: "50px", color: "#1e90ff" }}></Face2Icon>
            <Typography variant="body1" color="black">
              Usuario2
            </Typography>
            <Typography variant="body1" color="black">
              Comisión B1
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Typography>
            <Face3Icon sx={{ fontSize: "50px", color: "#1e90ff" }}></Face3Icon>
            <Typography variant="body1" color="black">
              Usuario3
            </Typography>
            <Typography variant="body1" color="black">
              Comisión C1
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
