'use client'

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// in series, add const valueFormatter = (value: number) => `${value}mm`;

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

//   direction={{ xs: 'row', xl: 'column' }}
//         spacing={3}
//         justifyContent="center"
//         flexWrap="wrap"
//         useFlexGap

export default function IndicatorBarChart({name, quarters, dimension, baseline} 
  :
  { name: string, quarters: Array<string>, dimension: Array<number>, baseline: Array<number>}) 
  {
  
  let values = [...dimension, ...baseline]

  let min = Math.min.apply(null, values)
  let max = Math.max.apply(null, values)


  // highlightScope:{highlighted, faded}

  return (
    <BarChart
      width={400}
      height={300}
      title={'Relative performance by quarter'}
      margin={{ top: 60, bottom: 20, left: 60, right: 60 }}
      series={[
        {
          data: baseline, label: 'All SMEs', id: 'id1',
          highlightScope: { highlighted: 'series', faded: 'global' }
        },
        {
          data: dimension, label: name, id: 'id2',
          highlightScope: { highlighted: 'series', faded: 'global' }
        },
      ]}
      xAxis={[{ min: min, max: max }]}
      yAxis={[{
        data: quarters,
        scaleType: 'band',
      }]}
      layout="horizontal"
      slotProps={{
        legend: {
          //direction: 'row',
          //position: { vertical: 'top', horizontal: 'middle' },
          // padding: 20,
        },
      }}
      colors={Paired}
    />
  );
}