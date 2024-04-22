import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types';

import { useTasks, useTasksDispatch } from '@components/context/TaskContext';
import { Grid, Box, Typography } from '@mui/material';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { brown } from '@mui/material/colors';
import Stack from '@mui/material/Stack';


import DimensionBarChart from '@components/charts/DimensionBarChart'
import DimensionPieChart from '@components/charts/DimensionPieChart'

import Questionnaire from '@components/viewers/Questionnaire'


// ===================================================
// Dealing with menu option 
// ===================================================

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

        
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
            <Typography>{"Level: " + task.level}
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

 
function Indicator(indata, dimension, alldimension) {

  let data_yeartodate = {}
    let data_alltimespans = {}
    let showyeartodate = false
    data_yeartodate['indicator'] = indata['indicator']
    data_alltimespans['indicator'] = indata['indicator']
    data_yeartodate['name'] = indata['commername']
    data_alltimespans['name'] = indata['commername']

  data_yeartodate['min'] = dimension['scale_min']
    data_yeartodate['max'] = dimension['scale_max']
    data_alltimespans['min'] = dimension['scale_min']
    data_alltimespans['max'] = dimension['scale_max']
    
    if (dimension['count_Q1'] > 0) {
      const info = {
        val: dimension['Q1'], 
        count: dimension['count_Q1'],
        all: alldimension['Q1'],
        allcount: alldimension['count_Q1'],
        updated: dimension['Q1_updated_at'],
        allupdated: alldimension['Q1_updated_at']
      }
      data_alltimespans['Q1'] = info
    }
    if (dimension['count_Q2'] > 0) {
      const info = {
        val: dimension['Q2'], 
        count: dimension['count_Q2'],
        all: alldimension['Q2'],
        allcount: alldimension['count_Q2'],
        updated: dimension['Q2_updated_at'],
        allupdated: alldimension['Q2_updated_at']
      }
      data_alltimespans['Q2'] = info
      
    }
    if (dimension['count_Q3'] > 0) {
      const info = {
        val: dimension['Q3'], 
        count: dimension['count_Q3'],
        all: alldimension['Q3'],
        allcount: alldimension['count_Q3'],
        updated: dimension['Q3_updated_at'],
        allupdated: alldimension['Q3_updated_at']
      }
      data_alltimespans['Q3'] = info
      
    }
    if (dimension['count_Q4'] > 0) {
      const info = {
        val: dimension['Q4'], 
        count: dimension['count_Q4'],
        all: alldimension['Q4'],
        allcount: alldimension['count_Q4'],
        updated: dimension['Q4_updated_at'],
        allupdated: alldimension['Q4_updated_at']
      }
      data_alltimespans['Q4'] = info
      
    }
    if (dimension['count_year_to_date'] > 0) {
      const info = {
        val: dimension['year_to_date'], 
        count: dimension['count_year_to_date'],
        all: alldimension['year_to_date'],
        allcount: alldimension['count_year_to_date'],
        updated: dimension['year_to_date_updated_at'],
        allupdated: alldimension['year_to_date_updated_at']
      }
      data_alltimespans['yeartodate'] = info
      data_yeartodate['yeartodate'] = info
      showyeartodate = true
      
    }
    if (dimension['count_previous_year'] > 0) {
      const info = {
        val: dimension['previous_year'], 
        count: dimension['count_previous_year'],
        all: alldimension['previous_year'],
        allcount: alldimension['count_previous_year'],
        updated: dimension['previous_year_updated_at'],
        allupdated: alldimension['previous_year_updated_at']
      }
      data_alltimespans['preyear'] = info
    }

  const title = indata['indicator'] + ' Monitorization'
  return (
    <Stack spacing={2}>
      <item>
        <Card sx={{ maxWidth: 600 }}>
          <CardHeader 
          avatar={
            <Avatar sx={{ bgcolor: brown[500] }} aria-label="avatar">
              SQ
            </Avatar>
          }
          title={title}
          subheader={indata['year']}
          />
          <CardContent>
            <Typography paragraph={true} variant="body2" color="text.primary">
            {indata['legalname']}{' ('}{indata['commername']}{')'}
            </Typography>
            <Typography paragraph={true} variant="body2" color="text.primary">
            {indata['location']}{', '}{indata['country']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            {'Main activity: '}{indata['activ']}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.primary">
            {'Last update: '}{indata['updated'].replace(/T|Z/g, ' ')}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.secondary">
            Notice: Data has been collected via available surveys.
            </Typography>
          </CardContent>
        </Card>
      </item>
      <item>
          <Typography variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Average score from respondents</Typography>
          <Grid container>
            <Grid item xs={12}>
            {showyeartodate && <DimensionPieChart data={data_yeartodate} />}
            </Grid>
            <Grid item xs={12}>
            <DimensionBarChart data={data_alltimespans} />
            </Grid>
          </Grid>
    </item>
    </Stack>
  )
}

function Service(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Service Characteristics"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['serv']
  const alldimension = data['allservq']['serv']

  return Indicator(indata, dimension, alldimension)
}

function Reservation(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Reservation Process"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['reserv']
  const alldimension = data['allservq']['reserv']

  return Indicator(indata, dimension, alldimension)
}

function Environment(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Environment Concern"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['environ']
  const alldimension = data['allservq']['environ']

  return Indicator(indata, dimension, alldimension)
}

function Staff(data) {

  let org = data['org']
  let indata = {}
  indata['indicator'] = "Staff"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['staf']
  const alldimension = data['allservq']['staf']

  return Indicator(indata, dimension, alldimension)
}

function Technology(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Technology for Innovation"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['tech']
  const alldimension = data['allservq']['tech']

  return Indicator(indata, dimension, alldimension)
}

function Sustainability(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Social and Economic Sustainability"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['sustain']
  const alldimension = data['allservq']['sustain']

  return Indicator(indata, dimension, alldimension)
}

function Satisfaction(data) {
  
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Satisfaction"
  indata['year'] = data['year']
  indata['legalname'] = org.legal_name
  indata['commername'] = org.commercial_name
  indata['location'] = org.location
  indata['country'] = org.country
  indata['activ'] = org.main_activity
  indata['updated'] = data['updated_at']

  const dimension = data['satisf']
  const alldimension = data['allservq']['satisf']

  return Indicator(indata, dimension, alldimension)
}

function Demographics() {
  return (
    <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
            {'No comparative information is available yet'}
    </Typography>

  )
}
export default function ServiceQualityVisuals({data}) {

  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })

  // <MyTaskList />
  // console.log(data[0]) // one company
  const purpose = 'service'
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}> 
        {selection[1] == 1 && Questionnaire(purpose)}
        {selection[1] == 3 && selection[2] == 4 && Service(data[0])}
        {selection[1] == 3 && selection[2] == 5 && Reservation(data[0])}
        {selection[1] == 3 && selection[2] == 6 && Environment(data[0])}
        {selection[1] == 3 && selection[2] == 7 && Staff(data[0])}
        {selection[1] == 3 && selection[2] == 8 && Technology(data[0])}
        {selection[1] == 3 && selection[2] == 9 && Sustainability(data[0])}
        {selection[1] == 3 && selection[2] == 10 && Satisfaction(data[0])}
        {selection[1] == 3 && selection[2] == 11 && Demographics()}
    </Box>
  );
}

