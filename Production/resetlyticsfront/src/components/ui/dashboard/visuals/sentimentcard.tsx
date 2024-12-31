
import { Stack, Grid, Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material'
import WordCloudChart from '../../basics/charts/WordCloudChart'
import SentimentChart from '../../basics/charts/SentimentChart'

import {colour_actions} from '@/styles/colors'

export default function SentimentCard({ name, description, sme, sentiment, words_cloud }
    :
    { name: string, description: string, sme: any, sentiment: Array<any>, words_cloud: Array<any> }) {

    const title = name
    return (
        <Stack spacing={1}>
            <Card sx={{ maxWidth: 600 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: colour_actions.sentiment }} aria-label="avatar">
                            Sentiment Analysis
                        </Avatar>
                    }
                    title={title}
                    subheader={description}
                />
                <CardContent>
                    <Typography paragraph={true} variant="body2" color="text.primary">
                        {sme.legal_name}{' ('}{sme.commercial_name}{')'}
                    </Typography>
                    <Typography paragraph={true} variant="body2" color="text.primary">
                        {sme.location}{', '}{sme.country}
                    </Typography>
                    <Typography paragraph={true} align="left" variant="body2" color="text.primary">
                        {'Main activity: '}{sme.main_activity}
                    </Typography>
                </CardContent>
            </Card>
                    <Typography sx={{mt: 0, variant: 'title1', align: 'left', color: 'text.primary'}}>Sentiment based on commentaries</Typography>
<SentimentChart sentiment={sentiment} />
                    <Typography sx={{mt: 0, variant: 'title1', align: 'left', color: 'text.primary'}}>Top common words from positive commentaries</Typography>
                    <WordCloudChart tendency={'positive'} words_cloud={words_cloud} />
        </Stack>
    )
}

/*
<Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="title1" paragraph={true} align="left" gutterBottom color="text.primary" >Sentiment based on reviews</Typography>
            </Grid>
            <Grid item xs={12}>
            <VisSentimentAnalysis data={data['sent']} />
            </Grid>
            
            <Grid item xs={8}>
            <VisWordCloud data={data['wc']} />
            </Grid>
          </Grid>

          */