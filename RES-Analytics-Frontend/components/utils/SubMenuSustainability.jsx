

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MutipleChoice from '@components/optionsType/MultipleChoice'
import LikertScale from '@components/optionsType/LikertScale'
import TextEntry from '@components/optionsType/TextEntry'



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

function selectOptionType(isAuthenticated, info, value, index) {

  if (info.question_fk.type == 'Multiple Choice') {
    return (<CustomTabPanel value={value} index={index} >
      <MutipleChoice isAuthenticated={isAuthenticated} info={info} />
    </CustomTabPanel>)
  } else if (info.question_fk.type == 'Likert Scale') {
    return (<CustomTabPanel value={value} index={index} >
      <LikertScale isAuthenticated={isAuthenticated} info={info} />
    </CustomTabPanel>)
  } else if (info.question_fk.type == 'Text Entry') {
    return (<CustomTabPanel value={value} index={index} >
      <TextEntry isAuthenticated={isAuthenticated} info={info} />
    </CustomTabPanel>)
  } else return(<></>)

}


export default function BasicTabs({dict, isAuthenticated}) {
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
          <Tab label="Enterprise Management" sx={tabSX} />
          <Tab label="Economic Value" sx={tabSX} />
          <Tab label="Social and Cultural Impact" sx={tabSX} />
          <Tab label="Environmental Impact" sx={tabSX} />
        </Tabs>
      </Box>

      {
        Object.keys(dict).map(function (key) {
          if (dict[key].question_fk.dimension == "Enterprise  Management") {
            return selectOptionType(isAuthenticated, dict[key], value, 0)
          } else if (dict[key].question_fk.dimension == "Economic Value") {
            return selectOptionType(isAuthenticated, dict[key], value, 1)
          } else if (dict[key].question_fk.dimension == "Social and Cultural Impact") {
            return selectOptionType(isAuthenticated, dict[key], value, 2)
          } else if (dict[key].question_fk.dimension == "Environmental Impact") {
            return selectOptionType(isAuthenticated, dict[key], value, 3)
          }
        })}
    </Box>
  );
}



