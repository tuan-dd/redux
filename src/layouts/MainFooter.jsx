import React from 'react';
import { Link, Typography, Box } from '@mui/material';

function MainFooter() {
   return (
      <>
         <Box bgcolor='white' sx={{ flexGrow: 0 }}>
            <Typography variant='body2' align='center' p={1}>
               {'Copyright © '}
               <Link color='inherit' href='tuandd.310797@gmail.com'>
                  Make by Anh Tuấn
               </Link>{' '}
               {new Date().getFullYear()}
               {'.'}
            </Typography>
         </Box>
      </>
   );
}

export default MainFooter;
