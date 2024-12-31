'use client';

import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Tabs, Stack, Tab, Box, Grid, RadioGroup, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Radio from '@mui/material/Radio';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { IMenu } from '@/lib/ui/definitions';


export default function TwoLevelsMenu({name, menu, pathname} 
  : 
  {name: string, menu: IMenu, pathname: string}) {
    const [value1, setValue1] = React.useState("");
    const [value2, setValue2] = React.useState("")

    //console.log('TwoLevelsMenu|',value1,'|',value2)
    const router = useRouter()

    useEffect(()=> {
      
        const level2 = value2.split('/')
        let newsegment = value1 === level2[0] ? value2 : value1
        let newpathname = '/'+pathname
        if (newsegment) {
            newpathname += '/'+newsegment.toLowerCase()
        }
       router.replace(newpathname); // or router.replace()
    }, [value1, value2])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setValue1(event.target.value.trim());
    }

    const selmenu = menu

    if (selmenu.length < 1) {
        return (<></>) // To do: proper error message
    }
    return (
        <>
        {/*<Typography sx={{m: 1}}>{name}</Typography>*/}
        <Stack direction="row" spacing={3}>
            {
                selmenu.map((level, index) => {
                    return (
                    <Stack key={index} direction="column" sx={{ m: 0, p:0 }}>
                    <Radio sx={{ m: 0, p:0 }}
                    checked={value1 === level.label}
                    onChange={handleChange}
                    value={level.label}
                    name={level.label}
                    key={level.label}
                    inputProps={{ 'aria-label': level.label }}
                />
                <SimpleListMenu label={level.label} menu={level.menu} callback={setValue2} />
                </Stack>
                    )

                })
            }   
       </Stack>
       </>
    );
}


// We could have passed callback functions ...
function SimpleListMenu({label, menu, callback}: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
      setAnchorEl(event.currentTarget);
    };
  
    const name = label
    const options = menu
    const holdoptions = options.length > 0
    
    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement>,
      index: number,
    ) => {
        event.preventDefault();
      setSelectedIndex(index);

      callback(label + '/' + options[index].label)
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <List
          component="nav"
          aria-label={name}
          sx={{ bgcolor: 'background.paper', m: 0, p:0 }}
        >
          <ListItemButton
            sx={{ m: 0, p:0 }}
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label={name}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary={name}
              secondary={holdoptions ? options[selectedIndex].label : ""}
            />
          </ListItemButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option: { label: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined; }, index: number) => (
            <MenuItem
              key={index}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
