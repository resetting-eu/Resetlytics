import React from 'react'
import type { Metadata } from 'next'
import Help from '@components/views/Help'


export const metadata: Metadata = {
  title: 'Help - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

const page = () => {
  return (
    <Help />
  )
}

export default page