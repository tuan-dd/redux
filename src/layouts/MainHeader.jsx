import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../components/Logo';
import { Container, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const settings = ['My Profile', 'Account Settings', 'Logout'];

function MainHeader() {
   const [anchorElUser, setAnchorElUser] = React.useState(null);
   const navigate = useNavigate();
   const { logout, user } = useAuth();
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const handleUserItemClick = (event, setting) => {
      const actions = new Map([
         ['My Profile', () => navigate('/')],
         ['Account Settings', () => navigate('/account')],
         ['Logout', () => logout(() => navigate('/login'))],
      ]);
      let action = actions.get(setting) || '';
      action();
   };

   return (
      <AppBar position='static' sx={{ backgroundColor: 'white', flexGrow: 0 }}>
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Box
                  sx={{
                     display: { xs: 'none', md: 'flex', alignItems: 'center' },
                     mr: 0,
                     flexGrow: 0,
                  }}
               >
                  <Logo
                     sx={{
                        width: 80,
                        height: 80,
                     }}
                  />
                  <Typography variant='h4' color='#2c55a0' pt={2}>
                     FaceBook
                  </Typography>
               </Box>
               <Box
                  sx={{
                     display: { xs: 'none', md: 'flex' },
                     flexGrow: 1,
                     justifyContent: 'flex-end',
                  }}
               >
                  <Tooltip title='Open settings'>
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user.name} src={user.avatarUrl} />
                     </IconButton>
                  </Tooltip>
               </Box>

               {/* max width <600 px */}
               <Box
                  sx={{
                     display: { xs: 'flex', md: 'none' },
                     mr: 1,
                     flexGrow: 1,
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <Logo
                     sx={{
                        width: 80,
                        height: 80,
                     }}
                  />
                  <Typography variant='h4' color='#2c55a0' pt={2}>
                     FaceBook
                  </Typography>
               </Box>

               <Box
                  sx={{
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 0,
                     justifyContent: 'flex-end',
                  }}
               >
                  <Tooltip title='Open settings'>
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt='Remy Sharp' src='' />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{
                        mt: '45px',
                     }}
                     id='menu-appbar'
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     <Typography paddingX={2} mt={1}>
                        Tuan
                     </Typography>
                     <Typography paddingX={2} mb={2}>
                        Tuanprodd@gmail.com
                     </Typography>
                     <Divider
                        sx={{ borderStyle: 'dashed', fontSize: '10px' }}
                     />
                     {settings.map((setting) => (
                        <MenuItem
                           key={setting}
                           onClick={(event) =>
                              handleUserItemClick(event, setting)
                           }
                        >
                           <Typography textAlign='center'>{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
export default MainHeader;
