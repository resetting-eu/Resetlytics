import * as React from 'react';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useTasks, useTasksDispatch } from '@components/context/TaskContext';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRetrieveUserQuery } from '@redux/features/auth/authApiSlice';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import VisForecast from '@components/visuals/VisForecast'
function MyTaskList() {
    const tasks = useTasks();
    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Typography>{"==================="}
            </Typography>
            <Typography>{"ID: " + task.id}
            </Typography>
            <Typography>{"Label: " + task.label}
            </Typography>
            <Typography>{"Level " + task.level}
            </Typography>
            <Typography>{"Value: " +task.value}
            </Typography>
            <Typography>{"Status: " + task.status}
            </Typography>
          </li>
        ))}
      </ul>
    );
  }

  
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

//
      
export default function ForecastVisuals() {

  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })


  const { data: user } = useRetrieveUserQuery();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 5 && Portugal()}
    </Box>
  );
}



