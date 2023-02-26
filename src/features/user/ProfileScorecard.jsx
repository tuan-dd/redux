import { Card, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
function ProfileScorecard({ profile }) {
   return (
      <Card sx={{ py: 3 }}>
         <Stack
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
         >
            <Stack flexGrow={1} textAlign='center'>
               <Typography variant='h4'>{profile.friendCount}</Typography>
               <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  friends
               </Typography>
            </Stack>
            <Stack flexGrow={1} textAlign='center'>
               <Typography variant='h4'>{profile.postCount}</Typography>
               <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  Posts
               </Typography>
            </Stack>
         </Stack>
      </Card>
   );
}

export default ProfileScorecard;
