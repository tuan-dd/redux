import { Box, Button } from '@mui/material';
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch } from 'react-redux';
import { commentReaction } from './commentSlice';
function CommentReaction({ comment }) {
   const dispatch = useDispatch();
   const handleUpdate = (emoji) => {
      dispatch(commentReaction({ commentId: comment._id, emoji }));
   };
   return (
      <Box>
         <Button
            color='primary'
            endIcon={<ThumbUpIcon />}
            onClick={() => handleUpdate('like')}
         >
            {comment?.reactions?.like}
         </Button>
         <Button
            color='error'
            endIcon={<ThumbDownIcon />}
            onClick={() => handleUpdate('dislike')}
         >
            {comment?.reactions?.dislike}
         </Button>
      </Box>
   );
}

export default CommentReaction;
