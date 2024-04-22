import React from "react";
import {
    Box,
    useTheme,
    FormControl,
    InputLabel,
    Select, OutlinedInput, MenuItem, Chip
} from "@mui/material";

function getStyles(label, selectedLabel, theme) {
    return {
        fontWeight:
            selectedLabel.indexOf(label) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Picker({ labelsList, tempLabelsList, setTempLabelsList, title }) {
    const theme = useTheme();
    const handleSelectedLabels = (event) => {
        const {
            target: { value },
        } = event;
        setTempLabelsList(value);
    };
    return (
        <Box sx={{ display: 'block', py: '0.5' }}>
            <FormControl >
                <InputLabel
                    id="demo-multiple-checkbox-label"
                    sx={{
                        "&.Mui-focused": {
                            color: "#46b3c2",
                        },
                    }}
                >
                    {title}
                </InputLabel>
                <Select

                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tempLabelsList}
                    onChange={(event) => {
                        handleSelectedLabels(event);
                    }}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.slice(0, 2).map((value) => (
                                <Chip key={value} label={value} />
                            ))
                            }
                            {selected.length > 2 ? <Chip key={'...'} label={'...'} /> : null }
                        </Box>
                    )}
                    input={<OutlinedInput label={title} />}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                    }}
                    sx={{

                        "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                            },
                            "&:hover fieldset": {
                                borderColor: "#46b3c2"
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#46b3c2"
                            }
                        }
                    }}
                >
                    {labelsList.map((label) => (
                        <MenuItem key={label} value={label} style={getStyles(label, tempLabelsList, theme)}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </Box>
    )
}