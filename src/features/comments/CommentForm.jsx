import React, { useEffect } from 'react';
import { FormProvider, FTextField } from '../../components/form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Stack } from '@mui/material';
import { createComment } from './commentSlice';
import useAuth from '../../hooks/useAuth';
const yupSchema = Yup.object().shape({
   content: Yup.string().required('Content is required'),
});
const defaultValues = {
   content: '',
};
function CommentForm({ postId }) {
   const methods = useForm({
      resolver: yupResolver(yupSchema),
      defaultValues,
   });
   const {
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
   } = methods;
   const { currentUser } = useSelector((state) => state.user);
   const { user } = useAuth();
   const onSubmit = (data) => {
      dispatch(createComment({ content: data.content, postId })).then(() =>
         reset(),
      );
   };
   const dispatch = useDispatch();
   return (
      <Stack direction='row' spacing={1.5}>
         <Box sx={{ flexGrow: 0 }}>
            <Avatar alt={user.name} src={user.avatarUrl} />
         </Box>
         <Box sx={{ flexGrow: 1 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
               <Stack flexDirection='row'>
                  <FTextField
                     placeholder='Write a comment...'
                     name='content'
                     color='warning'
                  />
                  <LoadingButton type='submit'>
                     <SendIcon />
                  </LoadingButton>
               </Stack>
            </FormProvider>
         </Box>
      </Stack>
   );
}

export default CommentForm;
