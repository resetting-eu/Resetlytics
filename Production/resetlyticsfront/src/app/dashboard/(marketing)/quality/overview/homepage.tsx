import { List, ListItemText, Stack, Typography } from "@mui/material";
import { JSX } from "react";

function listIndicators() {
    const indicators = [
        {
            indicator: 'Service characteristics',
            description: 'It captures respondents perceptions regarding how pleasant was the service, the quality and comfort of its equipments, the attractiveness of the décor and overall cleanliness.'
        },
        {
            indicator: 'Environment concern',
            description: 'It captures how respondents perceive your activities regarding the environment.'
        },
        {
            indicator: 'Reservation process',
            description: 'It captures how respondents perceive your activities regarding the reservation process.'
        },
        {
            indicator: 'Technology for innovation',
            description: 'It captures respondents evaluation concerning the use of digital resources.'
        },
        {
            indicator: 'Staff',
            description: 'It includes respondents perceptions regarding their interactions with the staff.'
        },
        {
            indicator: 'Social and economic sustainability',
            description: 'It captures respondents awareness towards your company current practices concerning the use of local resources.'
        },
        {
            indicator: 'Satisfaction',
            description: 'It evaluates respondents experience with your company. A commentary is collected and then evaluated.'
        },
        {
            indicator: 'Demographics',
            description: 'It draws a profile of your clients.'
        },
    ]

    let jsxarray: JSX.Element[] = []
    {indicators.forEach((item, idx) => {
        jsxarray.push(<Typography key={item.indicator} paragraph={true} variant="body2" color="text.primary">{item.indicator}</Typography>)
        jsxarray.push(<Typography mt={0} key={idx} paragraph={true} variant="body2" color="text.secondary">{item.description}</Typography>)
    })}
    return jsxarray
}
export default function Homepage() {
    return (
        <>
        <Stack direction={'column'} spacing={1} justifyContent="flex-start" alignItems="flex-start">
                <Typography mt={2} align='left' paragraph={true} variant="body1" color="text.primary">
                    {'Monitoring the service quality of your business is an essential effort for retaining consumers and obtaining good reviews and recommendations.'}
                    {' We help you to do that in four simple steps:'}
                </Typography>
                <List sx={{ paddingLeft: 4, alignItems:'flex-start' }}>
                    <ListItemText secondary={'1. Subscribe a service quality survey at your disposal.'} />
                    <ListItemText secondary={'2. Copy the provided link that is going to be used by respondents.'} />
                    <ListItemText secondary={'3. Share the link with your customers after their check-out.'} />
                    <ListItemText secondary={'4. Access the collected survey results and check your progress.'} />
                </List>
                <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {'The survey is intended for Small and Medium Entreprises (SME) operating in various areas (e.g. hotels, attractions).'}
        </Typography>
        <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {'The collected information will be confidential and it will be exclusively presented as consolidated results.  A minimum of 30 responses are needed for analysis per quarter or year. In case your business does not have minimum responses, information on the specific quarter will be blank. The results compare the performance of your company with the average of companies considered.'}
        </Typography>
        <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {'There are six criteria that are considered as important for service quality and an additional one which reflects the level of satisfaction. Hereby you will find the summary, as follows:'}
        </Typography>
        {listIndicators()}
        </Stack>
        </>
    )
}

