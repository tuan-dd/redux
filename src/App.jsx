import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import BlankLayout from './layouts/BlankLayout';
import MainLayout from './layouts/MainLayout';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUp from './pages/SignUp';
import UserProfilePage from './pages/UserProfilePage';
import AuthRequire from './routers/AuthRequire';
import theme from './theme';
import { deepmerge } from '@mui/utils';
import {
   Experimental_CssVarsProvider as CssVarsProvider,
   experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';

const muiTheme = extendMuiTheme(theme);
const joyTheme = extendJoyTheme({
   // This is required to point to `var(--mui-*)` because we are using
   // `CssVarsProvider` from Material UI.
   cssVarPrefix: 'mui',
   colorSchemes: {
      light: {
         palette: {
            primary: {
               // ...blue,
               solidColor: 'var(--mui-palette-primary-contrastText)',
               solidBg: 'var(--mui-palette-primary-main)',
               solidHoverBg: 'var(--mui-palette-primary-dark)',
               plainColor: 'var(--mui-palette-primary-main)',
               plainHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               plainActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
               outlinedBorder:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
               outlinedColor: 'var(--mui-palette-primary-main)',
               outlinedHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               outlinedHoverBorder: 'var(--mui-palette-primary-main)',
               outlinedActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
            },
            neutral: {
               // ...grey,
            },
            // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
            divider: 'var(--mui-palette-divider)',
            text: {
               tertiary: 'rgba(0 0 0 / 0.56)',
            },
         },
      },
      // Do the same for dark mode
      // dark: { ... }
   },
   fontFamily: {
      display: '"Roboto","Helvetica","Arial",sans-serif',
      body: '"Roboto","Helvetica","Arial",sans-serif',
   },
   shadow: {
      xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
      sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
      md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
      lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
      xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
   },
});

// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)`
// because some of the values in the Joy UI theme refers to CSS variables and
// not raw colors.
const allTheme = deepmerge(joyTheme, muiTheme);

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <AuthRequire>
            <MainLayout />
         </AuthRequire>
      ),
      errorElement: <NotFoundPage />,
      children: [
         { index: true, element: <HomePage /> },
         { path: 'user/:userId', element: <UserProfilePage /> },
         { path: 'account', element: <AccountPage /> },
      ],
   },
   {
      element: <BlankLayout />,
      children: [
         { path: 'login', element: <LoginPage /> },
         {
            path: 'Sign-up',
            element: <SignUp />,
         },
      ],
   },
]);
function App() {
   return (
      <>
         <CssVarsProvider theme={allTheme}>
            <AuthProvider>
               <RouterProvider router={router} />
            </AuthProvider>
         </CssVarsProvider>
      </>
   );
}

export default App;
