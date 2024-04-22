import * as React from 'react';
import { useMemo, useState, useContext } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Breadcrumbs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useTasks, useTasksDispatch } from '@components/context/TaskContext';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
const icons = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];


export default function MenuModule({menu}) {


  const [menuvalue, setMenuValue] = useState('');  // the last picked value in the menus

  const dispatch = useTasksDispatch();
  
  // local ui
  const [menulevel1, setMenulevel1] = useState(menu.value.toString());
  const [menulevel2, setMenulevel2] = useState('');

  const handleChange1 = (event, newvalue) => {
    setMenulevel1(newvalue);
    setMenuValue(newvalue)
    dispatch({
      type: 'changed',
      task: {
        id: 1,
        value: newvalue,
      }
    }); 
  };

  const handleChange2 = (event, newvalue) => {
    setMenulevel2(newvalue);
    setMenuValue(newvalue)
    dispatch({
      type: 'changed',
      task: {
        id: 2,
        value: newvalue,
      }
    }); 
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      
        <Box sx={{ borderColor: 'divider' }}>
            <Tabs value={menulevel1} onChange={handleChange1} aria-label="tabs">
              {menu.options.map((option) => (
                <Tab key={option.value} label={option.label} value={option.value.toString()} />
              ))}
            </Tabs>
        </Box>
        {menu.options.map((option, key) => (     
              <Box sx={{transform: 'translateZ(0px)', flexGrow: 1 }}>
                <Typography>{option.islevel2}</Typography>
                {option.value == menulevel1 && option.islevel2 && <ToggleButtonGroup
                          color="primary"
                          value={menulevel2}
                          exclusive
                          onChange={handleChange2}
                          aria-label="Platform"
                      >
                      {option.level2.map((action) => (
                        <ToggleButton
                        key={action.value}
                        value={action.value.toString()}
                        aria-label={action.value.toString()}
                        icon={icons[1].icon}
                        >
                          {action.label}
                        </ToggleButton>
          
                      ))}
                  </ToggleButtonGroup>
              }  
              </Box> 
        ))}
    </Box>
  )
}