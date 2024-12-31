//'use client'

import React from 'react'
//import { useAppSelector, useAppDispatch } from '@/redux/hooks';
//import { useRetrieveUserQuery } from '@redux/features/auth/authApiSlice';
import { Container } from '@mui/material'

import MenuModule from '@components/menus/MenuModule'
import { TasksProvider } from '@components/context/TaskContext';
import SentimentAnalysisVisuals from '@components/visuals/SentimentAnalysisVisuals'

import apiFetch from '@hooks/use-fetch';

const menu = {
    label: 'Sentiment',
    value: 1,
    option_default: 1,
    options: [
        { label: 'Overview', value: 1, islevel2: false },
        { label: 'Analysis', value: 2, islevel2: false },
    ],
}

export default async function SentimentAnalysis() {

    //   const { data: user } = useRetrieveUserQuery();
    //const { isAuthenticated } = useAppSelector(state => state.auth);

    const name = "Iscte Resetting" // Bru or Istar
    const country = 'Portugal'

    const query1 = "/api/sent/" + name + "/" + country
    const query2 = "/api/wc/" + name + "/" + country

    /*
    if (! isAuthenticated) {
        return (<></>)
    }
    */
    const sentiment = await apiFetch.getWithoutToken(query1)
    const wordcloud = await apiFetch.getWithoutToken(query2)
    const dict = { sent: sentiment, wc: wordcloud }
    // { sent: Array, wc: Array }
    
    return (
        <TasksProvider>
            <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
                <MenuModule menu={menu} />
                <SentimentAnalysisVisuals data={dict} />
            </Container>
        </TasksProvider>
    )
}
