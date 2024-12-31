import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
    Button, IconButton, Avatar, CardMedia, CardHeader, Stack,
    CardActionArea, CardActions, Typography
} from '@mui/material';

import { ISurvey } from "@/lib/db/definitions";
import {colour_actions} from '@/styles/colors'

export default function SurveyCard({ survey, callback }: { survey: ISurvey; callback: any }) {
    const colour = survey.type === 'Service quality' ? colour_actions.quality : colour_actions.sustainability
    return (
        <Card sx={{ border: 1, maxWidth: 400, margin: 1 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: colour }} aria-label="recipe">
                        {survey.type}
                    </Avatar>
                }
                title={survey.name}
                subheader={survey.type}
            />
            <CardContent>
                <Typography sx={{ mb: 1, variant: 'body2', color: 'text.secondary' }}>{survey.description}</Typography>
                <Typography sx={{ variant: 'body2', color: 'text.primary' }}>Publish in {survey.publish_date}</Typography>
                <Typography sx={{ variant: 'body2', color: 'text.primary' }}>{survey.status}</Typography>
            </CardContent>

            <CardActions>
                <Button size="small" variant="outlined" color="primary"
                    onClick={(e) => callback(survey.id)}
                >
                    Find out more
                </Button>
            </CardActions>
        </Card>
    )
}


/*
export type ISurvey = {
    id: string;
    name: string
    owner: string;  // email
    publish_date: string;
    subscribers?: string[];
    start_date?: string;
    end_end?: string
    // In TypeScript, this is called a string union type.
    status: 'Idle' | 'Running' | 'Archived' 
    type: 'Service quality' | 'Sustainability';
    content: JSON
  };
*/


