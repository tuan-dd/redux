import {
   Card,
   CardHeader,
   List,
   ListItem,
   ListItemText,
   ListItemIcon,
   Typography,
   Link,
} from '@mui/material';
import React from 'react';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
function ProfileSocialInfo({ profile }) {
   const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
   return (
      <Card sx={{ p: 2 }}>
         <CardHeader title='Social' variant='h6' />
         <nav aria-label='main mailCard folders'>
            <List>
               <ListItem>
                  <ListItemIcon>
                     <LinkedInIcon sx={{ color: '#006097' }} />
                  </ListItemIcon>
                  <Link href={linkedinLink} target='_blank' noWrap>
                     {linkedinLink}
                  </Link>
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <InstagramIcon sx={{ color: '#1877F2' }} />
                  </ListItemIcon>
                  <Link href={instagramLink} target='_blank' noWrap>
                     {instagramLink}
                  </Link>
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <FacebookIcon sx={{ color: '#1C9CEA' }} />
                  </ListItemIcon>
                  <Link href={facebookLink} target='_blank' noWrap>
                     {facebookLink}
                  </Link>
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <TwitterIcon sx={{ color: '#D7336D' }}></TwitterIcon>
                  </ListItemIcon>
                  <Link href={twitterLink} target='_blank' noWrap>
                     {twitterLink}
                  </Link>
               </ListItem>
            </List>
         </nav>
      </Card>
   );
}

export default ProfileSocialInfo;
