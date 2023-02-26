import { Box, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch } from 'react-redux';
import { postReaction } from './postSlice';
function PostReaction({ post }) {
   // const [like, setLike] = useState(reaction.like);
   // const [dislike, setDislike] = useState(reaction.dislike);
   const dispatch = useDispatch();
   const handleUpdate = (emoji) => {
      dispatch(postReaction({ postId: post._id, emoji }));
   };
   return (
      <Box>
         <Button
            color='primary'
            endIcon={<ThumbUpIcon />}
            onClick={() => handleUpdate('like')}
         >
            {post?.reactions?.like}
         </Button>
         <Button
            color='error'
            endIcon={<ThumbDownIcon />}
            onClick={() => handleUpdate('dislike')}
         >
            {post?.reactions?.dislike}
         </Button>
      </Box>
   );
}

export default PostReaction;
