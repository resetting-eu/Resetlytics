
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resetlytics | Home',
    description: 'Resetlytics home page',
};

//import { menus } from '@/lib/definitions/menus';
//import Link from 'next/link';

import { Typography, Stack } from '@mui/material';

export default function Page() {
    return (
        <Stack sx={{ padding: 2 }} spacing={2}>
            <Typography variant="h6" color="RoyalBlue" sx={{ paddingLeft: 4, mb: 2 }}>
                    RESETTING
                </Typography>

                <Typography variant="subtitle1" align='justify' sx={{ mx: 6, my: 2 }}>
                    European Project supported by the European Union
                    for the Relaunch of European Smart and Sustainable Tourism
                    through Digitalization and Innovative Technologies.
                </Typography>

                <Typography variant="subtitle1" align='justify'  sx={{ mx: 6, my: 2 }}>
                    All small and medium size companies operating in Tourism and Hospitality
                    are welcomed to join the platform and enjoy the services.
                </Typography>
        </Stack>
    );
}

/*
<Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    RESETTING
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mx: 6, my: 2 }}>
                    European Project supported by the European Union
                    for the Relaunch of European Smart and Sustainable Tourism
                    through Digitalization and Innovative Technologies.
                </Typography>

                <Typography align='justify' variant="h6" sx={{ mx: 6, my: 2 }}>
                    All small and medium size companies operating in Tourism and Hospitality
                    are welcomed to join the platform and enjoy the services.
                </Typography>

*/