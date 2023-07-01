import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Container } from '@mui/material';

const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Este es el contenido de mi footer.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
