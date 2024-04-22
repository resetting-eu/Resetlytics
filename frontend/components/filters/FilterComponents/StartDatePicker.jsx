import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, } from '@mui/material';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default function StartDatePicker({ tempStartDate, setTempStartDate, startDate, endDate }) {

  const format = 'YYYY-MM-DD';
  const handleStartDate = (newValue) => {
    if (newValue !== null && dayjs(newValue).isSameOrAfter(dayjs(startDate)) && dayjs(newValue).isSameOrBefore(dayjs(endDate))) {
      setTempStartDate(dayjs(newValue))
    }
  };
  return (
    <Box sx={{ display: 'block', py: '0.5' }}>
      <DatePicker
        label="Start Date"
        minDate={dayjs(startDate)}
        maxDate={dayjs(endDate)}
        value={tempStartDate}
        onChange={(newValue) => {
          handleStartDate(newValue)
        }}
        slotProps={{
          day: {
            selected: {
              backgroundColor: 'red',
            }
            
          }
        }}
        sx={{
          
          "& .MuiInputLabel-root": {
            '&.Mui-focused': {
              color: '#46b3c2',
            },

          },

          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#46b3c2',
            },
            "&:hover fieldset": {
              borderColor: "#46b3c2"
            },
          },
        }}
        format={format} />
    </Box>
  )
}

