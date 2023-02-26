import React from 'react';
import { useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';

import SendRequests from './SendRequests';
import ReceiveRequests from './ReceiveRequests';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
const REQUEST_TABS = [
   { value: 'Send', element: <SendRequests />, icon: <SendIcon /> },
   {
      value: 'Receive',
      element: <ReceiveRequests />,
      icon: <PeopleAltIcon />,
   },
];
function FriendRequests() {
   const [currentTab, setCurrentTab] = useState('Send');
   const handleChange = (event, newValue) => {
      setCurrentTab(newValue);
   };
   return (
      <Container>
         <Typography variant='h4' sx={{ mb: 3 }}>
            Friend Requests
         </Typography>
         <Tabs
            value={currentTab}
            scrollButtons='auto'
            variant='scrollable'
            allowScrollButtonsMobile
            onChange={handleChange}
         >
            {REQUEST_TABS.map((tab) => (
               <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.value}
               />
            ))}
         </Tabs>
         {REQUEST_TABS.map((tab, index) => {
            const isMatched = currentTab;
            return (
               isMatched === tab.value && <Box key={index}>{tab.element}</Box>
            );
         })}
      </Container>
   );
}

export default FriendRequests;
