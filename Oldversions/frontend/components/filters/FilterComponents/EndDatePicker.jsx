import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, } from '@mui/material';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default function EndDatePicker({ tempEndDate, setTempEndDate, startDate, endDate }) {
  const format = 'YYYY-MM-DD';

  const handleEndDate = (newValue) => {
    if (newValue !== null && dayjs(newValue).isSameOrAfter(dayjs(startDate)) && dayjs(newValue).isSameOrBefore(dayjs(endDate))) {
      setTempEndDate(dayjs(newValue))
    }
  };

  return (
    <Box sx={{ display: 'block', py: '0.5' }}>
      <DatePicker
        label="End Date"
        minDate={dayjs(startDate)}
        maxDate={dayjs(endDate)}
        value={tempEndDate}
        onChange={(newValue) => {
          handleEndDate(newValue)
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

