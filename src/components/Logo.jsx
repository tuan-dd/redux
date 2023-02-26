import { Box } from '@mui/material';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import FbLogo from '../fblogo.png';
function Logo({ disable = false, sx }) {
   const logo = (
      <Box sx={{ height: 40, width: 40, ...sx }}>
         <img src={FbLogo} alt='logo' width='100%' height='100%' />
      </Box>
   );
   if (disable) {
      return logo;
   }
   return <LinkRouter to='/'>{logo}</LinkRouter>;
}

export default Logo;
