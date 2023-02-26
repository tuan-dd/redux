import React from 'react';

import { Box, Card, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';

import { FormProvider, FTextField } from '../../components/form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateUserProfile } from './userSlice';
const SOCIAL_LINKS = [
   {
      value: 'facebookLink',
      icon: <FacebookIcon sx={{ fontSize: 30 }} />,
   },
   {
      value: 'instagramLink',
      icon: <InstagramIcon sx={{ fontSize: 30 }} />,
   },
   {
      value: 'linkedinLink',
      icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
   },
   {
      value: 'twitterLink',
      icon: <TwitterIcon sx={{ fontSize: 30 }} />,
   },
];
function AccountSocialLinks() {
   const { user } = useAuth();
   const defaultValues = {
      facebookLink: user?.facebookLink || '',
      instagramLink: user?.instagramLink || '',
      linkedinLink: user?.linkedinLink || '',
      twitterLink: user?.twitterLink || '',
   };
   const methods = useForm({
      defaultValues,
   });
   const {
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
   } = methods;
   const dispatch = useDispatch();
   const { isLoading } = useSelector((state) => state.user);
   const onSubmit = (data) => {
      console.log(data);
      dispatch(getUpdateUserProfile(data, user._id));
   };
   console.log('run');
   return (
      <Card sx={{ p: 2 }}>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
               {SOCIAL_LINKS.map((link) => (
                  <FTextField
                     key={link.value}
                     name={link.value}
                     id='input-with-icon-textfield'
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position='start'>
                              {link.icon}
                           </InputAdornment>
                        ),
                     }}
                     variant='outlined'
                  />
               ))}
            </Stack>
            <Stack alignItems='flex-end' sx={{ mt: 2 }}>
               <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isSubmitting || isLoading}
               >
                  Save Changes
               </LoadingButton>
            </Stack>
         </FormProvider>
      </Card>
   );
}

export default AccountSocialLinks;
