'use client'
import React, { useMemo, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import SubMenuSustainability from '@components/utils/SubMenuSustainability'


function fetchData(endPoint, setDict) {
  React.useEffect(() => {

    fetch(endPoint, { cache: "no-store" })
      .then(response => response.json())
      .then(data => {
        var result = JSON.parse(JSON.stringify(data))
        var tempJsonDict = {}

        for (var i = 0; i < result.length; i++) {
          tempJsonDict[result[i].id] = result[i];
        }

        setDict(tempJsonDict)
        console.log(tempJsonDict)
      })
  }, [])
}

export default function Sustainability() {

  const [dict, setDict] = useState({})

  const [endPoint, setendPoint] = useState('https://nmcao11.pythonanywhere.com/api/sustainability/')

  const { data: user } = useRetrieveUserQuery();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  fetchData(endPoint, setDict)
  
  /*
  const [questionsDict, setQuestionsDict] = useState({})
  const [answersDict, setAnswersDict] = useState({})

  const [questionsEndPoint, setQuestionsEndPoint] = useState('https://nmcao11.pythonanywhere.com/api/susQuestions/')
  const [answersEndPoint, setAnswersEndPoint] = useState('https://nmcao11.pythonanywhere.com/api/susAnswers/')
  const [choicesEndPoint, setChoicesEndPoint] = useState(0)
  */

  

  /*
  if (isAuthenticated) {
    setAnswersEndPoint('https://nmcao11.pythonanywhere.com/api/susAnswers/' + user.username + '/')
    setChoicesEndPoint('https://nmcao11.pythonanywhere.com/api/susChoices/' + user.username + '/')
  }
  */

  
  //fetchData(answersEndPoint, setAnswersDict)
  //fetchData(choicesEndPoint, setDict)

  return (
    <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
      <Typography
        variant="h6"
        align="center"
        sx={{
          mb: 4,
          fontFamily: 'inter',
          fontWeight: 700,
          color: 'black',
          textDecoration: 'none',
        }}
      >
        Sustainability
      </Typography>
      <SubMenuSustainability dict={dict} isAuthenticated={isAuthenticated}/>
    </Container>

  )
}
