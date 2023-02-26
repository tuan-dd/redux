import React from 'react';
import { Avatar, Box, Card, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ActionButton from './ActionButton';
import useAuth from '../../hooks/useAuth';

function UserCard({ profile }) {
   const { _id: targetUserId, name, avatarUrl, email, friendship } = profile;
   const { user } = useAuth();
   const currentUserId = user._id;
   return (
      <>
         <Card
            sx={{ p: 3, display: 'flex', alignItems: 'center', columnGap: 2 }}
         >
            <Avatar
               alt={name}
               src={avatarUrl}
               sx={{ width: 48, height: 48, flexGrow: 0 }}
            />
            <Stack
               flexDirection='column'
               justifyContent='center'
               sx={{ flexGrow: 0, width: '40%' }}
            >
               <Link
                  color='primary.dark'
                  variant='subtitle1'
                  sx={{ fontWeight: 600 }}
                  component={RouterLink}
                  to={`user/${targetUserId}`}
                  noWrap
               >
                  {name}
               </Link>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailRoundedIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography
                     variant='body2'
                     sx={{ color: 'text.secondary' }}
                     noWrap
                  >
                     {email}
                  </Typography>
               </Box>
            </Stack>
            <ActionButton
               currentUserId={currentUserId}
               targetUserId={targetUserId}
               friendship={friendship}
               sxOfStack={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  rowGap: 0.5,
                  flexGrow: 1,
               }}
            />
         </Card>
      </>
   );
}

export default UserCard;
