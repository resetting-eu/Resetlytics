
'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function CustomTabPanel(props) {
  const { children, value, index, } = props;

  return (
    <div
      hidden={value !== index}
    >
      {value === index && (
        <>
          {children}
        </>


      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function BasicTabs({chartVisualization, wordCloudVisualization}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var tabSX = {
    "&.Mui-selected": { color: "#46b3c2" },
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: 'inter',
    fontWeight: 500,
    color: 'black',
    "&:hover": {
      color: "#46b3c2",
    },
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Box display="flex"
    justifyContent="center"
    alignItems="center" sx={{ pb: '4vh', }}>
        <Tabs value={value} onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#46b3c2",
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
          >
          <Tab label="Analysis" sx={tabSX} />
          <Tab label="Wordcloud" sx={tabSX} />
        </Tabs>
      </Box>
      
      <CustomTabPanel value={value} index={0}>
        {chartVisualization}
      </CustomTabPanel>
          
      <CustomTabPanel value={value} index={1}>
        {wordCloudVisualization}
      </CustomTabPanel>
    
    </Box>
  );
}



