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

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import VisSentimentAnalysis from './VisSentimentAnalysis';
import VisWordCloud from './VisWordCloud';

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

 
function Sentiment(data) {

  const org = data['sent'][0].org
  const title = org['legal_name'] + ' (' + org['commercial_name'] + ')'
  
  return (
    <Stack spacing={2}>
      <item>
        <Card sx={{ maxWidth: 600 }}>
          <CardHeader 
          avatar={
            <Avatar sx={{ bgcolor: orange[500] }} aria-label="avatar">
              SA
            </Avatar>
          }
          title={title}
          subheader={'Customers perception'}
          />
          <CardContent>
            <Typography paragraph={true} variant="body2" color="text.primary">
            {org['location']}{', '}{org['country']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            {'Main activity: '}{org['main_activity']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.secondary">
            Notice: Data has been collected via available surveys and classification of sentiments are obtained via natural language processing.
            </Typography>
          </CardContent>
        </Card>
      </item>
      <item>
      
      <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Sentiment based on comments</Typography>
            </Grid>
            <Grid item xs={12}>
            <VisSentimentAnalysis data={data['sent']} />
            </Grid>
            <Grid item xs={12}>
            <Typography marginTop={6} variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Top common words from positive comments</Typography>
            </Grid>
            <Grid item xs={8}>
            <VisWordCloud data={data['wc']} />
            </Grid>
          </Grid>
      </item>
      
    </Stack>
  )

  }

      
export default function SentimentAnalysisVisuals({data}) {

  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })




  var tabSX = {
    "&.Mui-selected": { color: "#46b3c2" },
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: 'inter',
    fontWeight: 500,
    color: 'black',
    "&:hover": {
      color: "#46b3c2",
    },
  }


  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 2 && Sentiment(data)}
    </Box>
  );
}



