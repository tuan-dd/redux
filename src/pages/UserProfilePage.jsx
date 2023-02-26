import { Card, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { shallowEqual, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Profile from '../features/user/Profile';
import ProfileCover from '../features/user/ProfileCover';
import { getTargetUser } from '../features/user/userSlice';

function UserProfilePage() {
   const params = useParams();
   const userId = params.userId;
   const dispatch = useDispatch();
   const { selectedUser, isLoading } = useSelector(
      (state) => state.user,
      shallowEqual,
   );
   useEffect(() => {
      if (userId) {
         dispatch(getTargetUser(userId));
      }
   }, [dispatch, userId]);
   return (
      <Container sx={{ flexGrow: 1, paddingY: 3 }}>
         <Card
            sx={{
               mb: 3,
               height: 280,
               position: 'relative',
            }}
         >
            {selectedUser && <ProfileCover profile={selectedUser} />}
         </Card>
         {selectedUser && <Profile profile={selectedUser} />}
      </Container>
   );
}

export default UserProfilePage;
