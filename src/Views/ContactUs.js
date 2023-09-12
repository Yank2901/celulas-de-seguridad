import React, { Fragment } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Dev1 from "../Images/dev1.jpg";
import Dev2 from "../Images/dev2.png";
import Dev3 from "../Images/dev3.png";

// Importa los íconos de lenguajes de programación que desees utilizar
import html from "../Images/html.png";
import css from "../Images/css.png";
import js from "../Images/js.png";
import react from "../Images/react.png";
import mongo from "../Images/mongo.png";
import swift from "../Images/swift.png";
import objectiveC from "../Images/objective.png";

const AboutUs = () => {
  // Crear un arreglo con la información de los creadores
  const creators = [
    {
      name: "Consuelo Escobar",
      career: "Ingeniería en Tecnologías de la Información",
      experience: [html, css, js, react, mongo],
      github: "",
      linkedin: "",
      whatsapp: "+593968063144",
      image: Dev3,
    },
    {
      name: "Joel Del Hierro",
      career: "Ingeniería en Tecnologías de la Información",
      experience: [html, css, js, react, mongo],
      github: "",
      linkedin: "",
      whatsapp: "+593963610557",
      image: Dev1,
    },
    {
      name: "Yanick De la Torre",
      career: "Ingeniería en Tecnologías de la Información",
      experience: [swift, objectiveC, html, css, js, react, mongo],
      github: "https://github.com/Yank2901?tab=repositories",
      linkedin: "https://www.linkedin.com/in/yanick-dela-torre-1baaa91ab/",
      whatsapp: "+593963057729",
      image: Dev2,
    },
  ];

  return (
    <Fragment>
      <Grid container spacing={2}>
        {creators.map((creator, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <Card style={{ boxShadow: "20px 10px 15px rgba(0, 0, 0, 0.1)" }}>
              <CardMedia
                component="img"
                image={creator.image}
                alt={creator.name}
                sx={{ height: "250px", p: 1, objectFit: "scale-down" }}
              />
              <CardContent style={{background: "#d5fafc"}}>
                <Typography variant="h6">{creator.name}</Typography>
                <Typography variant="subtitle1">{creator.career}</Typography>
                <div>
                  <div style={{ display: "flex" }}>
                    {creator.experience.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`Language ${i + 1}`}
                        style={{ height: "24px", marginRight: "8px" }}
                      />
                    ))}
                  </div>
                  <div>
                    {creator.github && (
                      <IconButton
                        aria-label="GitHub"
                        href={creator.github}
                        target="_blank"
                      >
                        <GitHubIcon />
                      </IconButton>
                    )}
                    {creator.linkedin && (
                      <IconButton
                        aria-label="LinkedIn"
                        href={creator.linkedin}
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="WhatsApp"
                      href={`https://wa.me/${creator.whatsapp}`}
                      target="_blank"
                    >
                      <WhatsAppIcon />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default AboutUs;
