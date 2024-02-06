import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Divider} from '@mui/material';
import NavPhoto from '../../../src/assets/Staycation..svg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
export default function Navbar() {
  const{role}=useContext(AuthContext);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate=useNavigate()
  const setAuthState = (authState) => {
    setAuthenticated(authState);
  };
   const handleSignOut=()=>{
  
    localStorage.removeItem('userToken')
    localStorage.removeItem('role')
    setAuthState(false)
    navigate('/')
   }
  return (
  <>
     <Box>
      <AppBar position="static" sx={{bgcolor:'#FFFFFF',boxShadow:'none'}}>
        <Toolbar className='fonts'>
        <img src={NavPhoto} alt="logo"  />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  
          </Typography>
          {isAuthenticated||role==='user'?(
            <>
               <Link to ='/user'>
          <Button sx={{color:'#152C5B',px:"1rem",fontFamily:'cairo'}}>Home</Button>
          </Link>
       
          <Link to='/user/fav'>
          <Button sx={{color:'#152C5B',fontFamily:'cairo'}}>Faviorate</Button>
          </Link>
          <Link to='/'>
          <Button sx={{color:'#152C5B',fontFamily:'cairo'}}>Your Booking</Button>
          </Link>
      
          <Button onClick={handleSignOut}>Sign Out</Button>
         
            </>
          ):(<>
             <Link to ='/'>
          <Button sx={{color:'#152C5B',px:"1rem",fontFamily:'cairo'}}>Home</Button>
          </Link>
       
          <Link to='/auth/signin'>
          <Button>Sign In</Button>
          </Link>
          </>)}
       
        </Toolbar>
      </AppBar>
      <Divider sx={{color:'#D3D3D3'}}/>
      </Box>

      </>
  );
}