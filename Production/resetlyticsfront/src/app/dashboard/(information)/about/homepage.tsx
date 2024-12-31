
import { Typography, Stack, ListItemText, List } from '@mui/material';
import { Key } from 'react';

const resetting = [
    'RESETTING is an European Project supported by the European Union for the Relaunch of European Smart and Sustainable Tourism through Digitalization and Innovative Technologies.',
    'The project has the participation of academic and research institutions, such as the Technology Centre of Catalunya (EURECAT), Associació Clúster TIC Catalunya Sud, Albanian Trip, Heraklion Development Agency, City of San Benedetto del Tronto, and the Federació Empresarial d’Hostelaria and the University of Iscte-IUL.',
    'The project aims to improve the quality of the travel experience, support the decarbonization of the tourism industry, and promote more inclusive economic growth, not only for small and medium enterprises but also for local people in the destination - by testing and integrating cutting-edge digitally driven solutions that reduce burdensome requirements and facilitate a transition to more resilient, circular, and sustainable operating models for European tourism enterprises.',
]

const resetlytics = [
    'The RESETLYTICS platform is the outcome of over two years of work in order to give user-friendly tools to European SMEs so that they can get further data-driven insights about their own operations, to be more sustainable and to plan better.',
    'The tools available are specifically crafted for small tourism enterprises that lack time, staff and internal resources to keep track of their levels of service quality, sentiment analysis and sustainability. In this platform, European SMEs in Tourism can use the following tools:',
]

function dumptext(strings : any) {
    let jsxarray: JSX.Element[] = []
    {
        strings.forEach((item: any, idx: Key | null | undefined) => {
            jsxarray.push(<Typography key={idx} paragraph={true} variant="body2" color="text.primary">{item}</Typography>)
        })
    }
    return jsxarray
}

export default function Page() {
    return (
        <Stack sx={{ padding: 0 }} spacing={2}>
            <Typography sx={{ paddingLeft: 0, mt: 2, mb: 2, color: "RoyalBlue", variant: 'subtitle1' }}>
                RESETTING
            </Typography>
            {dumptext(resetting)}

            <Typography sx={{ paddingLeft: 0, mb: 2, color: "RoyalBlue", variant: 'subtitle1' }}>
                RESETLYTICS
            </Typography>
            {dumptext(resetlytics)}
            <List sx={{ paddingLeft: 4, alignItems:'flex-start' }}>
                    <ListItemText secondary={'Monitoring service quality: an essential effort for retaining consumers and obtaining good reviews and recommendations.'} />
                    <ListItemText secondary={'Self-diagnostic of sustainability: to evaluate their level of compliance with recommended practices for sustainability. This tool proposes an essential guide for setting priorities of development.'} />
                    <ListItemText secondary={'Sentiment analysis: which tracks ongoing sentiment of reviews based on data collected while monitoring service quality.'} />
                    <ListItemText secondary={'Also, there is a tool for the business decision makers to envisage forecasting scenarios of demand based on general data, and therefore to plan ahead and optimize resources.'} />
                </List>
        </Stack>
    );
}
