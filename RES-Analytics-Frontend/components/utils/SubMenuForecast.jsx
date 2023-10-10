

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



export default function BasicTabs(questionsDict) {
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
          <Tab label="Enterprise  Management" sx={tabSX} />
          <Tab label="Economic Value" sx={tabSX} />
          <Tab label="Social and Cultural Impact" sx={tabSX} />
          <Tab label="Environmental Impact" sx={tabSX} />
        </Tabs>
      </Box>

      {
        Object.keys(questionsDict.questionsDict).map(function (key) {
          if (questionsDict.questionsDict[key].dimension == "Enterprise  Management") {
            return (<CustomTabPanel value={value} index={0} >
              <MutipleChoice item_code={key} text={questionsDict.questionsDict[key].text} />
            </CustomTabPanel>)
          } else if (questionsDict.questionsDict[key].dimension == "Economic Value") {
            return (<CustomTabPanel value={value} index={1}>
              <MutipleChoice item_code={key} text={questionsDict.questionsDict[key].text} />
            </CustomTabPanel>)
          } else if (questionsDict.questionsDict[key].dimension == "Social and Cultural Impact") {
            return (<CustomTabPanel value={value} index={2}>
              <MutipleChoice item_code={key} text={questionsDict.questionsDict[key].text} />
            </CustomTabPanel>)
          } else if (questionsDict.questionsDict[key].dimension == "Environmental Impact") {
            return (<CustomTabPanel value={value} index={3}>
              <MutipleChoice item_code={key} text={questionsDict.questionsDict[key].text} />
            </CustomTabPanel>)
          }
        })}
    </Box>
  );
}



