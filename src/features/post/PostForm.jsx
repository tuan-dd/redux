import React, { useCallback, useRef } from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createPost } from './postSlice';
import { LoadingButton } from '@mui/lab';
import { Box, Card, IconButton, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const yupSchema = Yup.object().shape({
   content: Yup.string().required('Content is required'),
});

const defaultValues = {
   content: '',
   image: null,
};

function PostForm() {
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
   const post = useSelector((state) => state.post);
   const dataWatch = watch();
   const dispatch = useDispatch();

   // const fileInput = useRef();
   // const handleFile = (e) => {
   //    const file = fileInput.current.files[0];
   //    if (file) {
   //       setValue('image', file);
   //    }
   // };
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
   const onSubmit = (data) => {
      dispatch(createPost(data)).then(() => reset());
   };
   return (
      <Card sx={{ p: 3 }}>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
               <FTextField
                  multiline
                  fullWidth
                  rows={4}
                  placeholder='Share what you are thinking here...'
                  name='content'
               />
               {/* <FTextField
                  name='image'
                  multiline
                  fullWidth
                  rows={4}
                  placeholder='Share what you are thinking here...'
                  variant='filled'
               /> */}
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
                  loading={isSubmitting || post.isLoading}
               >
                  Post
               </LoadingButton>
            </Box>
         </FormProvider>
      </Card>
   );
}

export default PostForm;
