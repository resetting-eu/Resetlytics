import React from 'react'
import type { Metadata } from 'next'
import { ServiceQuality } from '@components/views/ServiceQuality'


export const metadata: Metadata = {
  title: 'Service Quality - RESETTING',
  description: 'RESETTING Forecasting and Analytics Webapp',
}

export default async function Page() {
  return (
    <>
    {/* @ts-expect-error Async Server Component */}
    <ServiceQuality />
    </>
  )
}