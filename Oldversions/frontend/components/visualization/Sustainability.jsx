'use client'
import React, { useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Grid, Container, Button, Typography } from '@mui/material';

import MenuModule from '@components/menus/MenuModule';
import SustainabilityVisuals from '@components/visuals/SustainabilityVisuals'
import { TasksProvider } from '@components/context/TaskContext';

const menu = {
  label: 'Sustainability',
  value: 3,
  option_default: 3,
  options: [
      {label: 'Questionnaire', value: 1, islevel2: false},
      {label: 'Survey', value: 2, islevel2: false},
      {label: 'Overview', value: 3, islevel2: true,
            level2: [
                {label: 'Economic', value: 4},
                {label: 'Social', value: 5},
                {label: 'Environment', value: 6},
                {label: 'Demographics', value: 7},
            ],
        },
  ],
}


export default function Sustainability() {
 
  const [dict, setDict] = useState({})
  const { isAuthenticated } = useAppSelector(state => state.auth);   

  return (
    <TasksProvider>
    <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
          <MenuModule menu={menu} />
          <SustainabilityVisuals />
      </Container>
    </TasksProvider>
  )
}
