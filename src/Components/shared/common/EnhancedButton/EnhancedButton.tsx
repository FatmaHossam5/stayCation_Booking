import React from 'react';
import { Button, ButtonProps, Tooltip, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface EnhancedButtonProps extends Omit<ButtonProps, 'sx'> {
  tooltip?: string;
  enhancedSx?: SxProps<Theme>;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'enhancedSx',
})<EnhancedButtonProps>(({ theme, variant = 'primary' }) => ({
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  
  ...(variant === 'primary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  
  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
  
  ...(variant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  
  ...(variant === 'outline' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }),
}));

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  tooltip,
  enhancedSx,
  variant = 'primary',
  ...props
}) => {
  const buttonElement = (
    <StyledButton
      variant={variant === 'outline' ? 'outlined' : 'contained'}
      enhancedSx={enhancedSx}
      {...props}
      sx={{
        px: 3,
        py: 1.5,
        ...enhancedSx,
      }}
    >
      {children}
    </StyledButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow placement="top">
        {buttonElement}
      </Tooltip>
    );
  }

  return buttonElement;
};

export default EnhancedButton;
