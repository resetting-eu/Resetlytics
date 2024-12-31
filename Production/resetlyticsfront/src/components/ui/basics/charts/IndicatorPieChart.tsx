'use client'

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';


// const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

// const getArcLabel = (params) => {
//   const percent = params.value / TOTAL;
//   return `${(percent * 100).toFixed(0)}%`;
// };

// slotProps={{
//     legend: { hidden: true },
//   }}
const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  const Paired = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928',
  ];

const chartSettings = {
    margin: { right: 5 },
    width: 400,
    height: 400,
    legend: { hidden: true },
    
  };

// const series = {
//     [
//         {
//             innerRadius: 0,
//             outerRadius: 80,
//             data: data1,
//           },
//           {
//             innerRadius: 100,
//             outerRadius: 120,
//             paddingAngle: 5,
//             // cx: ...
//             // cy: ...
//             // arcLabel: getArcLabel,
//             data: data2,
//           },
//     ]
// }

// in series: startAngle: -90,
//          endAngle: 90,

function PieCenterLabel(children : any) {
    //const { width, height, left, top } = useDrawingArea();
    const width = 200, height = 200, top = 10, left = 20
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

function calculateAverage(values: Array<number>) {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return values.length ? sum / values.length : 0;
  }

// for year to date
export default function IndicatorPieChart({title, name, dimension, baseline} 
  :
  { title: string, name: string, dimension: Array<number>, baseline: Array<number>}) {

 const max = 10

  let val = calculateAverage(dimension)
  let all = calculateAverage(baseline)
  
  const valto = max-val
  const allto = max-all

    return (
      <Stack direction="column">
      <Typography sx={{mt: 2}}>{title}</Typography>
        <PieChart sx={{mt: 0}}
        
        series={[
            {
                data: [
                    { label: name, value: val, color: '#1f78b4' },
                    { label: 'To target', value: valto, color: 'white'},
                  ],
                  innerRadius: 30,
                    outerRadius: 50,
      paddingAngle: 2,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 90,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                   // faded: { innerRadius: 30, additionalRadius: -5, color: 'gray' },
            },
            {
                data: [
                    { label: 'All SMEs', value: all, color: '#a6cee3' },
                    { label: 'To target', value: allto, color: 'white' },
                  ],
                  innerRadius: 55,
                    outerRadius: 75,
      paddingAngle: 2,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 90,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  //  faded: { innerRadius: 30, additionalRadius: -5, color: 'gray' },
            },

        ]}
        width={200}
      height={200}
      title={'Relative performance over 1 year'}
      margin={{ top: 60, bottom: 0, left: 0, right: 0 }}
        colors={Paired}
        // {...chartSettings}
        slotProps={{
            legend: { hidden: true },
          }}
        >
        </PieChart>
        </Stack>
    )
}

