'use client'


import React, { useMemo, useState } from 'react'
import { Container } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import MenuModule from '@components/menus/MenuModule'
import ServiceQualityVisuals from '@components/visuals/ServiceQualityVisuals'
import { TasksProvider } from '@components/context/TaskContext';

import fetchData from '@hooks/fetchdata';

const menu = {
    label: 'Service Quality',
    value: 3,
    option_default: 3,
    options: [
        {label: 'Questionnaire', value: 1, islevel2: false},
        {label: 'Survey', value: 2, islevel2: false},
        {label: 'Overview', value: 3, islevel2: true,
            level2: [
                {label: 'Service', value: 4},
                {label: 'Reservation', value: 5},
                {label: 'Environment', value: 6},
                {label: 'Staff', value: 7},
                {label: 'Technology', value: 8},
                {label: 'Sustainability', value: 9},
                {label: 'Satisfaction', value: 10},
                {label: 'Demographics', value: 11},
            ],
        },
    ],
}

export default function ServiceQuality() {

    const [dict, setDict] = useState({})
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const name = "Iscte Resetting" // Bru ou Istar
    const country ='Portugal'
    const year = 2024
    const endpoint = "http://127.0.0.1:8000/api/servq/"+name+"/"+country+"/"+year
    
    if (isAuthenticated) {
        fetchData(endpoint, setDict)
    }
    
    return (
        <TasksProvider>
        <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
            <MenuModule menu={menu} />
            <ServiceQualityVisuals data={dict}/>
        </Container>
        </TasksProvider>

)}

// sx={{mt: 2}}

