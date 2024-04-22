import React, { useMemo, useState } from 'react'

import {
    Autocomplete,
    ToggleButtonGroup, ToggleButton, TextField, CircularProgress, AccordionSummary,
    Accordion, AccordionDetails, Tooltip, Stack, Typography, Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import fetchData from '@hooks/fetchdata'


function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

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

function ViewQuestionnaire(jsonquest, questions, lang) {

    const text = jsonquest.introduction.split('|')
    const info = 'Registered at ' + jsonquest.created_at.slice(0, -8) + ', by ' +
        jsonquest.owner.first_name + ' ' + jsonquest.owner.last_name +
        ' (' + jsonquest.owner.email + ')'
    let colours = new Map()
    let col = 0
    return (
        <Stack sx={{ marginTop: '20px' }} spacing={2}>
            <Typography align="left" variant="caption">{info}</Typography>
            <Typography variant="body1">{jsonquest.title}</Typography>
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
                
                if (! colours.has(sec)) {
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
                                <Typography align="left" variant="body2" style={{ color: colour_criterion}} gutterBottom>{sec}</Typography>
                            </Tooltip>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography  align="left" variant="body2" gutterBottom>{g.title != 'None' && g.title}</Typography>
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

// TODO: ADD TIMEOUT IF NO QUESTIONNAIRES WERE FECTCHED

export default function Questionnaire(purpose) {

    const [lquest, setLquest] = useState([]) // json of questionnaires
    const [quest, setQuest] = useState({}) // selected questionnaire (contains id)
    const [questions, setQuestions] = useState([]) // json of questions of selected questionnaire
    const [action, setAction] = useState(0)
    const [lang, setLang] = useState(countries[0])

    const [getquestions, setGetquestions] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (Object.values(quest).length > 0 && action === 'View') {
            const endpoint = prefix_quest_endpoint + quest.id
            fetch(endpoint, { cache: "no-store" })
                .then(response => response.json())
                .then(data => {
                    var result = JSON.parse(JSON.stringify(data))
                    setQuestions(result)
                })
        }
    }, [quest, action])

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


    const handleQuest = (event, newValue) => {
        setQuest(newValue);
    };

    const handleAction = (event, newValue) => {
        setAction(newValue);
    };

    const handleLang = (event, newValue) => {
        setLang(newValue);
    };

    const lquest_endpoint = "http://127.0.0.1:8000/api/lquest/"+purpose
    const prefix_quest_endpoint = "http://127.0.0.1:8000/api/quest/"

    fetchData(lquest_endpoint, setLquest, true)
    let qlist = []
    if (Object.values(lquest).length > 0) {
        //console.log(Object.values(lquest))
        Object.values(lquest).forEach(q => {
            const timeat = q.created_at.slice(0, -8)
            qlist.push({ id: q.id, title: q.title, registered: timeat, by: q.owner.first_name + ' ' + q.owner.last_name, email: q.owner.email })
        })
    }

    //console.log(getquestions, quest, action)
    const isquestionnaire = Object.values(quest).length > 0 // quest is not empty
    const isquestions = Object.values(questions).length > 0
    const jsonquest = lquest.filter((q) => { return q.id == quest.id })

    //console.log('PORRA', purpose, isquestionnaire, action, questions, lquest, quest, lang, jsonquest)

    return (
        <Stack sx={{ mt: 3 }} spacing={4}>
            <Stack direction='row' spacing={3}>

            <Autocomplete
                    id="language-select"
                    disableClearable
                    selectOnFocus
                    sx={{ marginTop: '30px', width: 250 }}
                    value={lang}
                    onChange={setLang}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.lang}
                    getOptionDisabled={(option) => option != countries[0]}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                alt=""
                            />
                            {option.lang}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText="Choose language from"
                            variant="standard"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    disableClearable
                    selectOnFocus
                    id="questionnaire-select"
                    sx={{ marginTop: '30px', width: 500 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={handleQuest}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.title}
                    options={options}
                    loading={loading}
                    // uma imagem na box
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.id} - {option.title}. Registered at {option.registered} by {option.by}, {option.email}
                        </Box>)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText="Select suitable questionnaire"
                            variant="standard"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                

                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    onChange={handleAction}
                    aria-label="Questionnaire"
                >
                    <ToggleButton value='View' disabled={!isquestionnaire} aria-label={'View'}>
                        {'View'}
                    </ToggleButton>
                    <ToggleButton value='Edit' disabled={true} aria-label={'Edit'}>
                        {'Edit'}
                    </ToggleButton>
                    <ToggleButton value='New' disabled={true} aria-label={'New'}>
                        {'New'}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {isquestionnaire && action == 'View' && isquestions && ViewQuestionnaire(jsonquest[0], questions, lang)}
        </Stack>
    )
}
