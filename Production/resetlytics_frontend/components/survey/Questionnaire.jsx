'use client'

import React, { useMemo, useState } from 'react'

import {
    Autocomplete, Button,
    ToggleButtonGroup, ToggleButton, TextField, CircularProgress, AccordionSummary,
    Accordion, AccordionDetails, Tooltip, Stack, Typography, Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const countries = [
    { code: 'GB', label: 'United Kingdom', lang: 'English' },
    { code: 'AL', label: 'Albania', lang: 'Albanian' },
    { code: 'GR', label: 'Greece', lang: 'Greek' },
    { code: 'IT', label: 'Italy', lang: 'Italian' },
    { code: 'PT', label: 'Portugal', lang: 'Portuguese' },
    { code: 'ES', label: 'Spain', lang: 'Spanish' },
]

const source_colours = [
    'red', 'green', 'blue', 'purple', 'orange', 'brown', 'indigo', 'teal', 'magenta'
]

function ViewQuestionnaire(questionnaire, questions) {

    //console.log('View questionnaire: ', questionnaire, questions)

    const text = questionnaire.introduction.split('|')
    const info = 'Registered at ' + questionnaire.created_at.slice(0, -8) + ', by ' +
    questionnaire.owner.first_name + ' ' + questionnaire.owner.last_name +
        ' (' + questionnaire.owner.email + ')'
    let colours = new Map()
    let col = 0
    return (
        <Stack sx={{ marginTop: '20px' }} spacing={2}>
            <Typography align="left" variant="caption">{info}</Typography>
            <Typography variant="body1">{questionnaire.title}</Typography>
            {text.map((p) => {
                return (
                    <Typography align="left" variant="body2">{p.trim()}</Typography>
                )
            })}

            {questions.map((g) => {
                const opt = g.options.split('|')
                const scale = g.scale.split(',')
                let hoptions = 'Options'
                if (g.category.trim().localeCompare('Commentary') === 0) {
                    hoptions = ''
                } else if (g.category.trim().localeCompare('Ordinal') === 0 || g.category.trim().localeCompare('Categorical') === 0) {
                    hoptions = 'One option to select from:'
                }

                const sec = g.criterion === 'None' ? 'General' : g.criterion

                if (!colours.has(sec)) {
                    const idcol = col % source_colours.length
                    const colour = source_colours[idcol]
                    colours.set(sec, colour)
                    col = col + 1
                }
                const colour_criterion = colours.get(sec)

                // sx={{ width: '80%', flexShrink: 0 }}
                // sx={{ width: '30%', flexShrink: 0 }} 
                const istt = hoptions && g.criterion !== 'None' && g.scale !== 'None'
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="accordion-content"
                            id="accordion-header"
                        >
                            <Tooltip title={'Criterion'} placement="right-start">
                                <Typography align="left" variant="body2" style={{ color: colour_criterion }} gutterBottom>{sec}</Typography>
                            </Tooltip>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography align="left" variant="body2" gutterBottom>{g.title != 'None' && g.title}</Typography>
                            <Typography align="left" variant="body2" gutterBottom mt={0}>{hoptions}</Typography>
                            {hoptions && opt.map((o, id) => {
                                const tt = 'Weight: ' + scale[id]
                                if (istt) {
                                    return (
                                        <Tooltip title={tt} placement="right-start">
                                            <Typography sx={{ ml: 20 }} align="left" variant="body2" gutterBottom>{o}</Typography>
                                        </Tooltip>
                                    )
                                } else {
                                    return (
                                        <Typography sx={{ ml: 20 }} align="left" variant="body2" gutterBottom>{o}</Typography>
                                    )
                                }
                            })}
                            {g.questions.map((q) => {
                                return (
                                    <Typography align="left" variant="body2" gutterBottom>{q.number}. {q.text} </Typography>
                                )
                            })

                            }
                        </AccordionDetails>
                    </Accordion>
                )
            })}

        </Stack>
    )
}

export default function Questionnaire(purpose, questionnaires, questions) {

    //console.log('Data inside Questionnaire ', purpose, questionnaires, questions) // arrays of jsons

    
    let qlist = []
    if (Object.values(questionnaires).length > 0) {
        //console.log(Object.values(lquest))
        Object.values(questionnaires).forEach(q => {
            const timeat = q.created_at.slice(0, -8)
            qlist.push({ id: q.id, title: q.title, registered: timeat, by: q.owner.first_name + ' ' + q.owner.last_name, email: q.owner.email })
        })
    }

    //console.log('Data inside Questionnaire - qlist', qlist) 
    
    const quest = qlist[0] // the selected questionnaire
    const numquests = Object.values(questionnaires).length
    const isquestionnaire = Object.values(quest).length > 0 // quest is not empty
    const isquestions = Object.values(questions).length > 0
    const jsonquest = questionnaires.filter((q) => { return q.id == quest.id })

    //console.log('QUESTIONNAIRE: ', isquestionnaire, isquestions, quest, jsonquest)
    
    const infoquest = "Number of " + purpose + " questionnaires available: " + numquests
    return (
        <Stack sx={{ mt: 3 }} direction="column" spacing={3} justifyContent="flex-start" alignItems="flex-start">
            <Typography align="left" mt={3} variant="title1" gutterBottom>
                {infoquest}
            </Typography>
            <Button variant="outlined" disabled={false} size="large" color="success">
                Sign Up
            </Button>
            <Typography align="left" mt={1} variant="body2" gutterBottom>
                If the questionnaire below is signed up, an access link will be sent you by email.
            </Typography>
            {isquestionnaire && isquestions && ViewQuestionnaire(jsonquest[0], questions)}
        </Stack>
                   
    )
}

//   
//{isquestionnaire && isquestions && ViewQuestionnaire(jsonquest[0], questions)}
/*

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {

            if (active) {
                setOptions([...qlist]);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


*/