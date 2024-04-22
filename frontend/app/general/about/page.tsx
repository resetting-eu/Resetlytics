import React from 'react'
import type { Metadata } from 'next'
import About from '@components/visualization/About'


export const metadata: Metadata = {
  title: 'Help - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

const page = () => {
  return (
    <About />
  )
}

export default page