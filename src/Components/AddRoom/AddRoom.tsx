import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Container, FormControl, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import Select from 'react-dropdown-select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import useFacilities from '../../custom Hook/useFacilities';
import useRooms from '../../custom Hook/useRooms';

// Enhanced form container styling
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  maxWidth: 800,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
  },
}));

// Enhanced section styling
const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
}));

// Enhanced file upload area
const FileUploadArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.primary.light + '08',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '12',
    borderColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
}));

export default function AddRoom() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [selectedValue, setSelectedValue] = React.useState<Array<{ value: string; label: string }>>([])
  const [imgs, setImgs] = React.useState<File | null>(null)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgs(e.target.files[0])
    }
  }
  const navigate = useNavigate();
  const { formattedFacilities } = useFacilities();
  const { refetchRooms } = useRooms();
  const{baseUrl}=React.useContext(AuthContext)

  const theme = createTheme({
    components: {
      MuiFilledInput: {
        styleOverrides: {
          underline: {
            '&:after': {
              borderBottom: 'none',
            },
            '&:before': {
              borderBottom: 'none',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: 16,
          },
        },
      },
    },
  });
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  {/*Add Room Function */ }

  const AddNewRoom = (data: any) => {
    const formattedSelected = selectedValue.map(({ value }) => value)
    axios.post(`${baseUrl}/admin/rooms`, { ...data, imgs: imgs, facilities: formattedSelected }, { headers: {
      'Authorization': `${localStorage.getItem('userToken')}`,
      'Content-Type': 'multipart/form-data'
    } }).then((response) => {
      toast.success("Added SuccessFully!")
      navigate('/dashboard/rooms')
      refetchRooms()
    }).catch((error) => {
      toast.error(error?.response?.data)
    })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        minHeight: '100vh',
        py: 4
      }}>
        <FormContainer elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              mb: 1
            }}>
              Add New Room
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details below to add a new room to your property
            </Typography>
          </Box>

          <FormControl component='form' sx={{ width: '100%' }} onSubmit={handleSubmit(AddNewRoom)}>
            <ThemeProvider theme={theme}>
              
              {/* Basic Information Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  mb: 3,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.light'
                }}>
                  Basic Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'text.secondary', fontWeight: 500 },
                      }}
                      sx={{ 
                        bgcolor: "#F7F7F7", 
                        '& .MuiFilledInput-root': {
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#f0f0f0',
                          },
                          '&.Mui-focused': {
                            bgcolor: '#ffffff',
                            boxShadow: '0 0 0 2px rgba(32, 63, 199, 0.2)',
                          },
                        },
                      }}
                      variant='filled'
                      label="Room Number"
                      fullWidth
                      error={Boolean(errors.roomNumber)}
                      helperText={errors.roomNumber && errors.roomNumber.type === "required" && "Room Number is required"}
                      {...register("roomNumber", { required: true })}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Pricing & Capacity Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  mb: 3,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.light'
                }}>
                  Pricing & Capacity
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'text.secondary', fontWeight: 500 },
                      }}
                      variant='filled'
                      sx={{ 
                        bgcolor: "#F7F7F7",
                        '& .MuiFilledInput-root': {
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#f0f0f0',
                          },
                          '&.Mui-focused': {
                            bgcolor: '#ffffff',
                            boxShadow: '0 0 0 2px rgba(32, 63, 199, 0.2)',
                          },
                        },
                      }}
                      label="Price"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      {...register("price", { required: true, valueAsNumber: true })}
                      error={Boolean(errors.price)}
                      helperText={errors.price && errors.price.type === "required" && "Price is required"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'text.secondary', fontWeight: 500 },
                      }}
                      sx={{ 
                        bgcolor: "#F7F7F7",
                        '& .MuiFilledInput-root': {
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#f0f0f0',
                          },
                          '&.Mui-focused': {
                            bgcolor: '#ffffff',
                            boxShadow: '0 0 0 2px rgba(32, 63, 199, 0.2)',
                          },
                        },
                      }}
                      variant='filled'
                      label="Capacity"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">👥</InputAdornment>,
                      }}
                      {...register("capacity", { required: true })}
                      error={Boolean(errors.capacity)}
                      helperText={errors.capacity && errors.capacity.type === "required" && "Capacity is required"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'text.secondary', fontWeight: 500 },
                      }}
                      sx={{ 
                        bgcolor: "#F7F7F7",
                        '& .MuiFilledInput-root': {
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#f0f0f0',
                          },
                          '&.Mui-focused': {
                            bgcolor: '#ffffff',
                            boxShadow: '0 0 0 2px rgba(32, 63, 199, 0.2)',
                          },
                        },
                      }}
                      variant='filled'
                      label="Discount (%)"
                      type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      {...register("discount", { required: true })}
                      error={Boolean(errors.discount)}
                      helperText={errors.discount && errors.discount.type === "required" && "Discount is required"}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Facilities Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  mb: 3,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.light'
                }}>
                  Facilities & Amenities
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Select the facilities available in this room
                      </Typography>
                    </Box>
                    <Select
                      options={formattedFacilities}
                      values={selectedValue}
                      onChange={(selectedValue) => setSelectedValue(selectedValue)}
                      placeholder="Select Facilities"
                      multi
                      style={{
                        minHeight: '56px',
                        borderRadius: '8px',
                        backgroundColor: '#F7F7F7',
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Image Upload Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  mb: 3,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.light'
                }}>
                  Room Images
                </Typography>
                
                <FileUploadArea>
                  <Button 
                    component="label" 
                    startIcon={<FileUploadOutlinedIcon color='primary' />} 
                    sx={{ mb: 2 }}
                  >
                                         <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImage} />
                    Choose Image
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    Drag & Drop or <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>Choose a Room Image</Box> to Upload
                  </Typography>
                  {imgs && (
                    <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                      ✓ {imgs.name} selected
                    </Typography>
                  )}
                </FileUploadArea>
              </FormSection>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 2, 
                mt: 4,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Button 
                  onClick={() => navigate(-1)} 
                  type='button' 
                  variant="outlined" 
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 120
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type='submit' 
                  variant="contained" 
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 120,
                    bgcolor: '#203FC7',
                    '&:hover': {
                      bgcolor: '#1a2f9e',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(32, 63, 199, 0.3)',
                    }
                  }}
                >
                  Save Room
                </Button>
              </Box>
            </ThemeProvider>
          </FormControl>
        </FormContainer>
      </Box>
    </Container>
  )
}
