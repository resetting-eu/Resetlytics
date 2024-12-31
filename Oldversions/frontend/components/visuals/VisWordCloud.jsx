'use client'
import React from 'react'

import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { TagCloud } from 'react-tagcloud'


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


export default function VisWordCloud({ data }) {

    let wcloud = []
    for (var v in data) {
        wcloud.push({ value: data[v].words, count: data[v].count_words })
    }

    return (
        <TagCloud
            minSize={30}
            maxSize={60}
            colorOptions={options}
            tags={wcloud}
        //onClick={(tag) => console.log('clicking on tag:', tag)}
        />
    )

}
