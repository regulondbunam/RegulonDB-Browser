import React from "react"
import InputAdornment from '@mui/material/InputAdornment';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import { Button, Tooltip } from "@mui/material";

export function GlobalFilter({
    value,
    onChange,
    debounce = 500,
    placeholder,
    ...props
}) {
    //const [view, setView] = React.useState(false)

    return (
        <div style={{ display: "flex", alignItems: "center" }} >
            <Tooltip title="General filter" >
            <TextField
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            id="globalSearch-textfield"
            color="secondary"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                            <FilterAltIcon color="secondary" />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                size="small"
                sx={{
                    width: "200px",
                    '& .MuiOutlinedInput-root': { height: "25px", backgroundColor: "#ffffff" },
                }}
                />
                </Tooltip>
        </div>
    )
}