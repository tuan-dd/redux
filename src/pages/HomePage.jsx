import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Box, Card, Container, Tab, Tabs } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import Profile from '../features/user/Profile';
import FriendRequests from '../features/friends/FriendRequests';
import FriendList from '../features/friends/FriendList';
import AddFriend from '../features/friends/AddFriend';
import { styled } from '@mui/material/styles';
import ProfileCover from '../features/user/ProfileCover';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
   zIndex: 9,
   bottom: 0,
   right: 0,
   width: '100%',
   display: 'flex',
   position: 'absolute',
   backgroundColor: '#fff',
   [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
   },
   [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(3),
   },
}));

function HomePage() {
   const { user } = useAuth();
   const [currentTab, setCurrentTab] = useState('profile');
   const PROFILE_TABS = [
      {
         value: 'profile',
         icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
         component: <Profile profile={user} />,
      },
      {
         value: 'friends',
         icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
         component: <FriendList />,
      },
      {
         value: 'requests',
         icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
         component: <FriendRequests />,
      },
      {
         value: 'add_friend',
         icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
         component: <AddFriend />,
      },
   ];
   const handleChange = (event, newValue) => {
      setCurrentTab(newValue);
   };
   return (
      <Container sx={{ flexGrow: 1, paddingY: 3 }}>
         <Card
            sx={{
               mb: 3,
               height: 280,
               position: 'relative',
            }}
         >
            <ProfileCover profile={user} />
            <TabsWrapperStyle>
               <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons='auto'
                  aria-label='scrollable auto tabs example'
               >
                  {PROFILE_TABS.map((tab) => (
                     <Tab
                        disableRipple
                        key={tab.value}
                        value={tab.value}
                        icon={tab.icon}
                        label={tab.value.toLocaleUpperCase()}
                     />
                  ))}
               </Tabs>
            </TabsWrapperStyle>
         </Card>
         {PROFILE_TABS.map((item) => {
            return (
               item.value === currentTab && (
                  <Box key={item.value}>{item.component}</Box>
               )
            );
         })}
      </Container>
   );
}

export default HomePage;
