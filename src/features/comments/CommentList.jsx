import { Box, Card, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { COMMENTS_PER_POST } from '../../app/config';
import LoadingScreen from '../../components/LoadingScreen';
import CommentCard from './CommentCard';
import { getComments } from './commentSlice';
function CommentList({ postId }) {
   const {
      commentsByPost,
      commentsById,
      totalComments,
      isLoading,
      currentPage,
   } = useSelector(
      (state) => ({
         commentsByPost: state.comment.commentsByPost[postId],
         totalComments: state.comment.totalCommentsByPost[postId],
         currentPage: state.comment.currentPageByPost[postId] || 1,
         commentsById: state.comment.commentsById,
         isLoading: state.comment.isLoading,
      }),
      shallowEqual,
   );
   const dispatch = useDispatch();
   const totalPages = Math.ceil(totalComments / COMMENTS_PER_POST);
   let renderComments;
   if (commentsByPost?.length > 0) {
      const comments = commentsByPost.map((comment) => commentsById[comment]);
      renderComments = (
         <Stack spacing={1.5}>
            {comments?.map((comment) => (
               <CommentCard key={comment._id} comment={comment} />
            ))}
         </Stack>
      );
   } else if (isLoading) {
      renderComments = <LoadingScreen />;
   }
   useEffect(() => {
      if (postId) dispatch(getComments({ postId }));
   }, [postId, dispatch]);
   return (
      <Stack spacing={1.5}>
         <Stack direction='row' justifyContent='space-between'>
            <Typography variant='subtitle' sx={{ color: 'text.secondary' }}>
               {totalComments > 1
                  ? `${totalComments} Comments`
                  : totalComments === 1
                  ? '1 Comment'
                  : 'No Comments'}
            </Typography>
            {totalComments > COMMENTS_PER_POST && (
               <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) =>
                     dispatch(getComments({ postId, page: value }))
                  }
               />
            )}
         </Stack>
         {renderComments}
      </Stack>
   );
}

export default CommentList;
