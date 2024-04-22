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

export default function DimensionBarChart({data}) {


  // console.log('BAR CHART ', data)

  let name = data['name']
  //const indicator = data['indicator']
 
  
  let data1 = [];
  let data2 = [];
  let ylabels = [];

  if ('Q1' in data) {
    data1.push(data['Q1']['val'])
    data2.push(data['Q1']['all'])
    ylabels.push('(Q1) January - March')
  }
  if ('Q2' in data) {
    data1.push(data['Q2']['val'])
    data2.push(data['Q2']['all'])
    ylabels.push('(Q2) April - June')
  }
  if ('Q3' in data) {
    data1.push(data['Q3']['val'])
    data2.push(data['Q3']['all'])
    ylabels.push('(Q3) July - September')
  }
  if ('Q4' in data) {
    data1.push(data['Q4']['val'])
    data2.push(data['Q4']['all'])
    ylabels.push('(Q4) October - December')
  }
  if ('yeartodate' in data) {
    data1.push(data['yeartodate']['val'])
    data2.push(data['yeartodate']['all'])
    ylabels.push('Year to date')
  }
  if ('preyear' in data) {
    data1.push(data['preyear']['val'])
    data2.push(data['preyear']['all'])
    ylabels.push('Previous year')
  } 
    // highlightScope:{highlighted, faded}

  return (
    <BarChart
    width={600}
    height={300}
    title={data['indicator'] || ''}
    margin={{ top: 60, bottom: 40, left: 200, right: 10 }}
    series={[
      { data: data1, label: name, id: 'id1', 
      highlightScope:{highlighted: 'series', faded: 'global'}  },
      { data: data2, label: 'All organizations', id: 'id2', 
      highlightScope:{highlighted: 'series', faded: 'global'}  },
    ]}
    xAxis={[{ min: data['min'], max: data['max']}]}
    yAxis={[{ 
        data: ylabels, 
        scaleType: 'band', 
        categoryGapRatio: 0.4,
        barGapRatio: 0.1}]}
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