import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  SxProps,
  Theme,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface EnhancedModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  enhancedSx?: SxProps<Theme>;
  backdropProps?: {
    blur?: boolean;
    opacity?: number;
  };
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  showCloseButton = true,
  enhancedSx,
  backdropProps = { blur: true, opacity: 0.4 },
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getModalWidth = () => {
    const widthMap = {
      xs: { xs: '95%', sm: 400 },
      sm: { xs: '95%', sm: 500 },
      md: { xs: '95%', sm: 600, md: 800 },
      lg: { xs: '95%', sm: 700, md: 900, lg: 1000 },
      xl: { xs: '95%', sm: 800, md: 1000, lg: 1200 },
    };
    return widthMap[maxWidth];
  };

  const modalStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: getModalWidth(),
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    p: { xs: 2, sm: 3, md: 4 },
    ...enhancedSx,
  };

  const backdropStyle = {
    '& .MuiBackdrop-root': {
      backdropFilter: backdropProps.blur ? 'blur(4px)' : 'none',
      backgroundColor: `rgba(0, 0, 0, ${backdropProps.opacity})`,
      transition: 'all 0.3s ease',
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="enhanced-modal-title"
      aria-describedby="enhanced-modal-description"
      sx={backdropStyle}
    >
      <Box sx={modalStyle}>
        {/* Header */}
        {(title || showCloseButton) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {title && (
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                {title}
              </Typography>
            )}
            
            {showCloseButton && (
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'text.primary',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
                aria-label="Close modal"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        )}

        {/* Content */}
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default EnhancedModal;
