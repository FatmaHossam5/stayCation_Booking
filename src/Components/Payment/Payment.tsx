
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import BCA from "../../assets/BCA.png";
import mandiri from "../../assets/mandiri.png";
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Payment() {
  // const {register,handleSubmit,formState:{errors}}=useForm();
  // const {onlinePayment}=React.useContext(AuthContext)


  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid xs={8}>
        <Item sx={{boxShadow:"none"}}>
  <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Transfer Pembayaran:</Typography>
  <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Tax: 10%</Typography>
  <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Sub total: $480 USD</Typography>
  <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px' }}>Total: $580 USD</Typography>

  <Box display="flex" alignItems="center" sx={{ paddingLeft: '100px' }}>
    <img src={BCA} alt="Bank Central Asia" style={{ marginRight: '8px' }} />
    <Box>
      <Typography>Bank Central Asia</Typography>
      <Typography>2208 1996</Typography>
      <Typography>BuildWith Angga</Typography>
    </Box>
  </Box>

  <Box display="flex" alignItems="center" sx={{ paddingLeft: '100px' }}>
    <img src={mandiri} alt="Bank Mandiri" style={{ marginRight: '8px' }} />
    <Box>
      <Typography>Bank Mandiri</Typography>
      <Typography>2208 1996</Typography>
      <Typography>BuildWith Angga</Typography>
    </Box>
  </Box>
</Item>

        </Grid>
        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

        <Grid xs={8} >
          <Item sx={{boxShadow:"none"}}>
            <Typography sx={{color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px'}}>Upload Bukti Transfer</Typography>
            <TextField  sx={{border:'none',width:'60%',bgcolor:'#F5F6F8'}}/>
            <Typography sx={{color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px'}}>Asal Bank</Typography>
            <TextField  sx={{border:'none',width:'60%',bgcolor:'#F5F6F8'}}/>
            <Typography sx={{color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px'}}>Nama Pengirim</Typography>
            <TextField  sx={{border:'none',width:'60%',bgcolor:'#F5F6F8'}}/>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}