import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Divider} from '@mui/material';
import NavPhoto from '../../../src/assets/Staycation..svg'
export default function Navbar() {
  return (
  <>
     <Box>
      <AppBar position="static" sx={{bgcolor:'#FFFFFF',boxShadow:'none'}}>
        <Toolbar className='fonts'>
        <img src={NavPhoto} alt="logo"  />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  
          </Typography>
          <Button sx={{color:'#152C5B',px:"1rem",fontFamily:'cairo'}}>Home</Button>
          <Button sx={{color:'#152C5B',px:"1rem",fontFamily:'cairo'}}>Browse by</Button>
          <Button sx={{color:'#152C5B',fontFamily:'cairo'}}>Stories</Button>
          <Button sx={{color:'#152C5B',fontFamily:'cairo'}}>Agents</Button>

        </Toolbar>
      </AppBar>
      <Divider sx={{color:'#D3D3D3'}}/>
      </Box>

      </>
  );
}