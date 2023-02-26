import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { FormProvider, FTextField, FUploadAvatar } from '../../components/form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateUserProfile } from './userSlice';
import { useCallback } from 'react';
const yupSchema = Yup.object().shape({
   name: Yup.string().required('Content is required'),
});
function AccountGeneral() {
   const { user } = useAuth();
   const defaultValues = {
      avatarUrl: user?.avatarUrl || null,
      name: user?.name || '',
      email: user?.email || '',
      jobTitle: user?.jobTitle || '',
      company: user?.company || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
      coverUrl: user?.coverUrl || '',
      aboutMe: user?.aboutMe || '',
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
   } = methods;
   const array = Object.keys(defaultValues)
      .filter((item) => item !== 'avatarUrl')
      .map((item) => {
         if (item === 'coverUrl') {
            return { value: item, rows: 1, xs: 12 };
         } else if (item === 'aboutMe') {
            return { value: item, rows: 4, xs: 12 };
         } else {
            return { value: item, rows: 1, xs: 6 };
         }
      });
   const dispatch = useDispatch();
   const { isLoading } = useSelector((state) => state.user);
   const onSubmit = (data) => {
      console.log(data);
      dispatch(getUpdateUserProfile(data, user._id));
   };
   const handleDrop = useCallback(
      (acceptedFiles) => {
         if (acceptedFiles) {
            const file = acceptedFiles[0];

            if (file) {
               setValue(
                  'avatarUrl',
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
      <Box>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={2}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                     <FUploadAvatar
                        name='avatarUrl'
                        accept={{
                           'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
                        }}
                        maxSize={3145728}
                        onDrop={handleDrop}
                     />
                     <Typography
                        variant='caption'
                        sx={{
                           mt: 2,
                           display: 'block',
                        }}
                     >
                        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                     </Typography>
                  </Card>
               </Grid>
               <Grid item xs={12} md={8}>
                  <Card sx={{ p: 2 }}>
                     <Grid container spacing={2}>
                        {array?.map((item) => (
                           <Grid item xs={item.xs} key={item.value}>
                              <FTextField
                                 label={item.value}
                                 variant='outlined'
                                 name={item.value}
                                 rows={item.rows}
                                 fullWidth
                                 multiline
                              />
                           </Grid>
                        ))}
                     </Grid>
                     <Stack alignItems='flex-end' sx={{ mt: 3 }}>
                        <LoadingButton
                           type='submit'
                           variant='contained'
                           loading={isSubmitting || isLoading}
                        >
                           Save Changes
                        </LoadingButton>
                     </Stack>
                  </Card>
               </Grid>
            </Grid>
         </FormProvider>
      </Box>
   );
}

export default AccountGeneral;
