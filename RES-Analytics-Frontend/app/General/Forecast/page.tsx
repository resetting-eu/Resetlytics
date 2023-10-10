import React from 'react'
import TourismForecast from '@components/visualization/TourismForecast'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Forecast - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

const page = () => {
  return (
    <TourismForecast />
  )
}

export default page