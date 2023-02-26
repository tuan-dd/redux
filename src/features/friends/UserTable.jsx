import * as React from 'react';
import {
   Table,
   TableHead,
   Avatar,
   TableRow,
   TableBody,
   TableCell,
   Link,
   TableContainer,
   Box,
   Stack,
} from '@mui/material';
import FriendStatus from './FriendStatus';
import ActionButton from './ActionButton';
import useAuth from '../../hooks/useAuth';
import { Link as RouterLink } from 'react-router-dom';
export default function UserTable({ users }) {
   const { user } = useAuth();
   const getActionsAndStatus = (targetUser) => {
      const props = {
         currentUserId: user._id,
         targetUserId: targetUser._id,
         friendship: targetUser.friendship,
      };
      return {
         status: <FriendStatus {...props} />,
         action: <ActionButton {...props} />,
      };
   };
   return (
      <Box sx={{ overflowX: 'auto' }}>
         <TableContainer sx={{ minWidth: 800 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     <TableCell sx={{ width: { xs: '20%', sm: '25%' } }}>
                        Name
                     </TableCell>
                     <TableCell
                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                     >
                        Email
                     </TableCell>
                     <TableCell
                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                     >
                        Job Title
                     </TableCell>
                     <TableCell
                        sx={{
                           display: { xs: 'none', sm: 'table-cell' },
                           width: '20%',
                        }}
                     >
                        Status
                     </TableCell>
                     <TableCell>Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {users?.map((user) => {
                     const { status, action } = getActionsAndStatus(user);
                     return (
                        <TableRow key={user.email} hover>
                           <TableCell>
                              <Stack flexDirection='row' alignItems='center'>
                                 <Avatar
                                    alt={user.name}
                                    src={user.avatarUrl}
                                    sx={{ mr: 2 }}
                                 />
                                 <Link
                                    variant='subtitle2'
                                    sx={{ fontWeight: 600, color: '#eb4d4b' }}
                                    component={RouterLink}
                                    to={`/user/${user._id}`}
                                 >
                                    {user.name}
                                 </Link>
                              </Stack>
                           </TableCell>
                           <TableCell
                              align='left'
                              sx={{ display: { xs: 'none', md: 'table-cell' } }}
                           >
                              {user.email}
                           </TableCell>
                           <TableCell
                              align='left'
                              sx={{ display: { xs: 'none', md: 'table-cell' } }}
                           >
                              {user.jobTitle}
                           </TableCell>
                           <TableCell
                              align='left'
                              sx={{ display: { xs: 'none', sm: 'table-cell' } }}
                           >
                              {status}
                           </TableCell>
                           <TableCell align='left'>{action}</TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
}
