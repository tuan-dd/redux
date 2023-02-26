import { Button, Stack } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
   sendFriendRequest,
   sendUnfriend,
   sendCancelRequest,
   UpdateRequest,
} from './friendSlice';

function ActionButton({
   currentUserId,
   targetUserId,
   friendship,
   sx,
   sxOfStack,
}) {
   const dispatch = useDispatch();
   if (currentUserId === targetUserId) return null;
   const btnSendRequest = (
      <Button
         sx={{
            fontSize: 9,
            flexGrow: 1,
            p: 1,
            width: 90,
            height: 35,
            ...sx,
         }}
         variant='contained'
         size='small'
         color='secondary'
         onClick={() => dispatch(sendFriendRequest(targetUserId))}
      >
         Send Request
      </Button>
   );
   const btnUnfriend = (
      <Button
         sx={{
            fontSize: 9,
            flexGrow: 1,
            p: 1,
            width: 90,
            height: 35,
            ...sx,
         }}
         variant='contained'
         size='small'
         color='error'
         onClick={() => dispatch(sendUnfriend(targetUserId))}
      >
         Unfriend
      </Button>
   );
   const btnCancelRequest = (
      <Button
         sx={{
            fontSize: 9,
            flexGrow: 1,
            p: 1,
            width: 90,
            height: 35,
            ...sx,
         }}
         variant='contained'
         size='small'
         color='warning'
         onClick={() => dispatch(sendCancelRequest(targetUserId))}
      >
         Cancel Request
      </Button>
   );
   if (!friendship) return btnSendRequest;

   const btnResend = (
      <Button
         sx={{ fontSize: 8, p: 1, width: 90, height: 35, flexGrow: 1, ...sx }}
         size='small'
         variant='contained'
         onClick={() => dispatch(sendFriendRequest(targetUserId))}
      >
         {friendship.from === currentUserId ? 'Resend' : 'Send'} Request
      </Button>
   );

   const btnGroupReact = (
      <Stack
         direction='row'
         spacing={2}
         columnGap={1}
         sx={{
            ...sxOfStack,
         }}
      >
         <Button
            sx={{ fontSize: '0.6rem', width: 70, height: 25, ...sx }}
            size='small'
            variant='contained'
            color='success'
            onClick={() => dispatch(UpdateRequest(targetUserId, 'accepted'))}
         >
            Accept
         </Button>
         <Button
            sx={{
               fontSize: '0.6rem',
               width: 70,
               height: 25,
               ml: '0px !important',
               ...sx,
            }}
            size='small'
            variant='outlined'
            color='error'
            onClick={() => dispatch(UpdateRequest(targetUserId, 'declined'))}
         >
            Decline
         </Button>
      </Stack>
   );
   if (friendship.status === 'pending') {
      if (friendship.to === currentUserId) return btnGroupReact;

      if (friendship.from === currentUserId);
      return btnCancelRequest;
   }
   if (friendship.status === 'accepted') return btnUnfriend;
   if (friendship.status === 'declined') return btnResend;
}

export default ActionButton;
