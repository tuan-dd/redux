import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import { getCurrentUserProfile } from '../user/userSlice';
import { toast } from 'react-toastify';
const initialState = {
   isLoading: true,
   error: null,
   currentPageUsers: [],
   usersById: {},
   totalPages: 1,
   isUpdateRequest: false,
   isUpdateListFriend: false,
   isUpdateListUsers: false,
};

export const friendSlice = createSlice({
   name: 'friend',
   initialState,
   reducers: {
      startLoading(state) {
         state.isLoading = true;
      },
      hasError(state, action) {
         state.isLoading = false;
         state.error = action.payload;
      },
      updateSuccess(state, action) {
         const value = action.payload;
         state[value] = false;
      },
      getFriendsSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateListFriend = true;
         const { users, totalPages, count } = action.payload;
         users.forEach((user) => (state.usersById[user._id] = user));
         state.currentPageUsers = users.map((user) => user._id);
         state.totalPages = totalPages;
         state.totalUsers = count;
      },
      getSendRequestSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateRequest = true;
         const { users, totalPages, count } = action.payload;
         users.forEach((user) => (state.usersById[user._id] = user));
         state.currentPageUsers = users.map((user) => user._id);
         state.totalPages = totalPages;
         state.totalUsers = count;
      },
      getUsersSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         const { users, totalPages, count } = action.payload;
         users.forEach((user) => (state.usersById[user._id] = user));
         state.currentPageUsers = users.map((user) => user._id);
         state.totalPages = totalPages;
         state.totalUsers = count;
         state.isUpdateListUsers = true;
      },
      sendFriendRequestSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateRequest = true;
         state.isUpdateListFriend = true;
         const targetUserId = action.payload.to;
         state.usersById[targetUserId].friendship = action.payload;
      },
      sendCancelRequestSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateRequest = true;
         state.isUpdateListFriend = true;
         const targetUserId = action.payload;
         state.usersById[targetUserId].friendship = null;
      },
      sendUnfriendSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateListFriend = true;
         const targetUserId = action.payload;
         state.usersById[targetUserId].friendship = null;
      },
      UpdateRequestSuccess(state, action) {
         state.isLoading = false;
         state.error = null;
         state.isUpdateListFriend = true;
         state.isUpdateRequest = true;
         const targetUserId = action.payload.from;
         state.usersById[targetUserId].friendship = action.payload;
      },
   },
});

export const getUsers =
   ({ filterName, page = 1, limit = 12 }) =>
   async (dispatch) => {
      dispatch(friendSlice.actions.startLoading());
      try {
         const params = { page, limit };
         if (filterName) params.name = filterName;
         const response = await apiService.get('/users', { params });
         dispatch(friendSlice.actions.getUsersSuccess(response.data));
      } catch (error) {
         dispatch(friendSlice.actions.hasError(error));
         toast.error(error.message);
      }
   };
export const getFriends =
   ({ filterName, page = 1, limit = 4 }) =>
   async (dispatch) => {
      dispatch(friendSlice.actions.startLoading());
      try {
         const params = { page, limit };
         if (filterName) params.name = filterName;
         const response = await apiService.get('/friends', { params });
         dispatch(friendSlice.actions.getFriendsSuccess(response.data));
      } catch (error) {
         toast.error(error.message);
         dispatch(friendSlice.actions.hasError(error.message));
      }
   };

export const getRequest =
   ({ filterName, page = 1, limit = 4, option }) =>
   async (dispatch) => {
      dispatch(friendSlice.actions.startLoading());
      try {
         const params = { page, limit };
         if (filterName) params.name = filterName;
         // console.log(filterName);
         const response = await apiService.get(`/friends/requests/${option}`, {
            params,
         });

         dispatch(friendSlice.actions.getSendRequestSuccess(response.data));
      } catch (error) {
         toast.error(error.message);
         dispatch(friendSlice.actions.hasError(error.message));
      }
   };
// option = 'outgoing' Get a list of users that the current user have sent friend requests to.
// option = 'income' Get a list of users who have sent friend requests to the current user.
export const sendFriendRequest = (targetUserId) => async (dispatch) => {
   dispatch(friendSlice.actions.startLoading());
   try {
      const response = await apiService.post(`/friends/requests`, {
         to: targetUserId,
      });
      toast.info('Request send');
      dispatch(friendSlice.actions.sendFriendRequestSuccess(response.data));
   } catch (error) {
      toast.error(error.message);
      dispatch(friendSlice.actions.hasError(error.message));
   }
};

export const sendUnfriend = (targetUserId) => async (dispatch) => {
   dispatch(friendSlice.actions.startLoading());
   try {
      await apiService.delete(`/friends/${targetUserId}`);
      dispatch(getCurrentUserProfile());
      toast.warn('Oh!! no you loss one friend');
      dispatch(friendSlice.actions.sendUnfriendSuccess(targetUserId));
   } catch (error) {
      toast.error(error.message);
      dispatch(friendSlice.actions.hasError(error.message));
   }
};
export const sendCancelRequest = (targetUserId) => async (dispatch) => {
   dispatch(friendSlice.actions.startLoading());
   try {
      await apiService.delete(`/friends/requests/${targetUserId}`);
      toast.info('Cancel request');
      dispatch(friendSlice.actions.sendCancelRequestSuccess(targetUserId));
   } catch (error) {
      toast.error(error.message);
      dispatch(friendSlice.actions.hasError(error.message));
   }
};

export const UpdateRequest = (targetUserId, status) => async (dispatch) => {
   dispatch(friendSlice.actions.startLoading());
   try {
      const response = await apiService.put(
         `/friends/requests/${targetUserId}`,
         {
            status: status,
         },
      );
      dispatch(friendSlice.actions.UpdateRequestSuccess(response.data));
      if (status === 'accepted') {
         toast.success('Congrats you have a new friend');
         dispatch(getCurrentUserProfile());
      }
   } catch (error) {
      toast.error(error.message);
      dispatch(friendSlice.actions.hasError(error.message));
   }
};
const { actions, reducers } = friendSlice;
export const { updateSuccess, reset } = actions;

export default friendSlice;
