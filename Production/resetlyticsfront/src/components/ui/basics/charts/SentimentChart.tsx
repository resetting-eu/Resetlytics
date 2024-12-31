'use client'

import React from 'react'
import { Container, Box, Typography, Button, Grid, Stack } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

import { getDatesBetween } from '@/components/utils/dates';

function random(from: number, to: number) {
    return Math.floor(Math.random() * (to-from+1)) + from
}

const colours = ['limegreen', 'darkgray', 'salmon']

export default function SentimentChart({ sentiment }
    :
    { sentiment: Array<JSON> }) {

    let positives: any[] = []
    let negatives: any[] = []
    let neutrals: any[] = []

    const dates = getDatesBetween([2023, 10, 1], [2024, 5, 31], 7)
    let totals = [0,0,0]
    dates.forEach((d) => {
        const pos = random(6, 30)
        const neu = random(1, 8)
        const neg = random(1, 6)
        positives.push(pos)
        neutrals.push(neu)
        negatives.push(neg)
        totals[0] += pos
        totals[1] += neu
        totals[2] += neg

    })

    const piedata = [
        { label: 'Positive', value: totals[0] },
        { label: 'Neutral', value: totals[1] },
        { label: 'Negative', value: totals[2] },
    ];


    return (
        <Grid container spacing={1} justifyContent={'flex-start'} alignItems={'flex-end'}>
            <Grid item xs={3}>
                <PieChart
                    series={[
                        {
                            startAngle: -90,
                            endAngle: 90,
                            data: piedata,
                            // cx: 500,
                            // cy: 200,
                            innerRadius: 40,
                            outerRadius: 80,
                            paddingAngle: 2,
                        },
                    ]}
                    margin={{ top: 2, bottom: 2, left: 2, right: 2 }}
                    width={300}
                    height={300}
                    colors={colours}
                    title={'Overall sentiment'}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
            </Grid>
            <Grid item xs={9}>
                <LineChart
                    xAxis={[
                        {
                            id: 'weeks',
                            data: dates,
                            scaleType: 'time',
                            valueFormatter: (date) => date.toDateString()
                        },
                    ]}
                series={[
                    {
                        id: 'series-1',
                        data: positives,
                        label: 'Positive',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        // highlightScope: {
                        //     highlighted: 'item',
                        // },
                    },
                    {
                        id: 'series-2',
                        data: neutrals,
                        label: 'Neutral',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        // highlightScope: {
                        //     highlighted: 'item',
                        // },
                    },
                    {
                        id: 'series-3',
                        data: negatives,
                        label: 'Negative',
                        area: true,
                        stack: 'total',
                        showMark: false,
                        // highlightScope: {
                        //     highlighted: 'item',
                        // },
                    },
                ]}
                margin = {{ top: 80, bottom: 40, left: 80, right: 60 }}
                width={600}
                height={400}
                title={'Weekly sentiment over time'}
                colors={colours} 
        />

            </Grid>
        </Grid>

    );
}

// stackOffset: 'none',
//  <Line options={options} data={linedata}/>

/*

    sentiment.forEach((v) => {
        const outcome = v.outcome.toLowerCase()
        if (outcome === 'positive') {
            positives.push(v)
        } else if (outcome === 'negative') {
            negatives.push(v)
        } else {
            neutrals.push(v)
        }
    })

    positives.sort((a, b) => {
        let da = new Date(a.date)
        let db = new Date(b.date)
        return da - db
    })
    negatives.sort((a, b) => {
        let da = new Date(a.date)
        let db = new Date(b.date)
        return da - db
    })
    neutrals.sort((a, b) => {
        let da = new Date(a.date)
        let db = new Date(b.date)
        return da - db
    })

    const countpositives = positives.reduce((a, { date }) => {
        a[date] = (a[date] || { date: date, count: 0 });
        a[date]['count'] += 1;
        return a;
    }, {});
    const countnegatives = negatives.reduce((a, { date }) => {
        a[date] = (a[date] || { date: date, count: 0 });
        a[date]['count'] += 1;
        return a;
    }, {});
    const countneutrals = neutrals.reduce((a, { date }) => {
        a[date] = (a[date] || { date: date, count: 0 });
        a[date]['count'] += 1;
        return a;
    }, {});



*/