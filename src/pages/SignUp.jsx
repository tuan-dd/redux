import React, { useEffect, useState } from 'react';
import { FCheckBox, FormProvider, FTextField } from '../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import * as Yup from 'yup';
import {
   Alert,
   InputAdornment,
   Stack,
   Typography,
   Box,
   Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import useAuth from '../hooks/useAuth';
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const signUpSchema = Yup.object().shape({
   yourName: Yup.string().required('not be empty'),
   email: Yup.string().email('Must enter email').required(),
   password: Yup.string()
      .required()
      .matches(
         passwordRegExp,
         'Password contain at least one numeric digit, one uppercase and one lowercase letter',
      ),
   passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
   ),
});
const defaultValues = {
   yourName: '',
   email: '',
   password: '',
   passwordConfirmation: '',
};

const styleSignUp = {
   width: 400,
   height: 450,
};
const styleIsSignedUp = {
   ...styleSignUp,
   width: 400,
   height: 200,
};

function SignUp() {
   const { signUp } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [isSignedUp, setIsSignedUp] = useState(false);
   const [errorMessage, setErrorMessage] = useState(false);
   const navigate = useNavigate();
   const methods = useForm({
      resolver: yupResolver(signUpSchema),
      defaultValues,
   });

   const {
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = methods;

   const onSubmit = async (data) => {
      try {
         await signUp(data.yourName, data.email, data.password);
         setIsSignedUp(true);
      } catch (error) {
         console.log(error);
         setErrorMessage(error);
         reset();
      }
   };
   const handleCallback = async () => {
      navigate('/login');
   };
   return (
      <Box sx={!isSignedUp ? styleSignUp : styleIsSignedUp}>
         <Typography variant='h3' textAlign='center'>
            {isSignedUp ? 'Sign up success' : 'Sign Up'}
         </Typography>
         {!isSignedUp ? (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing={3}>
                  {errorMessage && (
                     <Alert severity='error'>{errorMessage.message}</Alert>
                  )}
                  {!errorMessage && (
                     <Alert severity='info'>
                        Already have an account?{' '}
                        <LinkRouter to='/login'>Sign in</LinkRouter>
                     </Alert>
                  )}
                  <FTextField name='yourName' label='Your name' />
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
                  <FTextField
                     name='passwordConfirmation'
                     label='Password Confirmation'
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
               <LoadingButton
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                  sx={{
                     display: 'flex',
                     width: '100%',
                     mt: 2,
                  }}
               >
                  Sign Up
               </LoadingButton>
            </FormProvider>
         ) : (
            <Typography variant='p' textAlign='center'>
               You have successfully registered, Click on the
               <Button onClick={handleCallback}>Link</Button>
               to go login
            </Typography>
         )}
      </Box>
   );
}

export default SignUp;
