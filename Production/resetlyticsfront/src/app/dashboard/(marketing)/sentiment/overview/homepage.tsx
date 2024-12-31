import { Stack, Typography } from "@mui/material";

export default function Homepage() {
    return (
        <>
            <Stack direction={'column'} spacing={1} justifyContent="flex-start" alignItems="flex-start">
                <Typography align='left' paragraph={true} variant="body1" color="text.primary">
                    {'The reviews collected from the service quality surveys are analysed using sentiment analysis techniques, which are analytical techniques that captured the valance of comments.'}
                </Typography>
                <Typography align='left' paragraph={true} variant="body1" color="text.primary">
                    {'We know that the more positive are the reviews, the better will be respondents intentions to return and recommend your company to others.'}
                </Typography>
                <Typography align='left' paragraph={true} variant="body1" color="text.primary">
                    {'Regarding the processing methodology, the algorithms used to capture the valance of comments are based on machine learning techniques for natural language processing.'}
                </Typography>
            </Stack>
        </>
    )
}

