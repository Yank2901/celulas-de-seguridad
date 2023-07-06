import { Box, Typography } from "@mui/material";
import { React, Fragment } from "react";
import EngineeringIcon from '@mui/icons-material/Engineering';

const MyProfile = () => {
  return (
    <Fragment>
      <Box
        sx={{
          borderRadius: '20px',
          backgroundColor: '#C1E5C0',
          width: '100%', // Agregar esta línea para ocupar todo el espacio disponible verticalmente
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex:'1',
        }}
        noValidate
        autoComplete="on"
      >
        <Typography
          variant="h2" 
          gutterBottom
          sx={{
            color: 'var(--text-gray-900, #18191F)',
            fontSize: '30px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '800',
            lineHeight: '54px',
          }}
        >
          ESTAMOS EN CONSTRUCCION
        </Typography>
        <Typography
          variant="h1" 
          gutterBottom
          sx={{
            color: 'var(--text-gray-900, #18191F)',
            fontSize: '70px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '800',
            lineHeight: '94px',
          }}
        >
          PROXIMAMENTE
        </Typography>
        <EngineeringIcon
          sx={{
            color: 'var(--text-gray-900, #18191F)',
            width: '20%',
            height: 'auto',
          }}
        />
      </Box>
    </Fragment>
  );
};

export default MyProfile;
