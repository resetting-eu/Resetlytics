import React from 'react'
import type { Metadata } from 'next'
import ServiceQuality from '@components/visualization/ServiceQuality'


export const metadata: Metadata = {
  title: 'Service Quality - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

const page = () => {
  return (
    <ServiceQuality />
  )
}

export default page