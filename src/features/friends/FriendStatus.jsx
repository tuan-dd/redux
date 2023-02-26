import { Chip } from '@mui/material';
import React from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
export default function FriendStatus({
   currentUserId,
   targetUserId,
   friendship,
   sx,
}) {
   if (currentUserId === targetUserId) return null;
   if (!friendship) return null;

   const chipFriend = (
      <Chip
         icon={<CheckCircleOutlineRoundedIcon />}
         color='success'
         label='Friend'
      />
   );
   const ChipDeclined = (
      <Chip
         icon={<DoNotDisturbAltRoundedIcon />}
         color='error'
         label='Friend'
      />
   );

   const ChipSendRequest = (
      <Chip
         icon={<MarkEmailReadRoundedIcon />}
         color='primary'
         label='Request sent'
      />
   );
   const ChipReceiveRequest = (
      <Chip
         icon={<PauseCircleOutlineRoundedIcon />}
         color='secondary'
         label='Waiting for response'
      />
   );
   if (friendship.status === 'accepted') return chipFriend;
   if (friendship.status === 'declined') return ChipDeclined;
   if (friendship.status === 'pending') {
      const { from, to } = friendship;
      if (from === currentUserId && to === targetUserId) {
         return ChipSendRequest;
      } else {
         return ChipReceiveRequest;
      }
   }
}
