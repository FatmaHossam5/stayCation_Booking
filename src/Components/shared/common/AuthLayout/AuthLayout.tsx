import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  showLogo?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingTop?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  maxWidth: '100% !important',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  padding: theme.spacing(4),
  minHeight: 'auto',
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
  
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(3),
    borderRadius: 12,
    maxWidth: '550px',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5),
    borderRadius: 8,
    maxWidth: '500px',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: 8,
    margin: theme.spacing(1),
    maxWidth: '100%',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: theme.spacing(4),
  zIndex: 1,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.75rem',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#000000',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  
  // Responsive font sizes
  fontSize: '2.25rem', // 36px
  
  [theme.breakpoints.down('lg')]: {
    fontSize: '2rem', // 32px
  },
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.875rem', // 30px
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem', // 28px
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#666666',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  lineHeight: 1.5,
  marginBottom: theme.spacing(4),
  
  // Responsive font sizes
  fontSize: '1rem', // 16px
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9375rem', // 15px
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: theme.spacing(2),
  
  // Hide on mobile
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '90vh',
  height: 'auto',
  borderRadius: 20,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  objectFit: 'cover',
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
}));

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = 'Authentication',
  showLogo = true,
  maxWidth = 'xl',
  paddingTop = { xs: 8, sm: 10, md: 0 }
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <StyledContainer maxWidth={maxWidth}>
      {/* Logo */}
      {showLogo && (
        <LogoContainer>
          <Logo>
            <span style={{ color: '#3252DF' }}>Stay</span>cation.
          </Logo>
        </LogoContainer>
      )}

             <Grid
         container
         spacing={0}
         sx={{
           minHeight: '100vh',
           alignItems: 'center',
           justifyContent: 'center',
           width: '100%',
           margin: 0,
           pt: paddingTop
         }}
       >
                 {/* Form Section */}
         <Grid
           item
           xs={12}
           lg={6}
           sx={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
             px: { xs: 2, sm: 3, md: 4 },
             py: { xs: 2, sm: 3 },
             width: '100%'
           }}
         >
          <StyledPaper>
                         {/* Header */}
             <Box sx={{ mb: 2, textAlign: 'center' }}>
               <Title variant="h3">
                 {title}
               </Title>
               {subtitle && (
                 <Subtitle variant="body1">
                   {subtitle}
                 </Subtitle>
               )}
             </Box>

            {/* Form Content */}
            {children}
          </StyledPaper>
        </Grid>

        {/* Image Section - Hidden on mobile */}
        {image && !isMobile && (
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            <ImageContainer>
              <StyledImage
                src={image}
                alt={imageAlt}
              />
            </ImageContainer>
          </Grid>
        )}
      </Grid>
    </StyledContainer>
  );
};

export default AuthLayout;
