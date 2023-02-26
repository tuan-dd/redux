import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import { COMMENTS_PER_POST } from '../../app/config';
import { toast } from 'react-toastify';
const initialState = {
   isLoading: true,
   error: null,
   commentsByPost: {},
   commentsById: {},
   totalCommentsByPost: {},
   currentPageByPost: {},
};

export const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {
      startLoading(state) {
         state.isLoading = true;
      },
      hasError(state, action) {
         state.isLoading = false;
         state.error = action.payload;
      },
      resetComment(state, action) {
         state.isLoading = false;
         state.error = null;
         const postId = action.payload;
         delete state.totalCommentsByPost[postId];
         delete state.currentPageByPost[postId];
         state.commentsByPost[postId]?.forEach((commentId) => {
            delete state.commentsById[commentId];
         });
      },
      getCommentSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const { postId, comments, count, page } = action.payload;
         comments.forEach(
            (comment) => (state.commentsById[comment._id] = comment),
         );
         state.commentsByPost[postId] = comments.map((comment) => comment._id);
         state.totalCommentsByPost[postId] = count;
         state.currentPageByPost[postId] = page;
      },
      sendCommentReactionSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const { commentId, reactions } = action.payload;
         state.commentsById[commentId].reactions = reactions;
      },
      createCommentSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
      },
      sendDeleteCommentSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
      },
      sendUpdateCommentSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const commentId = action.payload._id;
         state.commentsById[commentId].content = action.payload.content;
      },
   },
});

export const createComment =
   ({ content, postId }) =>
   async (dispatch) => {
      dispatch(commentSlice.actions.startLoading());
      try {
         const response = await apiService.post('/comments', {
            content,
            postId,
         });
         // console.log(response.data);
         dispatch(commentSlice.actions.createCommentSuccess(response.data));
         dispatch(getComments({ postId }));
      } catch (error) {
         toast.error(error.message);
         dispatch(commentSlice.actions.hasError(error.message));
      }
   };
export const getComments =
   ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
   async (dispatch) => {
      dispatch(commentSlice.actions.startLoading());
      try {
         const params = { page, limit };
         const response = await apiService.get(`/posts/${postId}/comments`, {
            params,
         });
         if (page === 1) dispatch(commentSlice.actions.resetComment(postId));
         dispatch(
            commentSlice.actions.getCommentSuccess({
               ...response.data,
               postId,
               page,
            }),
         );
      } catch (error) {
         toast.error(error.message);
         dispatch(commentSlice.actions.hasError(error.message));
      }
   };
export const commentReaction =
   ({ commentId, emoji }) =>
   async (dispatch) => {
      dispatch(commentSlice.actions.startLoading());
      try {
         const response = await apiService.post('/reactions', {
            targetType: 'Comment',
            targetId: commentId,
            emoji,
         });
         dispatch(
            commentSlice.actions.sendCommentReactionSuccess({
               commentId,
               reactions: response.data,
            }),
         );
      } catch (error) {
         dispatch(commentSlice.actions.hasError(error.message));
         toast.error(error.message);
      }
   };

export const sendUpdateComment =
   ({ commentId, content }) =>
   async (dispatch) => {
      dispatch(commentSlice.actions.startLoading());
      try {
         const response = await apiService.put(`/Comments/${commentId}`, {
            content,
         });
         dispatch(commentSlice.actions.sendUpdateCommentSuccess(response.data));
      } catch (error) {
         toast.error(error.message);
         dispatch(commentSlice.actions.hasError(error.message));
      }
   };

export const sendDeleteComment = (commentId) => async (dispatch, getSate) => {
   dispatch(commentSlice.actions.startLoading());
   try {
      const response = await apiService.delete(`/Comments/${commentId}`);
      const { comment } = getSate();
      const commentsByPost = comment.commentsByPost;
      const postsId = Object.keys(comment.commentsByPost);
      const postId = postsId.find((postId) => {
         if (commentsByPost[postId].length > 0) {
            return commentsByPost[postId].includes(commentId) ? postId : '';
         }
      });
      const currentPage = comment.currentPageByPost[postId];
      const totalCommentsByPost = comment.totalCommentsByPost[postId];
      if (currentPage === 1) dispatch(getComments({ postId }));
      if (totalCommentsByPost % COMMENTS_PER_POST === 1) {
         dispatch(getComments({ postId, page: currentPage - 1 }));
      }
      if (totalCommentsByPost % COMMENTS_PER_POST !== 1) {
         dispatch(getComments({ postId, page: currentPage }));
      }
      dispatch(commentSlice.actions.sendDeleteCommentSuccess(response.data));

      return true;
   } catch (error) {
      toast.error(error.message);
      dispatch(commentSlice.actions.hasError(error.message));
      return false;
   }
};
export default commentSlice.reducer;
