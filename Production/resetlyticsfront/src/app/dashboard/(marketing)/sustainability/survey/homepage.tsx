//import { Boundary } from '@/components/ui/basics/Boundary';
'use client'

import * as React from 'react';
import SurveyCard from '@/components/ui/dashboard/visuals/surveycard';
import { ISurvey } from '@/lib/db/definitions';

//<Boundary labels={['Service Quality']}></Boundary>
import { Box, Stack, Pagination, Button, Typography, Paper } from '@mui/material';
import SurveyView from '@/components/ui/dashboard/visuals/surveyview';
import { Unsubscribe } from '@mui/icons-material';

// <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />

function is_surveySubscribedBy(survey: ISurvey) {
    // and considering the current user ... check the subscribers
    return false
}

const paginate = (array: any[], pageSize: number) => {
    const pageCount = Math.ceil(array.length / pageSize);
    return Array.from({ length: pageCount }, (_, index) =>
        array.slice(index * pageSize, (index + 1) * pageSize)
    );
};

export default function Post({ surveys }: { surveys: ISurvey[] }) {
    const [currentPage, setCurrentPage] = React.useState(1);

    const [surveydetail, setSurveydetail] = React.useState<ISurvey>();

    const [subscode, setSubscode] = React.useState("");

    function handleDetailid(id: string) {
        const survey = surveys.find((s) => s.id == id)
        setSurveydetail(survey)
    }

    if (!surveys) {
        return (<></>)
    }

    const pageSize = 3;
    const paginatedPosts = paginate(surveys, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];
   
    function handleSubscode(event: any): void {
        setSubscode('https://resetlytics.eu/r/2?XHGD97AB03');
    }

    return (
        <>
            <Stack direction="row">
                {currentPosts &&
                    currentPosts.map((post) => (
                        <SurveyCard
                            key={post.id}
                            survey={post}
                            callback={handleDetailid}
                        />
                    ))
                }
            </Stack>
            {paginatedPosts.length > 1 && (
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={paginatedPosts.length}
                        page={currentPage}
                        onChange={(_, newPage) => setCurrentPage(newPage)}
                    />
                </Box>
            )}
            {surveydetail && (
                <>
                <Button
                        sx={{ mt: 2, mb: 1 }}
                        color={is_surveySubscribedBy(surveydetail) ? "secondary" : "primary"}
                        variant='outlined'
                        onClick={handleSubscode}
                    >
                        {is_surveySubscribedBy(surveydetail) ? "Unsubscribe" : "Subscribe"}
                </Button>
                    {subscode && (<>
                        <Typography>Your subscription URL to the survey is:</Typography>
                        <Typography color='blueviolet'>{subscode}</Typography>
                        <Typography>You may share it with your collaborators so they can answer the survey.</Typography>
                    </>)}

                    <HeaderSurvey survey={surveydetail} />
                    <SurveyView survey={surveydetail} />
                </>

            )}
        </>
    )
}

function HeaderSurvey({ survey }: { survey: ISurvey }) {

    return (
        <Paper sx={{ mt: 2, mb:0 }} >
            <Typography variant="h6" color="dodgerblue" gutterBottom >Survey details</Typography>
            <Typography variant="body2" gutterBottom >Name: {survey.name}</Typography>
            <Typography variant="body2" gutterBottom >Description : {survey.description}</Typography>
            <Typography variant="body2" gutterBottom >Survey type: {survey.type}</Typography>
            <Typography variant="body2" gutterBottom >Submitted by: {survey.owner}</Typography>
            <Typography variant="body2" gutterBottom >Publish date: {survey.publish_date}</Typography>
            {survey.start_date &&
                <Typography variant="body2" gutterBottom >Started from {survey.start_date}</Typography>
            }
            {survey.end_date &&
                <Typography variant="body2" gutterBottom >Running till {survey.end_date}</Typography>
            }
            <Typography variant="body2" gutterBottom >Current status: {survey.status}</Typography>
            <Typography variant="h6" gutterBottom >The content of the survey is shown below.</Typography>
        </Paper>
    )
}
