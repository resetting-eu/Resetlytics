
import IndicatorBarChart from '@/components/ui/basics/charts/IndicatorBarChart'
import { Stack, Grid, Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material'
import IndicatorPieChart from '../../basics/charts/IndicatorPieChart'

import { colour_actions } from '@/styles/colors'

export default function IndicatorCard({ name, description, sme, quarters, dimension, baseline }
    :
    { name: string, description: string, sme: any, quarters:Array<string>, dimension: Array<number>, baseline: Array<number> }) {

    const title = name + ' monitorization'
    const comparison = name.toLocaleLowerCase() !== 'demographics'
    return (
        <Stack spacing={1}>
            <Card sx={{ maxWidth: 600 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: colour_actions.quality }} aria-label="avatar">
                            Service Quality
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
            {comparison && (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography sx={{mt: 6, variant: 'title1', align: 'left', color: 'text.primary'}}>Average score from respondents</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IndicatorPieChart title={'1 Year'} name={sme.commercial_name} dimension={dimension} baseline={baseline} />
                    </Grid>
                    <Grid item xs={9}>
                        <IndicatorBarChart name={sme.commercial_name} quarters={quarters} dimension={dimension} baseline={baseline} />
                    </Grid>
                </Grid>
            )}
            { ! comparison && (
                <Typography>Profile not available online yet.</Typography>
            )}
        </Stack>
    )
}
