import React, { useEffect } from 'react';
import { FormProvider, FTextField } from '../../components/form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { Box, Stack } from '@mui/material';
import { sendUpdateComment } from './commentSlice';
const yupSchema = Yup.object().shape({
   content: Yup.string().required('Content is required'),
});
const defaultValues = {
   content: '',
};
function UpdateComment({ comment, setIsUpdateCommentShow }) {
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
   const dispatch = useDispatch();
   const DataComment = useSelector((state) => state.comment);
   const onSubmit = (data) => {
      dispatch(
         sendUpdateComment({ content: data.content, commentId: comment._id }),
      ).then(() => reset());
      if(!DataComment.isLoading){
         setIsUpdateCommentShow(false);
      }
   };
   useEffect(() => {
      setValue('content', comment.content);
   }, []);

   return (
      <Box sx={{ flexGrow: 1 }}>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack flexDirection='row'>
               <FTextField
                  placeholder='Write a comment...'
                  name='content'
                  color='warning'
               />
               <LoadingButton
                  type='submit'
                  loading={isSubmitting || DataComment.isLoading}
               >
                  <SendIcon />
               </LoadingButton>
            </Stack>
         </FormProvider>
      </Box>
   );
}

export default UpdateComment;
