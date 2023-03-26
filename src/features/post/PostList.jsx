import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useAuth from '../../hooks/useAuth';
import PostCard from './PostCard';
import { getPosts } from './postSlice';

function PostList({ userId }) {
   const dispatch = useDispatch();
   const { user } = useAuth();
   const [changePage, setChangePage] = useState(1);
   const [checked, setChecked] = useState(false);
   const { currentPagePosts, postsById, isLoading, totalPosts, currentPage } =
      useSelector((state) => state.post);
   const postRef = useRef(null);

   if (userId) {
      postRef.current = checked
         ? currentPagePosts
              .map((postId) => postsById[postId])
              .filter((post) => post.author._id === user._id)
         : currentPagePosts.map((postId) => postsById[postId]);
   }

   useEffect(() => {
      if (changePage !== currentPage || userId)
         dispatch(getPosts({ userId, page: changePage }));
   }, [changePage, userId]);

   useEffect(() => {
      if (currentPage !== changePage) setChangePage(currentPage);
   }, [currentPage]);

   return (
      <>
         {userId === user._id && (
            <FormGroup>
               <FormControlLabel
                  control={<Switch />}
                  label='My Post'
                  checked={checked}
                  onChange={() => setChecked((e) => !e)}
               />
            </FormGroup>
         )}
         {postRef.current?.map((post) => (
            <PostCard key={post._id} post={post} />
         ))}
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {totalPosts ? (
               <LoadingButton
                  variant='outlined'
                  size='small'
                  loading={isLoading}
                  onClick={() => setChangePage((previous) => previous + 1)}
                  disabled={
                     Boolean(totalPosts) &&
                     currentPagePosts.length >= totalPosts
                  }
               >
                  Load more
               </LoadingButton>
            ) : (
               <Typography variant='h6'>No Post Yet</Typography>
            )}
         </Box>
      </>
   );
}

export default PostList;
