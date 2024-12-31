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

// ========================================

export default function VisForecast() {

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

    // ===============

    function chartVisualization() {

    React.useMemo(() => {

        setIsLoading(true)

        fetch(FORECAST_ENDPOINT, { cache: "no-store" })
            .then(response => response.json())
            .then(data => {
                var result = JSON.parse(JSON.stringify(data))
                
                const dateList = result.timeseries.map((item) => item.date)
                const valueList = result.timeseries.map((item) => [item.type, item.value])
                
                const actualList = valueList.filter((item) => item[0] == 'historic').map((item) => item[1])

                const predList = valueList.fill(null, 0, actualList.length).filter((item) => item == null || item[0] == 'pred').map(function(item){
                    if(item == null){ return null } else { return item[1] } })
                const predListUp = valueList.fill(null, 0, actualList.length).filter((item) => item == null || item[0] == 'upper_cone').map(function(item){
                    if(item == null){ return null } else { return item[1] } })
                const predListDown = valueList.fill(null, 0, actualList.length).filter((item) => item == null || item[0] == 'lower_cone').map(function(item){
                    if(item == null){ return null } else { return item[1] } })

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
    }, [])

     
    return (
        <Box>
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

        <Box height='40vh' display='flex' justifyContent="center" >
                <Line options={lineOptionsFunction()} data={state} redraw={true} />
            </Box>
        </Box>

    )
}

        if (isLoading) {
            return <Box display={'flex'} justifyContent={'center'}><Spinner lg /></Box>
        
        }

            return (
                <Container>
                    {chartVisualization()}
                </Container>
        
            )

}