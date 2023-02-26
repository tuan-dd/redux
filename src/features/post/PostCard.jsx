import {
   AppBar,
   Avatar,
   Box,
   Card,
   IconButton,
   Menu,
   MenuItem,
   Toolbar,
   Tooltip,
   Typography,
   Stack,
   Link,
} from '@mui/material';
import React, { useState } from 'react';
import { fDate } from '../../utils/formatTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostReaction from './PostReaction';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';
import useAuth from '../../hooks/useAuth';
import { Link as LinkRouter, useParams } from 'react-router-dom';
const settings = ['Edit', 'Delete'];
function PostCard({ post }) {
   const [isDeleteCardShow, setIsDeleteCardShow] = useState(false);
   const [isUpdateCardShow, setIsUpdateCardShow] = useState(false);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const params = useParams();
   const paramsUserId = params.userId;
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const { user } = useAuth();
   const handleClickSettings = (setting) => {
      setting === settings[0]
         ? setIsUpdateCardShow(true)
         : setIsDeleteCardShow(true);
      setAnchorElUser(null);
   };
   return (
      <Card sx={{ p: 3 }}>
         <Box sx={{ flexGrow: 0 }}>
            <AppBar
               position='static'
               color='inherit'
               sx={{ boxShadow: 'none' }}
            >
               <Toolbar disableGutters={true}>
                  <Avatar alt={user.name} src={user.avatarUrl} />
                  <Stack sx={{ flexGrow: 1, ml: 1 }}>
                     <Link
                        color='primary.dark'
                        variant='subtitle1'
                        sx={{ fontWeight: 600 }}
                        component={LinkRouter}
                        to={
                           post?.author._id === user._id || paramsUserId
                              ? '#'
                              : `user/${post?.author._id}`
                        }
                        noWrap
                     >
                        {post?.author?.name}
                     </Link>
                     <Typography variant='caption'>
                        {fDate(post.createdAt)}
                     </Typography>
                  </Stack>
                  <Box sx={{ flexGrow: 0 }}>
                     {user._id === post.author._id && (
                        <Tooltip title='Open settings'>
                           <IconButton
                              onClick={handleOpenUserMenu}
                              size='large'
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
               </Toolbar>
            </AppBar>
         </Box>
         <Stack spacing={2}>
            <Typography>{post.content}</Typography>
            {post.image && (
               <Box
                  sx={{
                     borderRadius: 2,
                     overflow: 'hidden',
                     height: 300,
                     '& img': { objectFit: 'cover', width: 1, height: 1 },
                  }}
               >
                  <img src={post.image} alt='post' />
               </Box>
            )}
            <PostReaction post={post} />
            <CommentList postId={post._id} />
            <CommentForm postId={post._id} />
         </Stack>
         <DeletePost
            isDeleteCardShow={isDeleteCardShow}
            post={post}
            setIsDeleteCardShow={setIsDeleteCardShow}
         />
         <UpdatePost
            isUpdateCardShow={isUpdateCardShow}
            post={post}
            setIsUpdateCardShow={setIsUpdateCardShow}
         />
      </Card>
   );
}

export default PostCard;
