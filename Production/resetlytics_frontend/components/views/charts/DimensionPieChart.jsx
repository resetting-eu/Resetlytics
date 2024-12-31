'use client'

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


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

function PieCenterLabel({ children }) {
    //const { width, height, left, top } = useDrawingArea();
    const width = 200, height = 200, top = 10, left = 20
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

// for year to date
export default function DimensionPieChart(data) {

  // one indicator
  // {indicator: 'service', org: 'Iscte', min: 1, max: 7, val, all, count, allcount }

  // console.log('PIE ', data)
  

  let name = data['name'] || 'Your organization'
  const indicator = data['indicator']
  const val = data['val']
  const valto = data['max']-val
  const all = data['all']
  const allto = data['max']-all


    return (
        <PieChart
        series={[
            {
                data: [
                    { label: org, value: val, color: '#1f78b4' },
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
                    { label: 'All organizations', value: all, color: '#a6cee3' },
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
        width={300}
      height={300}
        colors={Paired}
        // {...chartSettings}
        slotProps={{
            legend: { hidden: true },
          }}
        >
        </PieChart>
    )
}

// export default function DimensionPieChart() {
//     return (
//         <PieChart
//         series={[
//             {
//                 data: [
//                     { id: 0, value: 5.59, label: 'All companies' },
//                     { id: 1, value: 4.9, label: 'Your company' },
//                   ],
//                   innerRadius: 40,
//       outerRadius: 80,
//       paddingAngle: 2,
//       cornerRadius: 5,
//       startAngle: -90,
//       endAngle: 90,
//                   highlightScope: { faded: 'global', highlighted: 'item' },
//                     faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
//             }
//         ]}
//         colors={Paired}
//         {...chartSettings}
//         >
//         </PieChart>
//     )
// }

// <PieCenterLabel>Center label</PieCenterLabel>