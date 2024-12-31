'use client'

import * as React from 'react';

//import { useAppSelector, useAppDispatch } from '@/redux/hooks';
//import { useRetrieveUserQuery } from '@redux/features/auth/authApiSlice';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import VisSentimentAnalysis from './VisSentimentAnalysis';
import VisWordCloud from './VisWordCloud';


import { useTasks } from '@components/context/TaskContext';

function Overview() {
  return (
    <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
      <item>
        <><p></p></>
        <Typography mt={2} align='left' paragraph={true} variant="title1" color="text.primary">
            The reviews collected from the service quality surveys are analysed using sentiment analysis, which are analytical techniques 
            that captured the valance of comments.
            </Typography>
            <Typography mt={2} align='left' paragraph={true} variant="title1" color="text.primary">
            We know that the more positive are the reviews, the better will be respondents intentions to return and recommend your company to others.
            </Typography>
      </item>
      <item>
      <Typography paragraph={true} align="left" variant="title1" color="text.primary">
        Regarding the processing methodology, the algorithms used to capture the valance of comments are based on machine learning techniques for natural language processing. 
      </Typography>
      </item>
      </Stack>
  )
}
 // just the 1st company
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
          subheader={'Customers perception based on written reviews as if it was meant to be placed in a reviewing platform.'}
          />
          <CardContent>
            <Typography paragraph={true} variant="body2" color="text.primary">
            {org['location']}{', '}{org['country']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            {'Main activity: '}{org['main_activity']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            The reviews collected from running service quality surveys were analysed to capture the valance of comments.
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            You also find below the words most often mentioned in the reviews. 
            </Typography>
          </CardContent>
        </Card>
      </item>
    
      <item>
      <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Sentiment based on reviews</Typography>
            </Grid>
            <Grid item xs={12}>
            <VisSentimentAnalysis data={data['sent']} />
            </Grid>
            <Grid item xs={12}>
            <Typography marginTop={6} variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Top common words from positive reviews</Typography>
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


  // { sent: Array, wc: Array }
  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 1 && Overview()}
      {selection[1] == 2 && Sentiment(data)}
    </Box>
  );
}
