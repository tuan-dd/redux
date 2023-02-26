import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, Card, Grid, Pagination, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import SearchInput from '../../components/SearchInput';
import UserCard from './UserCard';
import { getRequest, updateSuccess } from './friendSlice';

function SendRequests() {
   const [page, setPage] = useState(1);
   const [filterName, setFilterName] = useState('');
   const dispatch = useDispatch();
   const {
      currentPageUsers,
      usersById,
      totalPages,
      totalUsers,
      isUpdateRequest,
   } = useSelector((state) => state.friend);
   const usersRef = useRef(null);

   const option = 'outgoing';
   const user = currentPageUsers.map((userId) => usersById[userId]);
   useEffect(() => {
      if (isUpdateRequest) {
         usersRef.current = currentPageUsers.map((userId) => usersById[userId]);
         dispatch(updateSuccess('isUpdateRequest'));
      }
   }, [isUpdateRequest]);

   useEffect(() => {
      dispatch(getRequest({ page, totalUsers, option }));
   }, []);

   const handleSubmit = (valueFilterName) => {
      setFilterName(valueFilterName);
      dispatch(getRequest({ filterName: valueFilterName, page, option }));
   };
   return (
      <>
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
                  onChange={(event, value) => {
                     setPage(value);
                     dispatch(getRequest({ filterName, page: value, option }));
                  }}
               />
            </Stack>
            <Grid container spacing={3}>
               {usersRef.current?.map((user) => (
                  <Grid item xs={12} key={user._id} md={4}>
                     <UserCard profile={user} />
                  </Grid>
               ))}
            </Grid>
         </Card>
      </>
   );
}

export default SendRequests;
