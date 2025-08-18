import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { useTheme, useMediaQuery } from '@mui/material';
import fooPhoto from '../../../assets/Staycation..svg';

// Styled components for better organization
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  marginTop: 'auto', // Push footer to bottom
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  cursor: 'pointer',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& img': {
    height: '40px',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '32px',
    },
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  '& .contact-item': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
}));

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerSections = [
    {
      title: 'For Beginners',
      links: [
        { text: 'New Account', href: '/signup' },
        { text: 'Start Booking a Room', href: '/rooms' },
        { text: 'Use Payments', href: '/payment-guide' },
      ],
    },
    {
      title: 'Explore Us',
      links: [
        { text: 'Our Careers', href: '/careers' },
        { text: 'Privacy', href: '/privacy' },
        { text: 'Terms & Conditions', href: '/terms' },
      ],
    },
  ];

  return (
    <FooterContainer component="footer" role="contentinfo">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <LogoContainer>
                <img src={fooPhoto} alt="Staycation Logo" />
              </LogoContainer>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  lineHeight: 1.6,
                  maxWidth: '280px',
                  [theme.breakpoints.down('md')]: {
                    maxWidth: '100%',
                  }
                }}
              >
                We kaboom your beauty holiday instantly and memorable.
              </Typography>
            </FooterSection>
          </Grid>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <FooterSection>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ 
                    fontWeight: 600,
                    marginBottom: theme.spacing(1),
                    fontSize: '1rem',
                  }}
                >
                  {section.title}
                </Typography>
                {section.links.map((link, linkIndex) => (
                  <FooterLink 
                    key={linkIndex}
                    href={link.href}
                    variant="body2"
                    sx={{ 
                      fontSize: '0.875rem',
                      padding: '4px 0',
                    }}
                  >
                    {link.text}
                  </FooterLink>
                ))}
              </FooterSection>
            </Grid>
          ))}

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  fontWeight: 600,
                  marginBottom: theme.spacing(1),
                  fontSize: '1rem',
                }}
              >
                Connect Us
              </Typography>
              <ContactInfo>
                <Box className="contact-item">
                  <Typography variant="body2">
                    support@staycation.id
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <Typography variant="body2">
                    021 - 2208 - 1996
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <Typography variant="body2">
                    Staycation, Kemang, Jakarta
                  </Typography>
                </Box>
              </ContactInfo>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Divider sx={{ marginY: theme.spacing(3) }} />
        <Box 
          sx={{ 
            textAlign: 'center',
            paddingTop: theme.spacing(2),
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.875rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.75rem',
              }
            }}
          >
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}


