'use client'

import React, { useEffect, useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import { Button, Box } from '@mui/material';



export default function FlagPicker({ labelsList, tempLabelsList, setTempLabelsList, handleUpdate }) {

    const [selPT, setSelPT] = useState(['3px solid',"outlined"])
    const [selEU, setSelEU] = useState(['3px solid',"outlined"])

    const handleFlagPicker = (value) => {
        if (tempLabelsList.includes(value)) {
            setTempLabelsList(tempLabelsList.filter(function (v) {return v !== value }))
            if (value == 'portugal') {
                setSelPT(['',''])
            } else if (value == 'europe') {
                setSelEU(['',''])
            }
            
        } else {
            setTempLabelsList(tempLabelsList.concat(value))
            if (value == 'portugal') {
                setSelPT(['3px solid','outlined'])
            } else if (value == 'europe') {
                setSelEU(['3px solid','outlined'])
            }
        }
    };

    useEffect(() => {
        handleUpdate()
    }, [tempLabelsList])

    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'block',
                mb: -6
            }}
        >
            <Button
                sx={{
                    color: '#cdd32f',
                    border: selPT[0],
                    p: 0,
                    mx: 1,
                    ":hover": {
                        color: '#cdd32f',
                        border: '3px solid',
                        p: 0,
                        mx: 1,
                    }
                }}
                variant={selPT[1]}
                onClick={() => {
                    handleFlagPicker('portugal')
                }
                }
            >
                <ReactCountryFlag
                    countryCode="PT"
                    svg
                    style={{
                        width: '3em',
                        height: '3em',
                    }}
                    title="Portugal"
                />
            </Button>

            <Button
                sx={{
                    color: '#4ab6c2',
                    border: selEU[0],
                    p: 0,
                    mx: 1,
                    ":hover": {
                        color: '#4ab6c2',
                        border: '3px solid',
                        p: 0,
                        mx: 1,
                    }
                }}
                variant={selEU[1]}
                onClick={() => {
                    handleFlagPicker('europe')
                }
                }
            >
                <ReactCountryFlag
                    countryCode="EU"
                    svg
                    style={{
                        width: '3em',
                        height: '3em',
                    }}
                    title="Europe"
                />
            </Button>
        </Box>
    )
}