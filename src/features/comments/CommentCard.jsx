import React, { useState } from 'react';
import {
   Avatar,
   Box,
   Card,
   CardContent,
   IconButton,
   Menu,
   MenuItem,
   Stack,
   Tooltip,
   Typography,
} from '@mui/material';
import { fToNow } from '../../utils/formatTime';
import CommentReaction from './CommentReaction';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteComment from './DeleteComment';
import UpdateComment from './UpdateComment';
import useAuth from '../../hooks/useAuth';
const settings = ['Edit', 'Delete'];
function CommentCard({ comment }) {
   const { name, avatarUrl, _id } = comment.author;
   const { createdAt, content } = comment;
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [isDeleteCommentShow, setIsDeleteCommentShow] = useState(false);
   const [isUpdateCommentShow, setIsUpdateCommentShow] = useState(false);
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const handleClickSettings = (setting) => {
      setting === settings[0]
         ? setIsUpdateCommentShow(true)
         : setIsDeleteCommentShow(true);
      setAnchorElUser(null);
   };
   const { user } = useAuth();
   return (
      <Stack direction='row' spacing={1.5}>
         <Box sx={{ flexGrow: 0, maxWidth: 50 }}>
            <Avatar alt={name} src={avatarUrl} />
         </Box>
         {!isUpdateCommentShow ? (
            <Card sx={{ flexGrow: 1, p: 2, bgcolor: 'background.neutral' }}>
               <Box position='relative'>
                  <Typography variant='subtitle2' color='text.primary'>
                     {name}
                  </Typography>
                  <Box sx={{ position: 'absolute', top: -10, right: 0 }}>
                     {user._id === _id && (
                        <Tooltip title='Open settings'>
                           <IconButton
                              onClick={handleOpenUserMenu}
                              size='small'
                              edge='start'
                              color='inherit'
                              aria-label='menu'
                           >
                              <MoreVertIcon />
                           </IconButton>
                        </Tooltip>
                     )}
                     <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                     >
                        {settings.map((setting) => (
                           <MenuItem
                              key={setting}
                              onClick={() => handleClickSettings(setting)}
                           >
                              <Typography textAlign='center'>
                                 {setting}
                              </Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>
               </Box>
               <CardContent sx={{ p: 0, marginY: 2 }}>
                  <Typography variant='subtitle2' color='text.primary'>
                     {content}
                  </Typography>
               </CardContent>
               <Stack direction='row' position='relative'>
                  <CommentReaction comment={comment} />
                  <Typography variant='caption' lineHeight={3}>
                     {fToNow(createdAt)}
                  </Typography>
               </Stack>
            </Card>
         ) : (
            <UpdateComment
               comment={comment}
               setIsUpdateCommentShow={setIsUpdateCommentShow}
            />
         )}
         <DeleteComment
            isDeleteCommentShow={isDeleteCommentShow}
            comment={comment}
            setIsDeleteCommentShow={setIsDeleteCommentShow}
         />
      </Stack>
   );
}

export default CommentCard;
