import React, { useCallback, useEffect } from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendUpdatePost } from './postSlice';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { Box, Card, Stack, Dialog, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const yupSchema = Yup.object().shape({
   content: Yup.string().required('Content is required'),
});

export default function UpdatePost({
   isUpdateCardShow,
   post,
   setIsUpdateCardShow,
}) {
   const defaultValues = {
      content: post.content,
      image: post.image || null,
   };
   const methods = useForm({
      resolver: yupResolver(yupSchema),
      defaultValues,
   });

   const {
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
      watch,
   } = methods;
   const dataPost = useSelector((state) => state.post);
   const dataWatch = watch();
   const dispatch = useDispatch();
   const onSubmit = (data) => {
      let postId = post._id;
      dispatch(sendUpdatePost(postId, data));
   };
   const handleClose = () => {
      setIsUpdateCardShow(false);
   };
   // useEffect(() => {
   //    setValue('content', post.content);
   //    setValue('image', post.image);
   // }, []);
   const handleDrop = useCallback(
      (acceptedFiles) => {
         if (acceptedFiles) {
            const file = acceptedFiles[0];

            if (file) {
               setValue(
                  'image',
                  Object.assign(file, {
                     preview: URL.createObjectURL(file),
                  }),
               );
            }
         }
      },
      [setValue],
   );
   return (
      <div>
         <Dialog
            open={isUpdateCardShow}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
         >
            <Card sx={{ p: 3, width: 500 }}>
               <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <Stack spacing={2}>
                     <FTextField
                        multiline
                        fullWidth
                        rows={4}
                        placeholder='Share what you are thinking here...'
                        name='content'
                     />
                     <Box position='relative'>
                        <IconButton
                           size='medium'
                           color='error'
                           sx={{
                              position: 'absolute',
                              zIndex: 5,
                              top: 12,
                              right: 15,
                              display: dataWatch.image ? 'flex' : 'none',
                           }}
                           onClick={() => setValue('image', null)}
                        >
                           <ClearIcon fontSize='large' />
                        </IconButton>
                        <FUploadImage
                           name='image'
                           accept={{
                              'image/*': ['.jpeg', '.jpg', '.png'],
                           }}
                           maxSize={3145728}
                           onDrop={handleDrop}
                        />
                     </Box>
                  </Stack>
                  <Box display='flex' justifyContent='end' mt={2}>
                     <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={isSubmitting || dataPost.isLoading}
                        onClick={() => !isSubmitting && handleClose()}
                     >
                        Post
                     </LoadingButton>
                  </Box>
               </FormProvider>
            </Card>
         </Dialog>
      </div>
   );
}
