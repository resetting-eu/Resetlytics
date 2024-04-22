import * as React from 'react';

import { useTasks, useTasksDispatch } from '@components/context/TaskContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import Stack from '@mui/material/Stack';

function NoInformation() {
  return (
    <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
            {'No comparative information is available yet'}
    </Typography>
  )
}

import Questionnaire from '@components/viewers/Questionnaire'

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

  


export default function SustainabilityVisuals() {

  // var tabSX = {
  //   "&.Mui-selected": { color: "#46b3c2" },
  //   textTransform: 'capitalize',
  //   fontSize: 18,
  //   fontFamily: 'inter',
  //   fontWeight: 500,
  //   color: 'black',
  //   "&:hover": {
  //     color: "#46b3c2",
  //   },
  // }
  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })

  // <MyTaskList />
  
  const purpose = 'sustainability'
  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 1 && Questionnaire(purpose)}
      {selection[1] == 3 && selection[2] == 4 && NoInformation()}
      {selection[1] == 3 && selection[2] == 5 && NoInformation()}
      {selection[1] == 3 && selection[2] == 6 && NoInformation()}
      {selection[1] == 3 && selection[2] == 7 && NoInformation()}      
    </Box>
  )
}
