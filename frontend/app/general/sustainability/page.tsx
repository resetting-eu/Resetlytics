import React from 'react'
import type { Metadata } from 'next'
import Sustainability from '@components/visualization/Sustainability'


export const metadata: Metadata = {
  title: 'Sustainability - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

// self-diagnostic sustainability
const page = () => {
  return (
      <Sustainability />
  )
}

export default page