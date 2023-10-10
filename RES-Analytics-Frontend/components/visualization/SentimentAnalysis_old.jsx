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
import { Doughnut } from "react-chartjs-2";
import dayjs from 'dayjs';
import Spinner from '@components/common/Spinner';

import { Container, Box, Typography, Button, Grid } from '@mui/material';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import zoomPlugin from "chartjs-plugin-zoom";
import Filter from '@components/filters/SentimentAnalysis'
import SubMenuSentiment from '@components/utils/SubMenuSentiment'
import { TagCloud } from 'react-tagcloud'

const options = {
    hue: '#46b3c2',
}

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    TimeScale,
    zoomPlugin,
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
                radius: 2
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
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    mode: "x",
                    speed: 50,
                    onZoom: function ({ chart }) {
                        startDateZoom = chart.scales.x.getLabelForValue(chart.scales.x.min)
                        endDateZoom = chart.scales.x.getLabelForValue(chart.scales.x.max)

                    },


                },

                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 50,
                    onPan: function ({ chart }) {
                        startDateZoom = chart.scales.x.getLabelForValue(chart.scales.x.min)
                        endDateZoom = chart.scales.x.getLabelForValue(chart.scales.x.max)
                    },
                },
            }

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


export const doughnutOptions = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                usePointStyle: true,
            }
        },
        tooltip: {
            enabled: false
        }
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
};

