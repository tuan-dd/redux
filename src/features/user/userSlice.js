import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import { toast } from 'react-toastify';
const initialState = {
   isLoading: false,
   error: null,
   currentUser: null,
   selectedUser: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      startLoading(state) {
         state.isLoading = true;
      },
      hasError(state, action) {
         state.isLoading = false;
         state.error = action.payload;
      },
      updateUserProfileSuccess(state, action) {
         state.isLoading = false;
         state.error = null;

         const updatedUser = action.payload;
         state.currentUser = updatedUser;
      },
      getTargetUserSuccess(state, action) {
         state.isLoading = false;
         state.error = null;

         const updatedUser = action.payload;
         state.selectedUser = updatedUser;
      },
   },
});

export default userSlice.reducer;

export const getCurrentUserProfile = () => async (dispatch) => {
   dispatch(userSlice.actions.startLoading());
   try {
      const response = await apiService.get('/users/me');
      dispatch(userSlice.actions.updateUserProfileSuccess(response.data));
   } catch (error) {
      toast.error(error.message);
      dispatch(userSlice.actions.hasError(error.message));
   }
};
export const getUpdateUserProfile = (data, userId) => async (dispatch) => {
   dispatch(userSlice.actions.startLoading());
   try {
      const {
         name,
         avatarUrl,
         coverUrl,
         aboutMe,
         city,
         country,
         company,
         jobTitle,
         facebookLink,
         instagramLink,
         linkedinLink,
         twitterLink,
      } = data;
      const response = await apiService.put(`/users/${userId}`, {
         name,
         avatarUrl,
         coverUrl,
         aboutMe,
         city,
         country,
         company,
         jobTitle,
         facebookLink,
         instagramLink,
         linkedinLink,
         twitterLink,
      });
      dispatch(userSlice.actions.updateUserProfileSuccess(response.data));
      toast.success('Update profile success');
   } catch (error) {
      toast.error(error.message);
      dispatch(userSlice.actions.hasError(error.message));
   }
};

export const getTargetUser = (userId) => async (dispatch) => {
   dispatch(userSlice.actions.startLoading());
   try {
      const response = await apiService.get(`/users/${userId}`);
      dispatch(userSlice.actions.getTargetUserSuccess(response.data));
   } catch (error) {
      toast.error(error.message);
      dispatch(userSlice.actions.hasError(error.message));
   }
};
