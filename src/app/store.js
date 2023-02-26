import { configureStore } from '@reduxjs/toolkit';
import { commentSlice } from '../features/comments/commentSlice';
import { friendSlice } from '../features/friends/friendSlice';
import { postSlice } from '../features/post/postSlice';
import { userSlice } from '../features/user/userSlice';

export default configureStore({
   reducer: {
      comment: commentSlice.reducer,
      friend: friendSlice.reducer,
      post: postSlice.reducer,
      user: userSlice.reducer,
   },
});
