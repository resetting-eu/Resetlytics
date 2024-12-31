import React from 'react'
import SentimentAnalysis from '@components/visualization/SentimentAnalysis'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Sentiment - RESETTING',
  description: 'RESETTING Forecasting and Analytics Webapp',
}

const page = () => {
  return (
    <>
      <SentimentAnalysis />
    </>
  )
}

export default page