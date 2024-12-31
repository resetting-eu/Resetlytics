import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import StartDatePicker from '@components/filters/FilterComponents/StartDatePicker'
import EndDatePicker from '@components/filters/FilterComponents/EndDatePicker'
import ApplyResetFilter from '@components/filters/FilterComponents/ApplyResetFilter'
import Picker from '@components/filters/FilterComponents/Picker'
import Divider from '@mui/material/Divider';


                                                                                        

export default function Filter({ tempStartDate, tempEndDate, 
    setTempStartDate, setTempEndDate, 
    handleUpdate, handleReset, 
    startDate, endDate, 
    entityLabelsList, tempEntityLabelsList, setTempEntityLabelsList,
    countryLabelsList, tempCountryLabelsList, setTempCountryLabelsList,
    sourceLabelsList, tempSourceLabelsList, setTempSourceLabelsList,
    }) {
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);

    const handleOpenFilterMenu = (event) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElFilter(null);
    };
    return (
        <div style={{
            display: 'flex'
        }}>
            <Button onClick={handleOpenFilterMenu}
                sx={{
                    my: 1,
                    mx: 1,
                    color: 'black',
                    fontFamily: 'inter',
                    fontWeight: 600,
                    display: 'block',
                    textTransform: 'capitalize',
                    marginLeft: "auto"
                }}
            >
                Filter
                <FilterAltIcon fontSize="small" style={{ fill: 'res_blue' }} />
            </Button>

            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElFilter}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElFilter)}
                    onClose={handleCloseUserMenu}
                >

                    {/* SELECT START DATE */}

                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <StartDatePicker
                            tempStartDate={tempStartDate}
                            setTempStartDate={setTempStartDate}
                            startDate={startDate}
                            endDate={endDate} />
                    </MenuItem>

                    {/* SELECT END DATE */}

                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <EndDatePicker
                            tempEndDate={tempEndDate}
                            setTempEndDate={setTempEndDate}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </MenuItem>

                    {/* SELECT SOURCE */}

                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <Picker
                            labelsList={sourceLabelsList}
                            tempLabelsList={tempSourceLabelsList}
                            setTempLabelsList={setTempSourceLabelsList}
                            title='Source'
                            />
                    </MenuItem>

                    {/* SELECT ENTITY 
                    
                    
                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <Picker
                            labelsList={entityLabelsList}
                            tempLabelsList={tempEntityLabelsList}
                            setTempLabelsList={setTempEntityLabelsList}
                            title='Entity'
                            />
                    </MenuItem>
                    
                    
                    */}

                    

                    {/* SELECT COUNTRY */}

                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <Picker
                            labelsList={countryLabelsList}
                            tempLabelsList={tempCountryLabelsList}
                            setTempLabelsList={setTempCountryLabelsList}
                            title='Country'
                            />
                    </MenuItem>

                    <Divider light/>

                    {/* APPLY/RESET CHANGES */}

                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFFFFF" } }}>
                        <ApplyResetFilter
                            handleUpdate={handleUpdate}
                            handleReset={handleReset}
                            handleCloseUserMenu={handleCloseUserMenu}
                        />
                    </MenuItem>
                </Menu>
            </LocalizationProvider>
        </div>
    )
}
