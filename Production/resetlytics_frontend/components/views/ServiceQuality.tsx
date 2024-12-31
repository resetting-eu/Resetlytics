//'use client'

import React, { Suspense } from 'react'

//import { useAppSelector } from '@/redux/hooks';
import MenuModule from '@components/menus/MenuModule'
import ServiceQualityVisuals from '@components/views/visuals/ServiceQualityVisuals'
import { TasksProvider } from '@components/context/TaskContext';
import apiFetch from '@hooks/use-fetch';
import { Container, Typography, CircularProgress, Box } from '@mui/material';


const menu = {
    label: 'Service Quality',
    value: 1,
    option_default: 1,
    options: [
        { label: 'Overview', value: 1, sublabel: '', islevel2: false },
        { label: 'Questionnaire', value: 2, sublabel: '', islevel2: false },
        { label: 'Report', value: 3, sublabel: '', islevel2: false },
        {
            label: 'Analysis', value: 4, sublabel: '', islevel2: true,
            level2: [
                { label: 'Service', value: 41, sublabel: 'Service caracteristics' },
                { label: 'Environment', value: 42, sublabel: 'Environment concern' },
                { label: 'Reservation', value: 43, sublabel: 'Reservation process' },
                { label: 'Technology', value: 44, sublabel: 'Technology for innovation' },
                { label: 'Staff', value: 45, sublabel: '' },
                { label: 'Sustainability', value: 46, sublabel: 'Social and economic sustainability' },
                { label: 'Satisfaction', value: 47, sublabel: '' },
                { label: 'Demographics', value: 48, sublabel: '' },
            ],
        },
    ],
}

export const SQLoader = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            <Typography>{'Loading...'}</Typography>
        </>
    )
}

type SQProps = {
    purpose: string
    service: any;
    questionnaires: any;
    questions: any; 
}


export const SQInnards = async (props: SQProps) => {

    let dict = { purpose: "service quality", service: {}, questionnaires: {}, questions: {} }

    const purpose = "service quality"
    const name = "Iscte Resetting" // Bru ou Istar
    const country = 'Portugal'
    const year = 2024
    const query1 = "/api/servq/" + name + "/" + country + "/" + year
    const query2 = "/api/lquest/service"
    const query3 = "/api/quest/14" // 14
    try {
        const result1 = await apiFetch.getWithoutToken(query1)
        const result2 = await apiFetch.getWithoutToken(query2)
        const result3 = await apiFetch.getWithoutToken(query3)
        dict = { purpose: purpose, service: result1, questionnaires: result2, questions: result3 } 
    } catch (e) {
        console.error(e)
        return (<Typography>{'Error loading service quality'}</Typography>)
    }

    //props: {data: SQProps} 
    return (
        <TasksProvider>
            <Container>
                <MenuModule menu={menu} />
                <ServiceQualityVisuals data={dict} /> 
            </Container>
        </TasksProvider>
    )
}

export const ServiceQuality = async (props: SQProps) => {
    return (
        <Suspense fallback={<SQLoader />}>
            {/* @ts-expect-error Server Component */}
            <SQInnards {...props} />
        </Suspense>
    )
}

// sx={{mt: 2}}

