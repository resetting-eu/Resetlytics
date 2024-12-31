import React from 'react'
import type { Metadata } from 'next'
import { Sustainability } from '@components/views/Sustainability'


export const metadata: Metadata = {
  title: 'Sustainability - RESETTING',
  description: 'RESETTING Forecasting & Analytics Webapp',
}

// self-diagnostic sustainability
const page = () => {
  return (
    <>
    {/* @ts-expect-error Async Server Component */}
      <Sustainability />
      </>
  )
}

export default page