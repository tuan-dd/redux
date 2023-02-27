import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import { POSTS_PER_PAGE } from '../../app/config';
import { getCurrentUserProfile } from '../user/userSlice';
import { cloudinaryUpload } from '../../utils/cloudinary';
import { toast } from 'react-toastify';
const initialState = {
   isLoading: false,
   error: null,
   postsById: {},
   currentPagePosts: [],
   currentPage: 0,
};

export const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {
      startLoading(state) {
         state.isLoading = true;
      },
      hasError(state, action) {
         state.isLoading = false;
         state.error = action.payload;
      },
      resetPosts(state, action) {
         state.postsById = {};
         state.currentPagePosts = [];
      },
      createPostSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const newPost = action.payload;
         if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
            state.currentPagePosts.pop();
         state.postsById[newPost._id] = newPost;
         state.currentPagePosts.unshift(newPost._id);
         state.totalPosts += 1;
      },
      getPostsSuccess(state, action) {
         state.isLoading = false;
         state.error = null;

         const { posts, count, page } = action.payload;
         posts.forEach((post) => {
            state.postsById[post._id] = post;
            if (!state.currentPagePosts.includes(post._id))
               state.currentPagePosts.push(post._id);
         });
         state.totalPosts = count;
         state.currentPage = page;
      },
      sendPostReactionSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const { postId, reactions } = action.payload;
         state.postsById[postId].reactions = reactions;
      },
      sendUpdatePostSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const postId = action.payload._id;
         state.postsById[postId] = action.payload;
      },
      updatePostsAfterDeleteSuccess(state, action) {
         state.isLoading = false;
         state.error = null;

         const { posts, count } = action.payload;
         posts.forEach((post) => {
            state.postsById[post._id] = post;
            if (!state.currentPagePosts.includes(post._id))
               state.currentPagePosts.push(post._id);
         });
         state.totalPosts = count;
         state.currentPage = Math.ceil(
            state.currentPagePosts.length / POSTS_PER_PAGE,
         );
      },
   },
});

export default postSlice.reducer;

export const createPost =
   ({ content, image }) =>
   async (dispatch) => {
      dispatch(postSlice.actions.startLoading());
      try {
         const imageUrl = await cloudinaryUpload(image);
         const response = await apiService.post('/posts', {
            content,
            image: imageUrl,
         });
         toast.success('Create post success');
         dispatch(postSlice.actions.createPostSuccess(response.data));
         dispatch(getCurrentUserProfile());
      } catch (error) {
         toast.error(error.message);
         dispatch(postSlice.actions.hasError(error.message));
      }
   };

export const getPosts =
   ({ userId, page = 1, limit = POSTS_PER_PAGE }) =>
   async (dispatch) => {
      dispatch(postSlice.actions.startLoading());
      try {
         const params = { page, limit };
         const response = await apiService.get(`/posts/user/${userId}`, {
            params,
         });
         if (page === 1) dispatch(postSlice.actions.resetPosts());

         dispatch(
            postSlice.actions.getPostsSuccess({ ...response.data, page }),
         );
      } catch (error) {
         toast.error(error.message);
         dispatch(postSlice.actions.hasError(error.message));
      }
   };

export const sendUpdatePost = (postId, data) => async (dispatch) => {
   dispatch(postSlice.actions.startLoading());
   try {
      const { content, image } = data;
      const response = await apiService.put(`/posts/${postId}`, {
         content,
         image,
      });
      toast.success('Update success');
      dispatch(postSlice.actions.sendUpdatePostSuccess(response.data));
   } catch (error) {
      toast.error(error.message);
      dispatch(postSlice.actions.hasError(error.message));
   }
};
export const sendDeletePost = (postId, page, userId) => async (dispatch) => {
   dispatch(postSlice.actions.startLoading());
   try {
      await apiService.delete(`/posts/${postId}`);
      if (page === 1) {
         dispatch(updatePostsAfterDelete({ userId }));
      } else {
         dispatch(
            updatePostsAfterDelete({
               userId,
               page: 1,
               limit: page * POSTS_PER_PAGE,
            }),
         );
      }
      toast.error('Delete success');
      dispatch(getCurrentUserProfile());
      return true;
   } catch (error) {
      toast.error(error.message);
      dispatch(postSlice.actions.hasError(error.message));
   }
};
export const updatePostsAfterDelete =
   ({ userId, page = 1, limit = POSTS_PER_PAGE }) =>
   async (dispatch) => {
      dispatch(postSlice.actions.startLoading());
      try {
         const params = { page, limit };
         const response = await apiService.get(`/posts/user/${userId}`, {
            params,
         });
         dispatch(postSlice.actions.resetPosts());
         dispatch(
            postSlice.actions.updatePostsAfterDeleteSuccess(response.data),
         );
      } catch (error) {
         toast.error(error.message);
         dispatch(postSlice.actions.hasError(error.message));
      }
   };

export const postReaction =
   ({ postId, emoji }) =>
   async (dispatch) => {
      dispatch(postSlice.actions.startLoading());
      try {
         const response = await apiService.post('/reactions', {
            targetType: 'Post',
            targetId: postId,
            emoji,
         });
         dispatch(
            postSlice.actions.sendPostReactionSuccess({
               postId,
               reactions: response.data,
            }),
         );
      } catch (error) {
         dispatch(postSlice.actions.hasError(error.message));
         toast.error(error.message);
      }
   };
