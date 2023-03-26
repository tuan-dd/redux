import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link as LinkRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
   Alert,
   InputAdornment,
   Stack,
   Typography,
   Box,
   Link,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { LoadingButton } from '@mui/lab';
import useAuth from '../hooks/useAuth';
import { FCheckBox, FormProvider, FTextField } from '../components/form';
// import LinkRoute from '../components/link';

const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Must enter Email').required(),
   password: Yup.string().required('not be empty'),
});

const defaultValues = {
   email: 'tuandd.310797@gmail.com',
   password: 'tuan310779',
   remember: false,
};

const style = {
   width: 400,
   height: 400,
   opacity: 0.8,
};

function LoginPage() {
   const { login, isAuthenticated } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   // console.log(defaultValues)
   const navigate = useNavigate();
   let location = useLocation();
   const methods = useForm({
      resolver: yupResolver(LoginSchema),
      defaultValues,
   });

   const {
      handleSubmit,
      formState: { isSubmitting },
      setValue,
   } = methods;
   const onSubmit = async (data) => {
      // console.log(data);
      try {
         const from = location.state?.from?.pathname || '/';
         await login(data.email, data.password, () =>
            navigate(from, { replace: true }),
         );
      } catch (error) {
         console.log(error);
         setErrorMessage(error);
         setValue('password', '');
      }
   };
   useEffect(() => {
      if (isAuthenticated) {
         const from = location.state?.from?.pathname || '/';
         navigate(from, { replace: true });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);
   return (
      <>
         <Box sx={style}>
            <Typography>Login</Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing={3}>
                  {errorMessage && (
                     <Alert severity='warning'>{errorMessage.message}</Alert>
                  )}
                  <Alert severity='info'>
                     Don’t have an account?
                     <Link
                        variant='subtitle2'
                        component={LinkRouter}
                        to='/Sign-up'
                     >
                        Get started
                     </Link>
                  </Alert>
                  <FTextField name='email' label='Email' />
                  <FTextField
                     name='password'
                     label='Password'
                     type={showPassword ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position='end'>
                              <IconButton
                                 aria-label='toggle password visibility'
                                 onClick={() => setShowPassword((e) => !e)}
                                 onMouseDown={(e) => e.preventDefault()}
                                 edge='end'
                              >
                                 {showPassword ? (
                                    <Visibility />
                                 ) : (
                                    <VisibilityOff />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
               </Stack>
               <Stack>
                  <FCheckBox
                     name='remember'
                     label='Remember me'
                     // onClick={(e) => handleStoredUser(e)}
                  />
               </Stack>
               <LoadingButton
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                  sx={{
                     display: 'flex',
                     // m: '0 auto',
                     width: '100%',
                  }}
               >
                  Login
               </LoadingButton>
            </FormProvider>

            <Box
               sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  typography: 'body1',
                  mt: 2,
               }}
            >
               <Typography
                  // onClick={() => setForgottenPassword((e) => !e)}
                  sx={{
                     textDecorationColor: 'rgba(25, 118, 210, 0.4)',
                     color: '#1976d2',
                     lineHeight: 1.43,
                     fontSize: '0.875rem',
                     cursor: 'pointer',
                     ':hover': {
                        textDecoration: 'underline',
                        filter: 'brightness(120%)',
                        color: '#646cff',
                     },
                  }}
               >
                  Forgotten password ?
               </Typography>
            </Box>
         </Box>
      </>
   );
}

export default LoginPage;