function getDatesBetween(startDate, endDate) {
    var sdate = new Date(startDate)
    var edate = new Date(endDate)
    const currentDate = new Date(sdate.getTime())
    const dates = [];
    while (currentDate <= edate) {

        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

function createDataset(entityName, valueList, col) {

    const dataset = {
        label: entityName,
        data: valueList,
        spanGaps: true,
        borderColor: col,
        backgroundColor: col,
    }
    return dataset
}

function createDoughnutState(dataset) {

    var dataList = []
    var labelList = []
    var backgroundColor = ['green', 'red']
    for (let index = 0; index < dataset.length; index++) {
        const element = dataset[index]
        const sum = element.data.reduce((partialSum, a) => partialSum + a, 0);
        dataList.push(sum)
        labelList.push(element.label + ': ')
    }

    var total = dataList.reduce((accumulator, currentValue) => accumulator + currentValue)
    var tempLabelList = dataList.map(value => Math.round((value / total) * 100) + '%')
    var labelList = labelList.map(function (item, index) {
        return item + tempLabelList[index]
    });

    const dataSet = {
        label: labelList,
        data: dataList,
        backgroundColor: backgroundColor,
    }
    return [[dataSet], labelList]
}

function labelsFilter(sentiment, entityLabelsList, countryLabelsList, sourceLabelsList, tempLabels, primaryDatasets, jsonDict) {

    var dataset = []

    if (entityLabelsList.length != 0 && countryLabelsList.length != 0 && sourceLabelsList.length != 0) {
        var positiveList = []
        var negativeList = []
        for (var i = 0; i < tempLabels.length; i++) {
            var countPositive = 0
            var countNegative = 0
            var valList = jsonDict[tempLabels[i]]
            for (var j = 0; j < valList.length; j++) {
                var tempEntity = valList[j][0]
                var tempCountry = valList[j][1]
                var tempSource = valList[j][2]
                var tempSentiment = valList[j][4]

                if (entityLabelsList.includes(tempEntity) && countryLabelsList.includes(tempCountry) && sourceLabelsList.includes(tempSource)) {
                    if (tempSentiment == 'Positive') {
                        countPositive += 1
                    } else if (tempSentiment == 'Negative') {
                        countNegative += 1
                    }
                }
            }
            positiveList.push(countPositive)
            negativeList.push(countNegative)
        }
        for (let index = 0; index < sentiment.length; index++) {
            if (sentiment[index] == 'Positive') {
                dataset.push(createDataset('Positive', positiveList, 'green'))
            } else if (sentiment[index] == 'Negative') {
                dataset.push(createDataset('Negative', negativeList, 'red'))
            }
        }

        return dataset
    } else {
        return primaryDatasets
    }
}

export default function Page() {



    var endPointSA = 'https://nmcao11.pythonanywhere.com/sa'
    var endPointWordCloud = 'https://nmcao11.pythonanywhere.com/wordcloud'

    var startDateZoom;
    var endDateZoom;

    const format = 'YYYY-MM-DD';

    const [primaryLabels, setPrimaryLabels] = React.useState({});
    const [primaryDatasets, setPrimaryDatasets] = React.useState({});
    const [doughnutState, setDoughnutState] = React.useState({})

    const [state, setState] = React.useState({})

    const [wordcloudDict, setWordcloudDict] = React.useState([])

    const [jsonDict, setJsonDict] = React.useState({})

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const [entityLabelsList, setEntityLabelsList] = React.useState([]);
    const [countryLabelsList, setCountryLabelsList] = React.useState([]);
    const [sourceLabelsList, setSourceLabelsList] = React.useState([]);
    const [sentiment, setSentiment] = React.useState(['Positive', 'Negative']);

    var tempLabels = []
    var tempDatasets = []

    const [tempStartDate, setTempStartDate] = React.useState(startDate);
    const [tempEndDate, setTempEndDate] = React.useState(endDate);

    const [tempEntityLabelsList, setTempEntityLabelsList] = React.useState(entityLabelsList);
    const [tempCountryLabelsList, setTempCountryLabelsList] = React.useState(countryLabelsList);
    const [tempSourceLabelsList, setTempSourceLabelsList] = React.useState(sourceLabelsList);


    const [isLoading, setIsLoading] = React.useState(false)



    const handleReset = () => {
        setTempStartDate(dayjs(startDate));
        setTempEndDate(dayjs(endDate));
        setTempEntityLabelsList(entityLabelsList)
        setTempCountryLabelsList(countryLabelsList)
        setTempSourceLabelsList(sourceLabelsList)

        tempLabels = primaryLabels
        tempDatasets = primaryDatasets

        setDoughnutState({
            labels: createDoughnutState(tempDatasets)[1],
            datasets: createDoughnutState(tempDatasets)[0]
        })
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    const handleUpdate = (tempLabels, tempDatasets) => {
        var firstIndex = primaryLabels.indexOf(tempStartDate.format(format).toString())
        var lastIndex = primaryLabels.indexOf(tempEndDate.format(format).toString())
        tempLabels = primaryLabels.slice(firstIndex, lastIndex + 1)

        tempDatasets = labelsFilter(sentiment, tempEntityLabelsList, tempCountryLabelsList, tempSourceLabelsList, tempLabels, primaryDatasets, jsonDict)
        setDoughnutState({
            labels: createDoughnutState(tempDatasets)[1],
            datasets: createDoughnutState(tempDatasets)[0]
        })
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    const handleUpdateZoom = (tempLabels, tempDatasets) => {

        if (startDateZoom !== null && dayjs(startDateZoom).isSameOrAfter(dayjs(startDate)) && dayjs(startDateZoom).isSameOrBefore(dayjs(endDate))) {
            setTempStartDate(dayjs(startDateZoom))
        } else {
            startDateZoom = dayjs(startDate)
        }
        if (endDateZoom !== null && dayjs(endDateZoom).isSameOrAfter(dayjs(startDate)) && dayjs(endDateZoom).isSameOrBefore(dayjs(endDate))) {
            setTempEndDate(dayjs(endDateZoom))
        } else {
            endDateZoom = dayjs(endDate)
        }

        var firstIndex = primaryLabels.indexOf(dayjs(startDateZoom).format(format).toString())
        var lastIndex = primaryLabels.indexOf(dayjs(endDateZoom).format(format).toString())
        tempLabels = primaryLabels.slice(firstIndex, lastIndex + 1)

        tempDatasets = labelsFilter(sentiment, tempEntityLabelsList, tempCountryLabelsList, tempSourceLabelsList, tempLabels, primaryDatasets, jsonDict)
        setDoughnutState({
            labels: createDoughnutState(tempDatasets)[1],
            datasets: createDoughnutState(tempDatasets)[0]
        })

        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    function wordCloudVisualization() {

        React.useMemo(async () => {

            fetch(endPointWordCloud, { cache: "no-store" })
                .then(response => response.json())
                .then(data => {
                    var result = JSON.parse(JSON.stringify(data))
                    setWordcloudDict(result)

                })
        }, [])

        return (
            <Box display="flex"
                justifyContent="center"
                minHeight="100vh">
                <Box width={'50vw'} display="flex"
                    justifyContent="center">
                    <TagCloud
                        minSize={20}
                        maxSize={55}
                        colorOptions={options}
                        tags={wordcloudDict}
                        onClick={(tag) => console.log('clicking on tag:', tag)}
                    />
                </Box>
            </Box>
        )
    }

    function chartVisualization() {
        React.useMemo(async () => {

            setIsLoading(true)

            fetch(endPointSA, { cache: "no-store" })
                .then(response => response.json())
                .then(data => {
                    var result = JSON.parse(JSON.stringify(data))

                    var tempJsonDict = {}
                    var entitySet = new Set()
                    var countrySet = new Set()
                    var sourceSet = new Set()
                    var sDate = result[0].review_date
                    var eDate = result.slice(-1)[0].review_date

                    var fullDateList = getDatesBetween(sDate, eDate)
                    const d = result.map((item) => item.review_date)
                    for (var i = 0; i < fullDateList.length; i++) {
                        if (!tempJsonDict[fullDateList[i]]) {
                            tempJsonDict[fullDateList[i]] = [];
                        }

                    }
                    for (var i = 0; i < result.length; i++) {
                        var val = [result[i].entity, result[i].country, result[i].source, result[i].text_blob, result[i].vader_boolean]
                        entitySet.add(result[i].entity)
                        countrySet.add(result[i].country)
                        sourceSet.add(result[i].source)
                        if (!tempJsonDict[result[i].review_date]) {
                            tempJsonDict[result[i].review_date] = [];
                        }
                        tempJsonDict[result[i].review_date].push(val);
                    }

                    setJsonDict(tempJsonDict)


                    setEntityLabelsList(Array.from(entitySet))
                    setTempEntityLabelsList(Array.from(entitySet))

                    setCountryLabelsList(Array.from(countrySet))
                    setTempCountryLabelsList(Array.from(countrySet))

                    setSourceLabelsList(Array.from(sourceSet))
                    setTempSourceLabelsList(Array.from(sourceSet))

                    tempLabels = Object.keys(tempJsonDict)

                    {/* General Sentiment Dataset */ }

                    var positiveList = []
                    var negativeList = []
                    for (var i = 0; i < tempLabels.length; i++) {
                        var countPositive = 0
                        var countNegative = 0
                        var valList = tempJsonDict[tempLabels[i]]
                        for (var j = 0; j < valList.length; j++) {
                            var sent = tempJsonDict[tempLabels[i]][j][4]
                            if (sent == 'Positive') {
                                countPositive += 1
                            } else if (sent == 'Negative') {
                                countNegative += 1
                            }
                        }
                        positiveList.push(countPositive)
                        negativeList.push(countNegative)
                    }
                    tempDatasets.push(createDataset('Positive', positiveList, 'green'))
                    tempDatasets.push(createDataset('Negative', negativeList, 'red'))

                    setPrimaryLabels(tempLabels)
                    setPrimaryDatasets(tempDatasets)

                    setStartDate(dayjs(String(tempLabels.slice(0, 1))))
                    setEndDate(dayjs(String(tempLabels.slice(-1))))

                    setTempStartDate(dayjs(String(tempLabels.slice(0, 1))))
                    setTempEndDate(dayjs(String(tempLabels.slice(-1))))


                    setDoughnutState({
                        labels: createDoughnutState(tempDatasets)[1],
                        datasets: createDoughnutState(tempDatasets)[0]
                    }
                    )

                    setState({
                        labels: tempLabels,
                        datasets: tempDatasets
                    })

                    setIsLoading(false)
                })
        }, [])
        return (
            <><Box sx={{
                ml: '25vw',
                mb: '-5vh',
                display: 'flex',
            }}>

                <Button onClick={handleReset}
                    variant='disabled'
                    sx={{
                        color: 'black',
                        fontSize: 'small',
                        fontFamily: 'inter',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        "&.Mui-disabled": {
                            color: "black"
                        },
                        mr: '-17px'
                    }}
                >
                    zoom:
                </Button>

                <Button onClick={handleUpdateZoom}
                    sx={{
                        color: 'black',
                        fontSize: 'small',
                        fontFamily: 'inter',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        mr: '-17px'
                    }}
                >
                    Apply /
                </Button>

                <Button onClick={handleReset}
                    sx={{
                        color: 'black',
                        fontSize: 'small',
                        fontFamily: 'inter',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        mr: '-20px'
                    }}
                >
                    Reset
                </Button>

            </Box><Filter
                    tempStartDate={tempStartDate}
                    tempEndDate={tempEndDate}

                    setTempStartDate={setTempStartDate}
                    setTempEndDate={setTempEndDate}

                    handleUpdate={handleUpdate}
                    handleReset={handleReset}

                    startDate={startDate}
                    endDate={endDate}

                    entityLabelsList={entityLabelsList}
                    tempEntityLabelsList={tempEntityLabelsList}
                    setTempEntityLabelsList={setTempEntityLabelsList}

                    countryLabelsList={countryLabelsList}
                    tempCountryLabelsList={tempCountryLabelsList}
                    setTempCountryLabelsList={setTempCountryLabelsList}

                    sourceLabelsList={sourceLabelsList}
                    tempSourceLabelsList={tempSourceLabelsList}
                    setTempSourceLabelsList={setTempSourceLabelsList} /><Box height='80vh' display='flex' justifyContent="center">
                    <Box width={'30%'} height={'70%'} mr={5}>
                        <Doughnut options={doughnutOptions} data={doughnutState} />
                    </Box>

                    <Box width={'70%'} height={'70%'}>
                        <Line options={lineOptionsFunction(startDateZoom, endDateZoom)} data={state} />
                    </Box>
                </Box></>
        )
    }

    if (isLoading) {
        return <Box display={'flex'} justifyContent={'center'}><Spinner lg /></Box>
    }

    return (
        <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl'>

            <SubMenuSentiment chartVisualization={chartVisualization()} wordCloudVisualization={wordCloudVisualization()} />

        </Container>

    )
}




