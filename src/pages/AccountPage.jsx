import React, { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountGeneral from '../features/user/AccountGeneral';
import AccountSocialLinks from '../features/user/AccountSocialLinks';
import useAuth from '../hooks/useAuth';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
function AccountPage() {
   const [currentTab, setCurrentTab] = useState('general');
   const ACCOUNT_TABS = [
      {
         value: 'general',
         icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
         component: <AccountGeneral />,
      },
      {
         value: 'SocialLinks',
         icon: <ShareIcon sx={{ fontSize: 24 }} />,
         component: <AccountSocialLinks />,
      },
   ];
   return (
      <Container sx={{ flexGrow: 1, mt: 3 }}>
         <Typography variant='h5' gutterBottom>
            Account Settings
         </Typography>
         <Tabs
            value={currentTab}
            scrollButtons='auto'
            variant='scrollable'
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
         >
            {ACCOUNT_TABS.map((tab) => (
               <Tab
                  disableRipple
                  key={tab.value}
                  label={tab.value.toLocaleUpperCase()}
                  icon={tab.icon}
                  value={tab.value}
               />
            ))}
         </Tabs>
         {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
         })}
      </Container>
   );
}

export default AccountPage;
