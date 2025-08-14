import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log error to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                maxWidth: 500,
                width: '100%',
              }}
            >
              <ErrorIcon
                sx={{
                  fontSize: 64,
                  color: 'error.main',
                  mb: 2,
                }}
              />
              
              <Typography variant="h4" component="h1" gutterBottom>
                Oops! Something went wrong
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
              </Typography>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    textAlign: 'left',
                    maxHeight: 200,
                    overflow: 'auto',
                  }}
                >
                  <Typography variant="caption" component="pre" sx={{ fontFamily: 'monospace' }}>
                    {this.state.error.toString()}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={this.handleReset}
                  sx={{ minWidth: 120 }}
                >
                  Try Again
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={this.handleReload}
                  sx={{ minWidth: 120 }}
                >
                  Reload Page
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
