import React from 'react';
import { Box, Typography, Button, SxProps } from '@mui/material';
import { FolderOpen, Search, Add } from '@mui/icons-material';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'search' | 'add';
  sx?: SxProps;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  variant = 'default',
  sx = {},
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search sx={{ fontSize: 64, color: 'text.secondary' }} />;
      case 'add':
        return <Add sx={{ fontSize: 64, color: 'text.secondary' }} />;
      default:
        return <FolderOpen sx={{ fontSize: 64, color: 'text.secondary' }} />;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={6}
      px={2}
      sx={sx}
    >
      {icon || getDefaultIcon()}
      
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        {title}
      </Typography>
      
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mb: 3 }}
        >
          {description}
        </Typography>
      )}
      
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          startIcon={variant === 'add' ? <Add /> : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
