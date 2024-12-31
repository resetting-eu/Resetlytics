'use client'
import React from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

import { Typography, Box, Container, Grid } from '@mui/material';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import Filter from '@components/filters/TourismForecast';
import Spinner from '@components/common/Spinner';

import { FORECAST_ENDPOINT } from 'endpoints.js'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

function lineOptionsFunction(startDateZoom, endDateZoom) {
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 1
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: 'black',
                },
            },
            title: {
                display: false,
                text: '',
                color: 'black',
                font: {
                    size: 20,
                    family: 'inter'
                },
                padding: {
                    bottom: 30
                }
            },
            

        },
        scales: {
            y: {
                ticks: {
                    color: 'black'
                }
            },
            x: {
                ticks: {
                    color: 'black',
                    autoSkip: true,
                    autoSkipPadding: 2,
                    maxRotation: 0,
                    maxTicksLimit: 8,

                },
                type: 'time',
                time: {
                    parser: 'YYYY-MM',
                    displayFormats: {
                        month: 'YYYY-MM',
                    },
                    tooltipFormat: 'YYYY-MM'
                }
            },
        },

    };
    return lineOptions
}

function createDataset(model, valueList) {

    const dataset = {
        label: model.timeseries_name,
        data: valueList,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(0, 0, 0, 0.5)',
    }

    return dataset
}

function createDatasetPredictions(model, valueList) {

    const dataset = {
        label: model.timeseries_name,
        data: valueList,
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgb(0, 255, 0, 0.5)',

    }

    return dataset
}

function createDatasetPredictionsCone(model, valueList) {

    const dataset = {
        label: model.timeseries_name,
        data: valueList,
        fill: '+1',
        borderColor: 'rgb(0, 255, 0, 0.3)',
        backgroundColor: 'rgb(0, 255, 0, 0.3)',
    }

    return dataset
}

export default function Page() {

    const format = 'YYYY-MM';
    const timeseriesName = 'devtests'

    const [primaryLabels, setPrimaryLabels] = React.useState({});
    const [primaryDatasets, setPrimaryDatasets] = React.useState({});
    const [state, setState] = React.useState({})

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [labelsList, setLabelsList] = React.useState(null);

    var tempLabels;
    var tempDatasets;

    const [tempStartDate, setTempStartDate] = React.useState(startDate);
    const [tempEndDate, setTempEndDate] = React.useState(endDate);
    const [tempLabelsList, setTempLabelsList] = React.useState(labelsList);

    const [isLoading, setIsLoading] = React.useState(false)

    React.useMemo(() => {

        setIsLoading(true)

        fetch(FORECAST_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                var id;
                const model = data.filter((item) => {
                    if (item.timeseries_name == timeseriesName) {
                        return item
                    }
                })
                id = model[0].id

                return fetch('https://nmcao11.pythonanywhere.com/models/' + id,)
                    .then(response => response.json())
                    .then(data => {
                        const dateList = data.map((item) => item.date).slice(120)
                        const valueList = data.map((item) => item.value).slice(120)

                        const actualList = valueList.slice(0, -12)
                        const predList = valueList.fill(null, 0, valueList.length - 12)
                        const predListUp = []
                        const predListDown = []
                        var j = 0
                        
                        for (var i = 0; i < predList.length; i++) {

                            if (predList[i] == null) {
                                predListUp[i] = null
                                predListDown[i] = null
                                continue
                            } 
                            predListUp[i] = predList[i] + j * 0.03
                            predListDown[i] = predList[i] - j * 0.03
                            j++
                        }

                        console.log(dateList)
                        console.log(valueList)

                        setPrimaryLabels(dateList)
                        setPrimaryDatasets([createDataset('devtest', actualList), createDatasetPredictions('devtest', predList),
                         createDatasetPredictionsCone('devtests', predListUp), createDatasetPredictionsCone('devtests', predListDown)])

                        tempLabels = dateList
                        tempDatasets = [createDataset('devtest', actualList), createDatasetPredictions('devtest', predList),
                        createDatasetPredictionsCone('devtests', predListUp), createDatasetPredictionsCone('devtests', predListDown)]

                        setStartDate(dayjs(String(dateList.slice(0, 1))))
                        setEndDate(dayjs(String(dateList.slice(-1))))

                        setTempStartDate(dayjs(String(dateList.slice(0, 1))))
                        setTempEndDate(dayjs(String(dateList.slice(-1))))

                        setLabelsList(tempDatasets.map(item => { return item.label }))
                        setTempLabelsList(tempDatasets.map(item => { return item.label }))

                        setState({
                            labels: tempLabels,
                            datasets: tempDatasets
                        })

                        setIsLoading(false)
                    })
            })



    }, [])

    if (isLoading) {
        return <Box display={'flex'} justifyContent={'center'}><Spinner lg /></Box>

    }


    const handleReset = () => {
        setTempStartDate(dayjs(startDate));
        setTempEndDate(dayjs(endDate));
        setTempLabelsList(labelsList)

        tempLabels = primaryLabels
        tempDatasets = primaryDatasets
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    const handleUpdate = () => {
        var firstIndex = primaryLabels.indexOf(tempStartDate.format(format).toString())
        var lastIndex = primaryLabels.indexOf(tempEndDate.format(format).toString())
        tempLabels = primaryLabels.slice(firstIndex, lastIndex + 1)
        tempDatasets = primaryDatasets.filter(({ label }) => tempLabelsList.includes(label))
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    return (
        <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
            <Typography
                variant="h6"
                align="center"
                sx={{
                    mb: 4,
                    fontFamily: 'inter',
                    fontWeight: 700,
                    color: 'black',
                    textDecoration: 'none',
                }}
            >
                Tourist Arrivals Predictions
            </Typography>

                <Filter
                    tempStartDate={tempStartDate}
                    tempEndDate={tempEndDate}
                    setTempStartDate={setTempStartDate}
                    setTempEndDate={setTempEndDate}
                    handleUpdate={handleUpdate}
                    handleReset={handleReset}
                    startDate={startDate}
                    endDate={endDate}
                    labelsList={labelsList}
                    tempLabelsList={tempLabelsList}
                    setTempLabelsList={setTempLabelsList}
                />


                <Box height='70vh' display='flex' justifyContent="center" >
                    <Line options={lineOptionsFunction()} data={state} redraw={true} />
                </Box>
        </Container>

    )
}