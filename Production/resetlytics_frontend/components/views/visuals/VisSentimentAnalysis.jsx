'use client'
import React from 'react'
import { Container, Box, Typography, Button, Grid, Stack } from '@mui/material';
import Filter from '@components/filters/SentimentAnalysis'
import { Line, Doughnut } from 'react-chartjs-2';
import Spinner from '@components/common/Spinner';
import dayjs from 'dayjs';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { TagCloud } from 'react-tagcloud'
import LoadingButton from '@mui/lab/LoadingButton';

import { LineChart } from '@mui/x-charts/LineChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

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

const options = {
    hue: '#46b3c2',
}


const doughnutOptions = {
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

function lineOptionsFunction() {
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



export default function VisSentimentAnalysis({data}) {

    let positives = data.filter(element => {
        return element.outcome == 'Positive'
    });
    let negatives = data.filter(element => {
        return element.outcome == 'Negative'
    });

    positives.sort((a,b) => {
        let da = new Date(a.date)
        let db = new Date(b.date)
        return da-db
    })
    negatives.sort((a,b) => {
        let da = new Date(a.date)
        let db = new Date(b.date)
        return da-db
    })
    
   const countpositives = positives.reduce((a, {date}) => {
        a[date] = (a[date] || {date: date, count:0});
        a[date]['count'] +=1 ;
        return a;
   }, {});
   const countnegatives = negatives.reduce((a, {date}) => {
    a[date] = (a[date] || {date: date, count:0});
    a[date]['count'] +=1 ;
    return a;
}, {});


    const posvsneg = [positives.length, negatives.length]

    let pos = []
    let neg = []
    let xlabels = new Set()
  
    for (var key in countpositives) {
        xlabels.add(countpositives[key].date)
        pos.push(countpositives[key].count)

    }
    for (var key in countnegatives) {
        const date = countnegatives[key].date
        neg.push(countnegatives[key].count)
    }

    const options = {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Sentiment analysis',
          },
          scales: {
            y: {
              min: 0
            },
            x: {
                type: 'time',
                time: {
                    parser: 'YYYY-MM-DD',
                    displayFormats: {
                        month: 'YYYY-MM',
                        day: 'YYYY-MM-DD',
                    },
                    tooltipFormat: 'YYYY-MM-DD'
                },
                ticks: {
                  // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                  callback: function(val, index) {
                    // Hide every 2nd tick label
                    return index % 2 === 0 ? this.getLabelForValue(val) : '';
                  },
                  // color: 'red',
                }
              }
          }
      }

    let linedata = { 
        labels: [...xlabels],
        datasets: [ 
            {
            label: 'Positive',
            data: pos,
            borderColor: 'limegreen'

        },
        ]
    }

    const doughnutoptions ={
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          tooltip: {
            enabled: true
          }
        },
        rotation: -90,
        circumference: 180,
        cutout: "60%",
        maintainAspectRatio: true,
        responsive: true,
      }

    const doughnutdata = {
        labels: [
          'Positive',
          'Negative',
        ],
        datasets: [{
          label: '  ',
          data: posvsneg,
          backgroundColor: [
            'limegreen',
            'orangered'
          ],
          hoverOffset: 4
        }]
      };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4} justifyContent="center" alignItems="center">
            <Doughnut options={doughnutoptions} data={doughnutdata}/>
            </Grid>
            <Grid item xs={8} justifyContent="center" alignItems="center">
            <Line options={options} data={linedata}/>
            </Grid>
          </Grid>

  );
}
