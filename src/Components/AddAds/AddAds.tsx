
import {
  Add,
  ArrowBack,
  Campaign,
  CheckCircle,
  Discount,
  Home,
  Info,
  Room,
  ToggleOff,
  ToggleOn,
  Warning
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import useRooms from "../../custom Hook/useRooms";

interface FormData {
  room: string;
  discount: number;
  isActive: boolean;
}

const AddAds: React.FC = () => {
  const navigate = useNavigate();
  const { baseUrl} = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  const { rooms} = useRooms();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      room: "",
      discount: 0,
      isActive: true
    }
  });

  const watchedRoom = watch("room");
  const watchedDiscount = watch("discount");
  const watchedIsActive = watch("isActive");

  // Enhanced steps with validation
  const steps = [
    {
      label: "Select Room",
      description: "Choose a room to promote",
      isValid: () => !!watchedRoom,
      icon: <Room />
    },
    {
      label: "Set Discount",
      description: "Define the discount percentage",
      isValid: () => watchedDiscount > 0 && watchedDiscount <= 100,
      icon: <Discount />
    },
    {
      label: "Configure Status",
      description: "Set advertisement status",
      isValid: () => true,
      icon: watchedIsActive ? <ToggleOn /> : <ToggleOff />
    }
  ];

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/admin/ads`, {
        method: "POST",
        headers: {
          'Authorization': `${localStorage.getItem("userToken")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        getToastValue("success", "Advertisement created successfully!");
        reset();
        navigate("/dashboard/ads");
      } else {
        const errorData = await response.json();
        getToastValue("error", errorData.message || "Failed to create advertisement");
      }
    } catch (error) {
      getToastValue("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/ads");
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Card sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#dbeafe', color: '#0ea5e9' }}>
                  <Room />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="#374151" fontWeight={600}>
                    Select Room for Promotion
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Choose which room you'd like to promote with a discount
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="#374151" fontWeight={600} sx={{ mb: 1 }}>
                  Available Rooms
                </Typography>
                <Controller
                  name="room"
                  control={control}
                  rules={{ required: 'Room selection is required' }}
                  render={({ field }) => (
                                         <Select
                       {...field}
                       error={Boolean(errors.room)}
                       sx={{
                        '& .MuiSelect-select': {
                          padding: '1rem',
                          fontWeight: 500,
                          color: '#374151'
                        },
                        '& .MuiSelect-icon': { color: '#6b7280' },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e5e7eb'
                        },
                        bgcolor: '#f9fafb',
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#d1d5db',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                        },
                        '&.Mui-focused': {
                          borderColor: '#3b82f6',
                          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Typography color="#9ca3af">Choose a room to promote</Typography>
                      </MenuItem>
                      {rooms?.map((room) => (
                        <MenuItem key={room?._id} value={room?._id}>
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body1" fontWeight={600} color="#374151">
                              Room {room?.roomNumber}
                            </Typography>
                            <Typography variant="caption" color="#6b7280" sx={{ display: 'block', mt: 0.5 }}>
                              ${room?.price}/night • {room?.capacity} guests
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.room && (
                  <Typography color="#ef4444" variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 500 }}>
                    {errors.room.message}
                  </Typography>
                )}
              </FormControl>

              {/* Room Preview */}
              {watchedRoom && (
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ 
                    borderRadius: 2,
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    '& .MuiAlert-icon': { color: '#0ea5e9' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#dbeafe', color: '#0ea5e9', width: 40, height: 40 }}>
                      {rooms?.find(r => r._id === watchedRoom)?.roomNumber}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="#0c4a6e">
                        Selected: Room {rooms?.find(r => r._id === watchedRoom)?.roomNumber}
                      </Typography>
                      <Typography variant="caption" color="#0369a1">
                        ${rooms?.find(r => r._id === watchedRoom)?.price}/night • {rooms?.find(r => r._id === watchedRoom)?.capacity} guests
                      </Typography>
                    </Box>
                  </Box>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#fef3c7', color: '#d97706' }}>
                  <Discount />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="#374151" fontWeight={600}>
                    Set Discount Percentage
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Define how much discount to offer on this room
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="#374151" fontWeight={600} sx={{ mb: 1 }}>
                  Discount Percentage
                </Typography>
                <Controller
                  name="discount"
                  control={control}
                  rules={{ 
                    required: 'Discount is required',
                    min: { value: 1, message: 'Minimum discount is 1%' },
                    max: { value: 100, message: 'Maximum discount is 100%' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      InputLabelProps={{
                        style: { color: '#6b7280' },
                      }}
                      InputProps={{
                        style: { 
                          color: '#374151',
                          fontSize: '1rem',
                          fontWeight: 500
                        },
                        endAdornment: (
                          <Typography color="#6b7280" sx={{ mr: 1, fontWeight: 500 }}>
                            %
                          </Typography>
                        ),
                        inputProps: { 
                          min: 1, 
                          max: 100,
                          step: 1
                        }
                      }}
                      sx={{
                        '& .MuiFilledInput-root': {
                          bgcolor: '#f9fafb',
                          borderRadius: 2,
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: '#d1d5db',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                          },
                          '&.Mui-focused': {
                            borderColor: '#3b82f6',
                            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                          }
                        },
                        '& .MuiFilledInput-underline:before': {
                          borderBottom: 'none'
                        },
                        '& .MuiFilledInput-underline:after': {
                          borderBottom: 'none'
                        },
                        '& .MuiInputLabel-root': {
                          color: '#6b7280',
                          fontWeight: 500
                        }
                      }}
                      variant="filled"
                      label="Enter discount percentage"
                      error={Boolean(errors.discount)}
                      helperText={errors.discount?.message}
                    />
                  )}
                />
              </FormControl>

              {/* Discount Preview */}
              {watchedDiscount && watchedDiscount > 0 && (
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ 
                    borderRadius: 2,
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    '& .MuiAlert-icon': { color: '#f59e0b' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#fef3c7', color: '#d97706', width: 40, height: 40 }}>
                      {watchedDiscount}%
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="#92400e">
                        {watchedDiscount}% discount will be applied
                      </Typography>
                      <Typography variant="caption" color="#a16207">
                        This will reduce the room price by {watchedDiscount}%
                      </Typography>
                    </Box>
                  </Box>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: watchedIsActive ? '#d1fae5' : '#fee2e2', color: watchedIsActive ? '#059669' : '#dc2626' }}>
                  {watchedIsActive ? <ToggleOn /> : <ToggleOff />}
                </Avatar>
                <Box>
                  <Typography variant="h6" color="#374151" fontWeight={600}>
                    Configure Advertisement Status
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Set whether this advertisement should be active or inactive
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="#374151" fontWeight={600} sx={{ mb: 1 }}>
                  Advertisement Status
                </Typography>
                <Controller
                  name="isActive"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <Select
                      {...field}
                      error={Boolean(errors.isActive)}
                      sx={{
                        '& .MuiSelect-select': {
                          padding: '1rem',
                          fontWeight: 500,
                          color: '#374151'
                        },
                        '& .MuiSelect-icon': { color: '#6b7280' },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e5e7eb'
                        },
                        bgcolor: '#f9fafb',
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#d1d5db',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                        },
                        '&.Mui-focused': {
                          borderColor: '#3b82f6',
                          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                        }
                      }}
                    >
                      <MenuItem value="true">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Chip 
                            label="Active" 
                            size="small" 
                            color="success" 
                            variant="outlined"
                            sx={{ borderColor: '#10b981', color: '#10b981' }}
                          />
                          <Typography sx={{ fontWeight: 500, color: '#374151' }}>
                            Advertisement is live and visible to visitors
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="false">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Chip 
                            label="Inactive" 
                            size="small" 
                            color="default" 
                            variant="outlined"
                            sx={{ borderColor: '#6b7280', color: '#6b7280' }}
                          />
                          <Typography sx={{ fontWeight: 500, color: '#374151' }}>
                            Advertisement is paused and hidden from visitors
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  )}
                />
                {errors.isActive && (
                  <Typography color="#ef4444" variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 500 }}>
                    {errors.isActive.message}
                  </Typography>
                )}
              </FormControl>

              {/* Status Preview */}
              <Alert 
                severity={watchedIsActive ? "success" : "warning"}
                icon={watchedIsActive ? <CheckCircle /> : <Warning />}
                sx={{ 
                  borderRadius: 2,
                  background: watchedIsActive ? '#f0fdf4' : '#fffbeb',
                  border: watchedIsActive ? '1px solid #86efac' : '1px solid #fde68a',
                  '& .MuiAlert-icon': { 
                    color: watchedIsActive ? '#10b981' : '#f59e0b' 
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: watchedIsActive ? '#d1fae5' : '#fef3c7', 
                    color: watchedIsActive ? '#059669' : '#d97706', 
                    width: 40, 
                    height: 40 
                  }}>
                    {watchedIsActive ? 'ON' : 'OFF'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} 
                      color={watchedIsActive ? "#166534" : "#92400e"}>
                      This advertisement will be {watchedIsActive ? 'active' : 'inactive'} when created
                    </Typography>
                    <Typography variant="caption" 
                      color={watchedIsActive ? "#15803d" : "#a16207"}>
                      {watchedIsActive ? 'Visitors will see this promotion' : 'Promotion will be hidden from visitors'}
                    </Typography>
                  </Box>
                </Box>
              </Alert>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#f8fafc',
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link 
              color="inherit" 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                textDecoration: 'none',
                color: '#6b7280',
                '&:hover': { color: '#374151' }
              }}
            >
              <Home fontSize="small" />
              Home
            </Link>
            <Link 
              color="inherit" 
              href="/ads" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                textDecoration: 'none',
                color: '#6b7280',
                '&:hover': { color: '#374151' }
              }}
            >
              <Campaign fontSize="small" />
              Advertisements
            </Link>
            <Typography color="#374151" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Add fontSize="small" />
              Create New
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton 
              onClick={handleBack}
              sx={{ 
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                '&:hover': { 
                  backgroundColor: '#f3f4f6',
                  color: '#374151'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" color="#374151" fontWeight={700} gutterBottom>
                Create New Advertisement
              </Typography>
              <Typography variant="body1" color="#6b7280">
                Add a new room promotion or discount to attract more bookings
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={0}
              sx={{
                background: '#ffffff',
                borderRadius: 3,
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
              }}
            >
              {/* Stepper Header */}
              <Box sx={{ 
                p: 3, 
                background: '#f9fafb', 
                borderBottom: '1px solid #e5e7eb'
              }}>
                <Stepper 
                  activeStep={activeStep} 
                  orientation={isMobile ? "vertical" : "horizontal"}
                  sx={{
                    '& .MuiStepLabel-label': { 
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    },
                    '& .MuiStepIcon-root': {
                      color: '#3b82f6',
                      fontSize: '1.5rem'
                    },
                    '& .MuiStepIcon-root.Mui-completed': {
                      color: '#10b981'
                    },
                    '& .MuiStepIcon-root.Mui-active': {
                      color: '#3b82f6'
                    }
                  }}
                >
                                     {steps.map((step) => (
                     <Step key={step.label}>
                       <StepLabel>
                         {isMobile ? (
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                             {step.icon}
                             {step.label}
                           </Box>
                         ) : (
                           step.label
                         )}
                       </StepLabel>
                     </Step>
                   ))}
                </Stepper>
              </Box>

              {/* Form Content */}
              <Box sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {getStepContent(activeStep)}

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      variant="outlined"
                      sx={{
                        color: '#6b7280',
                        borderColor: '#d1d5db',
                        '&:hover': {
                          borderColor: '#9ca3af',
                          backgroundColor: '#f9fafb',
                          color: '#374151'
                        },
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Previous
                    </Button>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {activeStep < steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={() => setActiveStep((prev) => prev + 1)}
                          disabled={!steps[activeStep].isValid()}
                          sx={{
                            background: '#3b82f6',
                            color: 'white',
                            '&:hover': {
                              background: '#2563eb',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            },
                            '&:disabled': {
                              background: '#f3f4f6',
                              color: '#9ca3af',
                              transform: 'none',
                              boxShadow: 'none'
                            },
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 500,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading || !steps.every(step => step.isValid())}
                          startIcon={loading ? null : <Add />}
                          sx={{
                            background: '#10b981',
                            color: 'white',
                            '&:hover': {
                              background: '#059669',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                            },
                            '&:disabled': {
                              background: '#f3f4f6',
                              color: '#9ca3af',
                              transform: 'none',
                              boxShadow: 'none'
                            },
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: '1rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{
                                width: 18,
                                height: 18,
                                border: '2px solid transparent',
                                borderTop: '2px solid currentColor',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }} />
                              Creating...
                            </Box>
                          ) : 'Create Advertisement'}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Progress Card */}
              <Card sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Typography variant="h6" color="#374151" fontWeight={600} gutterBottom>
                    Progress Summary
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {steps.map((step, index) => (
                      <Box 
                        key={step.label} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2, 
                          mb: 1.5,
                          opacity: index <= activeStep ? 1 : 0.5
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: index < activeStep ? '#10b981' : 
                                     index === activeStep ? '#3b82f6' : '#e5e7eb',
                            color: index <= activeStep ? 'white' : '#9ca3af'
                          }}
                        >
                          {index < activeStep ? <CheckCircle /> : step.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500} color="#374151">
                            {step.label}
                          </Typography>
                          <Typography variant="caption" color="#6b7280">
                            {step.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="#6b7280">
                    {activeStep + 1} of {steps.length} steps completed
                  </Typography>
                </CardContent>
              </Card>

              {/* Preview Card */}
              {(watchedRoom || watchedDiscount > 0) && (
                <Card sx={{ border: '1px solid #e5e7eb' }}>
                  <CardContent>
                    <Typography variant="h6" color="#374151" fontWeight={600} gutterBottom>
                      Advertisement Preview
                    </Typography>
                    <Box sx={{ space: 2 }}>
                      {watchedRoom && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: '#dbeafe', color: '#0ea5e9' }}>
                            <Room />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600} color="#374151">
                              Room {rooms?.find(r => r._id === watchedRoom)?.roomNumber}
                            </Typography>
                            <Typography variant="caption" color="#6b7280">
                              ${rooms?.find(r => r._id === watchedRoom)?.price}/night
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      
                      {watchedDiscount > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: '#fef3c7', color: '#d97706' }}>
                            <Discount />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600} color="#374151">
                              {watchedDiscount}% Discount
                            </Typography>
                            <Typography variant="caption" color="#6b7280">
                              Save ${Math.round((rooms?.find(r => r._id === watchedRoom)?.price || 0) * watchedDiscount / 100)} per night
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: watchedIsActive ? '#d1fae5' : '#fee2e2', 
                          color: watchedIsActive ? '#059669' : '#dc2626' 
                        }}>
                          {watchedIsActive ? <ToggleOn /> : <ToggleOff />}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} color="#374151">
                            Status: {watchedIsActive ? 'Active' : 'Inactive'}
                          </Typography>
                          <Typography variant="caption" color="#6b7280">
                            {watchedIsActive ? 'Visible to visitors' : 'Hidden from visitors'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddAds;
