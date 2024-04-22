'use client'
import React, { useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRetrieveUserQuery } from '@redux/features/auth/authApiSlice';
import { Container, Typography } from '@mui/material'

import MenuModule from '@components/menus/MenuModule'
import { TasksProvider } from '@components/context/TaskContext';
import SentimentAnalysisVisuals from '@components/visuals/SentimentAnalysisVisuals'

import fetchData from '@hooks/fetchdata';

const menu = {
    label: 'Sentiment',
    value: 2,
    options: [
        { label: 'Survey', value: 1, islevel2: false },
        { label: 'Overview', value: 2, islevel2: false },
    ],
}

export default function SentimentAnalysis() {

    const [dict1, setDict1] = useState({})
    const [dict2, setDict2] = useState({})


    //   const { data: user } = useRetrieveUserQuery();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const name = "Iscte Resetting" // Bru ou Istar
    const country = 'Portugal'

    const endpoint1 = "http://127.0.0.1:8000/api/sent/" + name + "/" + country
    const endpoint2 = "http://127.0.0.1:8000/api/wc/" + name + "/" + country

    if (isAuthenticated) {
        fetchData(endpoint1, setDict1)
        fetchData(endpoint2, setDict2)
    }
    

    const dict = { sent: dict1, wc: dict2 }
    return (
        <TasksProvider>
            <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
                <MenuModule menu={menu} />
                <SentimentAnalysisVisuals data={dict} />
            </Container>
        </TasksProvider>
    )
}
