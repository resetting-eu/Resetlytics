'use client'

import * as React from 'react';

import { Stack, Box, Typography, List, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { useTasks } from '@components/context/TaskContext';

function NoInformation() {
  return (
    <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
       {'No information in this regard is available yet.'}
    </Typography>
  )
}

import Questionnaire from '@components/viewers/Questionnaire'

function Overview() {
  return (
    <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
      <item>
        <><p></p></>
        <Typography mt={2} align='left' paragraph={true} variant="title1" color="text.primary">
          {'The self diagnostic questionnaire on sustainability compares the performance of your company with the average of companies inspected so far. Thus you may understand your position in comparison with other SMEs and articulate your action plans. In most variables, your performance is compared with the top 25% best performing companies in the specific criteria. For the remaining ones, averages are used.'}
        </Typography>
      </item>
        <item>
        <Typography mt={1} align='left' paragraph={true} variant="title1" color="text.primary">
          {'There are three groups of criteria considered, namely: economic, social and environment. These three account for how your company performs in sustainability. Hereby you will find the details of variables collected.'}
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'ECONOMIC VARIABLES'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures variables related to the quantity and quality of employment and suppliers.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'Occupation rate during high season (average).'} />
              <ListItemText secondary={'Occupation rate during low season (average).'} />
              <ListItemText secondary={'Percentage of employees that are local residents.'} />
              <ListItemText secondary={'Average employee wage compared with national minimum wage.'} />
              <ListItemText secondary={'Average years of employee experience.'} />
              <ListItemText secondary={'Percentage of employees that received formal training in tourism (e.g. bachelor or professional courses).'} />
              <ListItemText secondary={'Percentage of suppliers that are local businesses.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'SOCIAL VARIABLES'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures variables related to your activities regarding community and social impact; health and safety; inclusion and accessibility; protecting cultural heritage.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'Activities related to the promotion of local businesses and culture.'} />
              <ListItemText secondary={'Collaboration with local associations.'} />
              <ListItemText secondary={'Level of cleanliness of your buildings.'} />
              <ListItemText secondary={'Percentage of women working.'} />
              <ListItemText secondary={'Percentage of food served at the restaurant/buffet that are local and traditional.'} />
              <ListItemText secondary={'Use of local architectural heritage.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'ENVIRONMENT VARIABLES'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures variables associated to the optimal use of resources, namely:  reducing transportation impact, solid waste management, water management, energy usage and landscape and biodiversity protection.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'Frequency of communication regarding environmental practices.'} />
              <ListItemText secondary={'Percentage of tourists and day visitors that arrive at the accommodation by car.'} />
              <ListItemText secondary={'Percentage of solid waste recycled.'} />
              <ListItemText secondary={'Percentage of food not consumed that is reused.'} />
              <ListItemText secondary={'percentage of plastic packages used in your facilities.'} />
              <ListItemText secondary={'Percentage of water that is reused.'} />
            </List>
          </AccordionDetails>
        </Accordion>

      

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'DEMOGRAPHICS'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'Sample size.'} />
              <ListItemText secondary={'Number of employees.'} />
              <ListItemText secondary={'Age.'} />
              <ListItemText secondary={'Location.'} />
              <ListItemText secondary={'Type of businesses.'} />
            </List>
          </AccordionDetails>
        </Accordion>
      </item>
    </Stack>
  )
}


function AA() {
  return (
    <>
      <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
        {'Software code is migrating!'}
      </Typography>
      <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
        {'Users can sign up the questionnaire of interest.'}
      </Typography>
      <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
        {'Link to access the questionnaire to be answered will be sent by email.'}
      </Typography>
    </>
  )
}

function Report() {
  return (
    <>
      <Typography mt={3} paragraph={true} variant="title1" color="text.primary">
        {'You will find information here about execution of surveys, e.g. number of respondents so far, etc.'}
      </Typography>
    </>
  )
}

export default function SustainabilityVisuals({ data }) {
  
  let selection = [0, 0, 0]
 
  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <=2) {
        selection[t.id] = t.value
    }
  })

  //console.log('Data inside SustainabilityVisuals: ', data)

  // part to draw analysis

  return (  
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 1 && Overview()} 
      {selection[1] == 2 && Questionnaire(data['purpose'], data['questionnaires'], data['questions'])}
      {selection[1] == 3 && Report()}
      {selection[1] == 4 && selection[2] == 41 && NoInformation()}
      {selection[1] == 4 && selection[2] == 42 && NoInformation()}
      {selection[1] == 4 && selection[2] == 43 && NoInformation()}
      {selection[1] == 4 && selection[2] == 44 && NoInformation()}      
    </Box>
  )
}

/*
 {selection[1] == 1 && Questionnaire(quest)}
*/