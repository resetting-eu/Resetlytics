'use client'

import * as React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import VisForecast from '@components/visuals/VisForecast'

import { useTasks } from '@components/context/TaskContext';

function Portugal() {

  return (
    <Stack spacing={2}>
      <item>
        <Card sx={{ maxWidth: 600 }}>
          <CardHeader 
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
              F
            </Avatar>
          }
          title="Forecasting tourism"
          subheader="Portugal"
          />
          <CardContent>
            <Typography paragraph={true} variant="body2" color="text.primary">
            Arrivals in Portuguese airports and prediction in a 12-month horizon
            </Typography>
            <Typography align="left" variant="body2" color="text.primary">
            Disclaimer: The monthly chart depicted below is based on statistical and deep-learning data models.
            </Typography>
            <Typography align="left" variant="body2" color="text.primary">
            Data sources: Eurostat, Eurocontrol.
            </Typography>
          </CardContent>
        </Card>
      </item>
      <item>
      <Typography variant="h6" gutterBottom color="primary" >Arrivals in airports</Typography>
          <VisForecast />
          </item>
    </Stack>
  )

  }
  
export default function ForecastVisuals() {

  //const { data: user } = useRetrieveUserQuery();
  //const { isAuthenticated } = useAppSelector(state => state.auth);

  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })


  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 5 && Portugal()}
    </Box>
  );
}



