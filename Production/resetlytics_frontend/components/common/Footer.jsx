'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { Stack } from '@mui/material';

function Copyright() {
    return (
        <Typography whiteSpace={'nowrap'} variant="title" color="text.secondary" sx={{ display: { xs: 'none', md: 'inline' } }}>
            {'Copyright © '}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//const pages = [['TC', 'Terms & Conditions'],['Contact', 'Contact']];


function ResponsiveAppBar() {

    return (
        <Container maxWidth="xl" className='position:relative left:0 bottom:0'>
            <Divider sx={{ mt: 3 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="baseline">
                <item>
                    <Image src='/assets/images/RES.png'
                        alt='RESETTING Logo'
                        width={20}
                        height={20}
                        className='m-3' />
                        </item>
                        <item>
                    <Typography whiteSpace={'nowrap'}
                        variant="h6"
                    >
                        Resetlytics
                    </Typography>
                </item>
                <item>
                    <Copyright />
                </item>
            </Stack>
        </Container>
    )
}

export default ResponsiveAppBar