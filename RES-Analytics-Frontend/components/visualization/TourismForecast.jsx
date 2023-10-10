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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

import { Typography, Box, Container, Grid } from '@mui/material';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import Filter from '@components/filters/TourismForecast';
import Spinner from '@components/common/Spinner';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
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
                    parser: 'YYYY-MM-DD',
                    displayFormats: {
                        month: 'YYYY-MM',
                        day: 'YYYY-MM-DD',
                    },
                    tooltipFormat: 'YYYY-MM-DD'
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
        borderColor: 'rgb(66, 179, 193)',
        backgroundColor: 'rgb(66, 179, 193, 0.5)',
    }

    return dataset
}

export default function Page() {

    const format = 'YYYY-MM-DD';
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

        fetch('https://nmcao11.pythonanywhere.com/models')
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
                        const dateList = data.map((item) => item.date)
                        const valueList = data.map((item) => item.value)

                        console.log(dateList)
                        console.log(valueList)

                        setPrimaryLabels(dateList)
                        setPrimaryDatasets([createDataset('devtest', valueList)])

                        tempLabels = dateList
                        tempDatasets = [createDataset('devtest', valueList)]

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



