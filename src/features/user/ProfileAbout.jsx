import {
   Card,
   CardHeader,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
} from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import React from 'react';

function ProfileAbout({ profile }) {
   const { aboutMe, city, country, email, company } = profile;
   return (
      <Card sx={{ p: 2 }}>
         <CardHeader title='About' variant='h6' />
         <nav aria-label='main mailCard folders'>
            <List>
               <ListItem>
                  <Typography variant='body2'>{aboutMe}</Typography>
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <PinDropIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${city}${country}`} />
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={email} />
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary={company} />
               </ListItem>
            </List>
         </nav>
      </Card>
   );
}

export default ProfileAbout;
