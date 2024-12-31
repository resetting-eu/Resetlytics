'use client'

import React from 'react'

import { Stack, Grid, Box, Typography, List, ListSubheader, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { brown } from '@mui/material/colors';

import DimensionBarChart from '@components/views/charts/DimensionBarChart'
import DimensionPieChart from '@components/views/charts/DimensionPieChart'

import Questionnaire from '@components/viewers/Questionnaire'

import { useTasks } from '@components/context/TaskContext';

// ====================================================================
//  REFACTORING IS NEEDED. BUT BE AWARE OF TOO MANY REACT RE-RENDERS
// ====================================================================


// sx={{ mt: 4, mb: 2 }}
function Overview() {
  return (
    <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
      <item>
        <><p></p></>
        <Typography mt={2} align='left' paragraph={true} variant="title1" color="text.primary">
          {'Monitoring the service quality of your business is an essential effort for retaining consumers and obtaining good reviews and recommendations.'}
          {' We help you to do that in four simple steps:'}
        </Typography>
        <List align='left'>
          <ListItemText primary={'1. Access your user account.'} />
          <ListItemText primary={'2. Copy the link of the questionnaire to be used.'} />
          <ListItemText primary={'3. Share the link by email with your customers after their check-out.'} />
          <ListItemText primary={'4. Access the results and check your progress.'} />
        </List>
      </item>
      <item>
        <Typography mt={1} align='left' paragraph={true} variant="title1" color="text.primary">
          {'The questionnaire is intended for Small and Medium Entreprises (SME) operating in various areas (e.g. hotels, attractions).'}
        </Typography>
        <Typography mt={1} align='left' paragraph={true} variant="title1" color="text.primary">
          {'Information will be confidential and it will be exclusively presented as consolidated results.  A minimum of 30 responses are needed for analysis per quarter or year. In case your business does not have minimum responses, information on the specific quarter will be blank. The results compare the performance of your company with the average of companies inspected.'}
        </Typography>
      </item>
      <item>
        <Typography mt={1} align='left' paragraph={true} variant="title1" color="text.primary">
          {'There are six criteria that we have considered as important for service quality and an additional one which reflects the level of satisfaction. Hereby you will find the details of variables collected.'}
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'SERVICE CHARACTERISTICS'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures respondents perceptions regarding how pleasant was the service, the quality and comfort of its equipments, the attractiveness of the décor and overall cleanliness.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'The atmosphere was  pleasant.'} />
              <ListItemText secondary={'The equipments were of good quality.'} />
              <ListItemText secondary={'The equipments were confortable.'} />
              <ListItemText secondary={'The decor was attractive.'} />
              <ListItemText secondary={'It was clean.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'ENVIRONMENT CONCERN'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures how respondents perceive your activities regarding the environment.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'The company environmental activities added very good value.'} />
              <ListItemText secondary={'This company has more environmental concerns than others of its kind.'} />
              <ListItemText secondary={'This company is environmentally friendly.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'RESERVATION PROCESS'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures how respondents perceive your activities regarding the reservation process.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'The reservation process was simple.'} />
              <ListItemText secondary={'The information provided about the hotel was clear.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'TECNOLOGY FOR INNOVATION'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures respondents evaluation concerning the use of digital resources.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'It was efficient to do the reservation in the digital platform.'} />
              <ListItemText secondary={'There was an easy self-checkout.'} />
              <ListItemText secondary={'There were convenient contactless payment methods available.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'STAFF'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It includes respondents perceptions regarding their interactions with the staff.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'The staff provided reliable and proper services.'} />
              <ListItemText secondary={'The staff was able to quickly correct mistakes.'} />
              <ListItemText secondary={'The staff was well-trained.'} />
              <ListItemText secondary={'The staff was able to respond to the special needs of the clients.'} />
              <ListItemText secondary={'The staff was sympathetic and sensitive.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'SOCIAL AND ECONOMIC SUSTAINABILITY'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It captures respondents awareness towards your company current practices concerning the use of local resources.'}
              {' Questions involve the following items:'}
            </Typography>
            <List align='left'>
              <ListItemText secondary={'This company serves local food.'} />
              <ListItemText secondary={'The company promoted local businesses.'} />
              <ListItemText secondary={'This company was respectful towards the local culture and traditions.'} />
              <ListItemText secondary={'This company hired local employees.'} />
              <ListItemText secondary={'The company was inclusive.'} />
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'SATISFACTION'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'It evaluates respondents experience with your company. A simple question will be posed. Results will be enriched by the results obtained in the sentiment analysis.'}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{'SENTIMENT ANALSYIS'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'The respondents are asked to write a review as if it was meant to be placed in a reviewing platform.'}
            </Typography>
            <Typography mt={0} align='left' paragraph={true} variant="title1">
              {'Their reviews are analysed using sentiment analysis, which are analytical techniques that captured the valance of comments.'}
              {'We know that the more positive are the reviews, the better will be respondents intentions to return and recommend your company to others.'}
            </Typography>
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
              <ListItemText secondary={'Gender.'} />
              <ListItemText secondary={'Age.'} />
              <ListItemText secondary={'Occupation.'} />
              <ListItemText secondary={'Education.'} />
              <ListItemText secondary={'Current residence.'} />
            </List>
          </AccordionDetails>
        </Accordion>
      </item>
    </Stack>
  )
}

/*
return (
        <Stack sx={{ mt: 3 }} spacing={4}>
            <Stack direction='row' spacing={3}>
            <Autocomplete
                    id="language-select"
                    disableClearable
                    selectOnFocus
                    sx={{ marginTop: '30px', width: 250 }}
                    value={lang}
                    onChange={setLang}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.lang}
                    getOptionDisabled={(option) => option != countries[0]}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                alt=""
                            />
                            {option.lang}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText="Choose language from"
                            variant="standard"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    disableClearable
                    selectOnFocus
                    id="questionnaire-select"
                    sx={{ marginTop: '30px', width: 500 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={handleQuest}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.title}
                    options={options}
                    loading={loading}
                    // uma imagem na box
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.id} - {option.title}. Registered at {option.registered} by {option.by}, {option.email}
                        </Box>)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText="Select suitable questionnaire"
                            variant="standard"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                

                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    onChange={handleAction}
                    aria-label="Questionnaire"
                >
                    <ToggleButton value='View' disabled={!isquestionnaire} aria-label={'View'}>
                        {'View'}
                    </ToggleButton>
                    <ToggleButton value='Edit' disabled={true} aria-label={'Edit'}>
                        {'Edit'}
                    </ToggleButton>
                    <ToggleButton value='New' disabled={true} aria-label={'New'}>
                        {'New'}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {isquestionnaire && action == 'View' && isquestions && ViewQuestionnaire(jsonquest[0], questions, lang)}
        </Stack>
    )
*/
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

/*


{*
     
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
        <Typography>{'SATISFACTION'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>{'It evaluates respondents experience with your company.'}</Typography>
        <Typography>{'A simple question will be posed. Results will be enriched by the results obtained in the sentiment analysis.'}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
        <Typography>{'SENTIMENT ANALSYIS'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>{'The respondents are asked to write a review as if it was meant to be placed in a reviewing platform.'}</Typography> 
        <Typography>{'Their reviews are analysed using sentiment analysis, which are analytical techniques that captured the valance of comments.'}</Typography>
        <Typography>{'We know that the more positive are the reviews, the better will be respondents intentions to return and recommend your company to others.'}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
        <Typography>{'DEMOGRAPHICS'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>{'Sample size.'}</Typography>
        <Typography>{'Gender.'}</Typography>
        <Typography>{'Age.'}</Typography>
        <Typography>{'Occupation.'}</Typography>
        <Typography>{'Education.'}</Typography>
        <Typography>{'Current residence.'}</Typography>
        </AccordionDetails>
      </Accordion>
      *}
*/
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
            //subheader={indata['year']}
            subheader={indata['description']}
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
              {/*{'Last update: '}{indata['updated'].replace(/T|Z/g, ' ')*/}
            </Typography>
            <Typography paragraph={true} align="left" variant="body2" color="text.secondary">
              Notice: Data has been collected via available questionnaires.
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
  indata['description'] = "It captures respondents' perceptions regarding how pleasant was the service, the quality and comfort of its equipments, the attractiveness of the décor and overall cleanliness."
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
  indata['description'] = "It captures respondents' perceptions regarding the reservation process."
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
  indata['description'] = "It captures how respondents perceive your activities regarding the environment."
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
  indata['description'] = "It includes respondents' perceptions regarding their interactions with the staff."
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
  indata['description'] = "It captures respondents evaluation concerning the use of digital resources."
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
  indata['description'] = "It captures respondents' awareness towards your company current practices concerning the use of local resources."
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

  //console.log('Inside satisfaction data=', data)
  let org = data['org']
  let indata = {}
  indata['indicator'] = "Satisfaction"
  indata['description'] = "It evaluates respondents' experience with your company. A simple question will be posed. Results will be enriched by the results obtained in the sentiment analysis."
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

//props: {data: SQProps} 
export default function ServiceQualityVisuals({ data }) {

  let selection = [0, 0, 0]

  const tasks = useTasks();
  tasks.map(t => {
    if (t.id >= 0 && t.id <= 2) {
      selection[t.id] = t.value
    }
  })

  // PUT HERE CONTROL

  //console.log('Data inside SQVisuals ', data)
  
  // service part to draw analysis
  const sqv = data['service'] // array - one company
  const sq = sqv[0]

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {selection[1] == 1 && Overview()}
      {selection[1] == 2 && Questionnaire(data['purpose'], data['questionnaires'], data['questions'])}
      {selection[1] == 3 && Report()}
      {selection[1] == 4 && selection[2] == 41 && data && Service(sq)}
      {selection[1] == 4 && selection[2] == 42 && data && Environment(sq)}
      {selection[1] == 4 && selection[2] == 43 && data && Reservation(sq)}
      {selection[1] == 4 && selection[2] == 44 && data && Technology(sq)}
      {selection[1] == 4 && selection[2] == 45 && data && Staff(sq)}
      {selection[1] == 4 && selection[2] == 46 && data && Sustainability(sq)}
      {selection[1] == 4 && selection[2] == 47 && data && Satisfaction(sq)}
      {selection[1] == 4 && selection[2] == 48 && data && Demographics()}

    </Box>
  );
}
// {selection[1] == 2 && Questionnaire(quest)}
// {selection[1] == 2 && AA()}
// 
