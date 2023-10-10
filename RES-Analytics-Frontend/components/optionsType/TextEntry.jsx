'use client'

import React from 'react'
import { Typography, Box } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';


export default function MultipleChoice({ isAuthenticated, info }) {
  return (
    <Box display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{ width: '80vw', mt: '4vh', p: 1 }}>
        <Typography
          inline
          align="left"
          sx={{
            fontFamily: 'inter',
            mb: '1vh',
            fontSize: 16,
            fontWeight: 500,
            color: 'black',
            textDecoration: 'none',
          }}
        >
          {info.question_fk.item_code} - {info.question_fk.text}

          {isAuthenticated ?
            <>
              <Box display='inline' sx={{
                ml: '2vw',
              }}>
                Your enterprise answered with
                <Box sx={{
                  fontFamily: 'inter',
                  fontStyle: 'italic',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'black',
                  textDecoration: 'none',
                }} display='inline'>{info.answer}% </Box> which was the answer of
                <Box sx={{
                  fontFamily: 'inter',
                  fontStyle: 'italic',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'black',
                  textDecoration: 'none',
                }} display='inline'>{info.perc}% </Box> other enterprises.
              </Box>
            </>
            :
            <>
              <Box sx={{
                fontFamily: 'inter',
                fontStyle: 'italic',
                fontSize: 24,
                ml: '2vw',
                fontWeight: 600,
                color: 'black',
                textDecoration: 'none',
              }} display='inline'></Box> On average, enterprises answered 
              <Box sx={{
                fontFamily: 'inter',
                fontStyle: 'italic',
                fontSize: 24,
                fontWeight: 600,
                color: 'black',
                textDecoration: 'none',
              }} display='inline'> {info.answer} </Box>.

            </>
          }
        </Typography>
      </Box>
    </Box >



  )
}
