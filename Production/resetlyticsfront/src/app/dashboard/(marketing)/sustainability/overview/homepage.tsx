import { List, ListItemText, Stack, Typography } from "@mui/material";
import { JSX } from "react";

function listIndicators() {
    const indicators = [
        {
            indicator: 'Economy',
            description: 'It captures information related to the quantity and quality of employment and suppliers.'
        },
        {
            indicator: 'Social',
            description: 'It captures information related to your activities regarding community and social impact; health and safety; inclusion and accessibility; protecting cultural heritage.'
        },
        {
            indicator: 'Environment',
            description: 'It captures information associated to the optimal use of resources, namely: reducing transportation impact, solid waste management, water management, energy usage and landscape and biodiversity protection.'
        },
        {
            indicator: 'Demographics',
            description: 'It captures information about your company.'
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
                    {'Sustainability is a success factor for all businesses. It is very important to understand how is your company positioned in view of others. Thus, you may better plan your actions and evaluate your results.'}
                    {'We help you in that regard. You access a survey and you are able to obtain responses after that.'}
                </Typography>
                <List sx={{ paddingLeft: 4, alignItems:'flex-start' } } >
                    <ListItemText secondary={'1. Subscribe a self-diagnostic on sustainability survey at your disposal.'} />
                    <ListItemText secondary={'2. Copy the provided link that is going to be used.'} />
                    <ListItemText secondary={'3. Use the link to answer the survey.'} />
                    <ListItemText secondary={'4. Access the collected survey results and check your progress.'} />
                </List>
                <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {' The survey is intended for Small and Medium Entreprises (SMEs) operating in the tourism sector. Information will be confidential.'}
        </Typography>
        <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {'The results compare the performance of your company with the average of companies inspected so far. Thus you may understand your position in comparison with other SMEs and articulate your action plans. In most variables, your performance is compared with the top 25% best performing companies in the specific criteria. For the remaining ones, averages are used.'}
        </Typography>
        <Typography mt={1} align='left' paragraph={true} variant="body1" color="text.primary">
          {'There are three groups of criteria considered, namely: economic, social and environment. These three account for how your company performs in sustainability. According to some criteria, the list of variables that are collected include:'}
        </Typography>
        {listIndicators()}
        </Stack>
        </>
    )
}

