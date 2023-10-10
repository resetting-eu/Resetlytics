'use client'
import React from 'react'
import { Container, Typography } from '@mui/material'


export default function ServiceQuality() {
  return (
    <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl' >
        <Typography
                variant="h6"
                align="center"
                sx={{
                    mb: 4,
                    fontFamily: 'inter',
                    fontWeight: 700,
                    color: 'black',
                    textDecoration: 'none',
                }}
            >
                Service Quality
            </Typography>
    </Container>
)}

