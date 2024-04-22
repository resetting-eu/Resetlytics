'use client'

import React from 'react'
import { CardContent, Card, CardHeader, Container, Divider, Typography } from '@mui/material'

const info = {
    project: "RESETTING",
    introduction: "RESETTING is an European Project supported by the European Union for the Relaunch of European Smart and Sustainable Tourism through Digitalization and Innovative Technologies.", 
    participants: "The project has the participation of academic and research institutions, such as the Technology Centre of Catalunya (EURECAT), Associació Clúster TIC Catalunya Sud, Albanian Trip, Heraklion Development Agency, City of San Benedetto del Tronto, and the Federació Empresarial d’Hostelaria and the University of Iscte-IUL.",
    goals: "The project aims to improve the quality of the travel experience, support the decarbonization of the tourism industry, and promote more inclusive economic growth, not only for small and medium enterprises but also for local people in the destination - by testing and integrating cutting-edge digitally driven solutions that reduce burdensome requirements and facilitate a transition to more resilient, circular, and sustainable operating models for European tourism enterprises.",     
    platform: "Resetlytics",
    rationale: "The Restlytics platform is the outcome of over two years of work in order to give user-friendly tools to European SMEs so that they can get further data-driven insights about their own operations, to be more sustainable and to plan better.",
    target: "The tools available are specifically crafted for small tourism enterprises that lack time, staff and internal resources to keep track of their levels of service quality, sentiment analysis and sustainability.",
    tools: {intro: "In this platform, European SMEs in Tourism can use the following tools:",
    list: [
        {id: 1, txt: '- Monitoring service quality: an essential effort for retaining consumers and obtaining good reviews and recommendations.'},
        {id: 2, txt: '- Self-diagnostic of sustainability: to evaluate their level of compliance with recommended practices for sustainability. This tool proposes an essential guide for setting priorities of development.'}, 
        {id: 3, txt: '- Sentiment analysis: which tracks ongoing sentiment of reviews based on data collected while monitoring service quality.'},
    ],
    extra: "In addition, there is a tool for the business decision makers to envisage forecasting scenarios of demand based on general data, and therefore to plan ahead and optimize resources."
    },
}

export default function About() {
  return (
    <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
        <Card>
            <CardHeader title={info.project}/>
            <CardContent>
                <Typography variant="body1" gutterBottom>{info.introduction}</Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>{info.participants}</Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>{info.goals}</Typography>
                <Divider />
            </CardContent>
        </Card>
        <Card>
            <CardHeader title={info.platform}/>
            <CardContent>
                <Typography variant="body1" gutterBottom>{info.rationale}</Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>{info.target}</Typography>
                <Divider />
                <Typography variant="body1" gutterBottom>{info.tools.intro}</Typography>
                {info.tools.list.map((tool) =>                   
                        <p key={tool.id}>{tool.txt}</p>)
}
                <Divider />
                <Typography variant="body1" gutterBottom>{info.tools.extra}</Typography>
            </CardContent>

        </Card>
        
    </Container>
)}

/*

<Typography sx={{mx:2, mt:1}}>{tool.txt}</Typography>
*/