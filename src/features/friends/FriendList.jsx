import {
   Box,
   Card,
   Container,
   Grid,
   Pagination,
   Stack,
   Typography,
} from '@mui/material';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../../components/SearchInput';
import { getFriends, updateSuccess } from './friendSlice';
import UserCard from './UserCard';

function FriendList() {
   const [page, setPage] = useState(1);
   const [filterName, setFilterName] = useState('');
   const dispatch = useDispatch();
   const {
      currentPageUsers,
      usersById,
      totalPages,
      totalUsers,
      isUpdateListFriend,
   } = useSelector((state) => state.friend);
   const usersRef = useRef(null);
   useEffect(() => {
      if (isUpdateListFriend) {
         usersRef.current = currentPageUsers.map((userId) => usersById[userId]);
         dispatch(updateSuccess('isUpdateListFriend'));
      }
   }, [isUpdateListFriend]);

   useEffect(() => {
      dispatch(getFriends({ filterName, page }));
   }, []);

   const handleSubmit = (valueFilterName) => {
      setFilterName(valueFilterName);
      dispatch(getFriends({ filterName: valueFilterName, page }));
   };
   return (
      <Container>
         <Typography variant='h4' sx={{ mb: 3 }}>
            Friends
         </Typography>
         <Card sx={{ p: 2 }}>
            <Stack
               flexDirection='row'
               justifyContent='space-between'
               mb={2}
               alignItems='center'
            >
               <SearchInput handleSubmit={handleSubmit} />
               <Box sx={{ flexGrow: 1 }} />
               <Typography
                  variant='subtitle'
                  sx={{ color: 'text.secondary', ml: 1 }}
               >
                  {totalUsers > 1
                     ? `${totalUsers} users found`
                     : totalUsers === 1
                     ? `${totalUsers} user found`
                     : 'No user found'}
               </Typography>
               <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, page) =>
                     dispatch(getFriends({ filterName, page }))
                  }
               />
            </Stack>
            <Grid container spacing={3}>
               {usersRef.current?.map((user) => (
                  <Grid item xs={6} key={user._id} md={4}>
                     <UserCard profile={user} />
                  </Grid>
               ))}
            </Grid>
         </Card>
      </Container>
   );
}

export default FriendList;
