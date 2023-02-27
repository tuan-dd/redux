import { Avatar, Box, Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import React from 'react';

const getPathCover = import.meta.glob('/public/cover/*');
const adjustPathCover = Object.keys(getPathCover).map((image) =>
   image.replace('/public', ''),
);
const RootStyle = styled('div')(({ theme }) => ({
   // position: 'relative',
   width: '100%',
   height: '100%',
}));
const InfoStyle = styled('div')(({ theme }) => ({
   position: 'absolute',
   columnGap: 10,
   zIndex: 50,
   left: 0, // max width
   right: 0,
   marginTop: 30,
   [theme.breakpoints.up('md')]: {
      right: 'auto',
      display: 'flex',
      alignItems: 'center',
      left: theme.spacing(3),
      bottom: theme.spacing(3),
   },
}));

function ProfileCover({ profile }) {
   const handleError = (e) => {
      const pathRandom =
         adjustPathCover[Math.floor(Math.random() * adjustPathCover.length)];
      e.target.src = pathRandom;
      e.target.onError = null;
   };
   const { avatarUrl, jobTitle, name, coverUrl } = profile;
   return (
      <RootStyle>
         <InfoStyle>
            <Avatar
               src={avatarUrl}
               alt={name}
               sx={{
                  mx: 'auto',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: 'common.white',
                  width: { xs: 80, md: 128 },
                  height: { xs: 80, md: 128 },
               }}
            />
            <Box
               sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  color: 'black',
               }}
            >
               <Typography variant='h5' color='common.white'>
                  {name}
               </Typography>
               <Typography color='common.white'>{jobTitle}</Typography>
            </Box>
         </InfoStyle>
         <Box
            sx={{
               overflow: 'hidden',
               height: '280px',
            }}
         >
            <AspectRatio
               // ratio='16/6'
               // width='100%'
               // height='fit-content'
               // minHeight={120}
               maxHeight={280}
               objectFit='fill'
            >
               <figure>
                  <img
                     src={coverUrl}
                     alt='profile cover'
                     onError={handleError}
                     loading='lazy'
                  />
               </figure>
            </AspectRatio>
         </Box>
      </RootStyle>
   );
}

export default ProfileCover;
