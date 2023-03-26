/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react';
import { Box, Card, Grid, Pagination, Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

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

   useEffect(() => {
      if (isUpdateRequest) {
         usersRef.current = currentPageUsers.map((userId) => usersById[userId]);
         dispatch(updateSuccess('isUpdateRequest'));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isUpdateRequest]);

   useEffect(() => {
      dispatch(getRequest({ page, totalUsers, option }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
               {usersRef.current?.map((e) => (
                  <Grid item xs={12} key={e._id} md={4}>
                     <UserCard profile={e} />
                  </Grid>
               ))}
            </Grid>
         </Card>
      </>
   );
}

export default SendRequests;
