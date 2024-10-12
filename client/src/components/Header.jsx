import logo from './assets/r-logo.jpg';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>RAHAO</Link>
          </Typography>
          <Typography variant="h5" component="div" > 
          </Typography>
          <Box alignItems='right' sx={{flexGrow: 1, textAlign: 'right'}}>
            <Button color="inherit">
              <Link to="/register" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Register</Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </Button>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}