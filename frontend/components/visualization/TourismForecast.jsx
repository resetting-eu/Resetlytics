'use client'

import React, { useMemo, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRetrieveUserQuery } from '@redux/features/auth/authApiSlice';
import MenuModule from '@components/menus/MenuModule'
import ForecastVisuals from '@components/visuals/ForecastVisuals'
import { TasksProvider } from '@components/context/TaskContext';

const menu = {
  label: 'Tourism Forecast',
  value: 4,
  option_default: 1,
  options: [
      {label: 'EU', value: '1', islevel2: false},
      {label: 'AL', value: '2', islevel2: false},
      {label: 'GR', value: '3', islevel2: false},
      {label: 'IT', value: '4', islevel2: false},
      {label: 'PT', value: '5', islevel2: false},
      {label: 'SP', value: '6', islevel2: false},
  ],
}

export default function Forecast() {
  
  return (
    <TasksProvider>
      <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
          <Typography align="center" variant="h5" color="text.primary">Forecast - Under Development</Typography>
      </Container>
      </TasksProvider>
  )
}
// <MenuModule menu={menu} />
// <ForecastVisuals />

