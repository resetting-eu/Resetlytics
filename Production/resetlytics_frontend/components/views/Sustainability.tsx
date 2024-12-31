'use client'

import React, { Suspense } from 'react'
//import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Grid, Box, Container, CircularProgress, Button, Typography } from '@mui/material';

import MenuModule from '@components/menus/MenuModule';
import SustainabilityVisuals from '@components/views/visuals/SustainabilityVisuals'
import { TasksProvider } from '@components/context/TaskContext';
import apiFetch from '@hooks/use-fetch';


const menu = {
  label: 'Sustainability',
  value: 1,
  option_default: 1,
  options: [
      {label: 'Overview', value: 1, sublabel: '', islevel2: false},
      {label: 'Questionnaire', value: 2, sublabel: '', islevel2: false},
      {label: 'Report', value: 3, sublabel: '', islevel2: false},
      {label: 'Analysis', value: 4, islevel2: true,
            level2: [
                {label: 'Economic', value: 41, sublabel: ''},
                {label: 'Social', value: 42, sublabel: ''},
                {label: 'Environment', value: 43, sublabel: ''},
                {label: 'Demographics', value: 44, sublabel: ''},
            ],
        },
  ],
}

export const SustainLoader = () => {
  return (
      <>
          <Box sx={{ display: 'flex' }}>
              <CircularProgress />
          </Box>
          <Typography>{'Loading...'}</Typography>
      </>
  )
}

type SustainProps = {
  purpose: string
  questionnaires: any;
  questions: any; 
}


export const SustainInnards = async (props: SustainProps) => {

  let dict = { purpose: "sustainability", questionnaires: {}, questions: {} }

  const purpose = "sustainability"
  const name = "Iscte Resetting" // Bru ou Istar
  const country = 'Portugal'
  const year = 2024
  const query1 = "/api/lquest/sustainability"
  const query2 = "/api/quest/15" // 15
  try {
      const result1 = await apiFetch.getWithoutToken(query1)
      const result2 = await apiFetch.getWithoutToken(query2)
      dict = { purpose: purpose, questionnaires: result1, questions: result2 } 
  } catch (e) {
      console.error(e)
      return (<Typography>{'Error loading sustainability'}</Typography>)
  }

  //props: {data: SQProps} 
  return (
      <TasksProvider>
          <Container>
              <MenuModule menu={menu} />
              <SustainabilityVisuals data={dict} /> 
          </Container>
      </TasksProvider>
  )
}


export const Sustainability = async (props: SustainProps) => {
  return (
      <Suspense fallback={<SustainLoader />}>
          {/* @ts-expect-error Server Component */}
          <SustainInnards {...props} />
      </Suspense>
  )
}