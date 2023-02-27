import {
   Card,
   Container,
   Stack,
   TablePagination,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { set } from 'lodash';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../../components/SearchInput';
import { getUsers, updateSuccess } from './friendSlice';
import UserTable from './UserTable';

function AddFriend() {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [filterName, setFilterName] = React.useState('');
   const dispatch = useDispatch();
   const usersRef = useRef(null);
   const {
      currentPageUsers,
      usersById,
      totalUsers,
      isUpdateRequest,
      isUpdateListFriend,
      isUpdateListUsers,
   } = useSelector((state) => state.friend);
   const update = {
      isUpdateRequest: isUpdateRequest,
      isUpdateListFriend: isUpdateListFriend,
      isUpdateListUsers: isUpdateListUsers,
   };
   useEffect(() => {
      if (isUpdateRequest || isUpdateListFriend || isUpdateListUsers) {
         usersRef.current = currentPageUsers.map((userId) => usersById[userId]);
         const keyToString = Object.keys(update).find(
            (value) => update[value] === true,
         );
         dispatch(updateSuccess(keyToString));
      }
   }, [isUpdateRequest, isUpdateListFriend, isUpdateListUsers]);

   useEffect(() => {
      dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
   }, []);
   const handleSubmit = (searchQuery) => {
      setFilterName(searchQuery);
      dispatch(
         getUsers({
            filterName: searchQuery,
            page: page + 1,
            limit: rowsPerPage,
         }),
      );
   };
   const handleChangeRowsPerPage = (event) => {
      dispatch(getUsers({ filterName, page: 1, limit: event.target.value }));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangePage = (even, value) => {
      dispatch(getUsers({ filterName, page: value + 1, limit: rowsPerPage }));
      setPage(value);
   };

   return (
      <Container>
         <Typography variant='h4' sx={{ mb: 3 }}>
            Add Friends
         </Typography>
         <Card sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center'>
               <SearchInput handleSubmit={handleSubmit} />
               <Box sx={{ flexGrow: 1 }} />
               <Typography
                  variant='subtitle2'
                  sx={{ color: 'text.secondary', ml: 1 }}
               >
                  {totalUsers > 1
                     ? `${totalUsers} users found`
                     : totalUsers === 1
                     ? `${totalUsers} user found`
                     : 'No user found'}
               </Typography>
               <TablePagination
                  component='div'
                  count={totalUsers ? totalUsers : 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Stack>
            <UserTable users={usersRef.current} />
         </Card>
      </Container>
   );
}

export default AddFriend;
