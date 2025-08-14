import React from 'react';
import { Container, ContainerProps, styled } from '@mui/material';

interface ResponsiveContainerProps extends ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  centered?: boolean;
}

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => !['spacing', 'centered'].includes(prop as string),
})<ResponsiveContainerProps>(({ theme, spacing = 'medium', centered = true }) => ({
  // Responsive padding
  paddingLeft: theme.spacing(
    spacing === 'none' ? 0 :
    spacing === 'small' ? 2 :
    spacing === 'medium' ? { xs: 2, sm: 3, md: 4 } :
    spacing === 'large' ? { xs: 3, sm: 4, md: 6 } : 3
  ),
  paddingRight: theme.spacing(
    spacing === 'none' ? 0 :
    spacing === 'small' ? 2 :
    spacing === 'medium' ? { xs: 2, sm: 3, md: 4 } :
    spacing === 'large' ? { xs: 3, sm: 4, md: 6 } : 3
  ),
  
  // Responsive vertical padding
  paddingTop: theme.spacing(
    spacing === 'none' ? 0 :
    spacing === 'small' ? 2 :
    spacing === 'medium' ? { xs: 2, md: 4 } :
    spacing === 'large' ? { xs: 3, md: 6 } : 3
  ),
  paddingBottom: theme.spacing(
    spacing === 'none' ? 0 :
    spacing === 'small' ? 2 :
    spacing === 'medium' ? { xs: 2, md: 4 } :
    spacing === 'large' ? { xs: 3, md: 6 } : 3
  ),
  
  // Centering
  ...(centered && {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }),
  
  // Smooth transitions
  transition: 'all 0.3s ease',
  
  // Mobile optimizations
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  spacing = 'medium',
  centered = true,
  maxWidth = 'lg',
  ...props
}) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      spacing={spacing}
      centered={centered}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default ResponsiveContainer;
