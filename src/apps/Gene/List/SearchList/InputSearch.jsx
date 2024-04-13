import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material'
import { PATH_GENE } from 'apps/Gene';

export function InputSearch({ handleSearch = () => { } }) {
    const [value, setValue] = useState("")

    const handelOnSearch = () => {
        handleSearch(value)
    }
    return (
        <div>
            <Typography sx={{ml: 2}} gutterBottom variant="normal" component="div">
                Search
            </Typography>
            <div>
                <TextField
                    size='small'
                    sx={{
                        width: "100%",
                        backgroundColor: "white"
                    }}
                    id="searchInput"
                    aria-describedby="input-searcht"
                    InputProps={{
                        startAdornment: <SearchIcon />,
                        'aria-label': 'search-keyword',
                    }}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onKeyUp={(event) => {
                        if (event.key === "Enter") {
                            handelOnSearch()
                        }
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Button
                    size='small'
                    color='primary'
                    onClick={handelOnSearch}
                >
                    Advance Search
                </Button>
                <Button
                    size='small'
                    variant="contained"
                    color='secondary'
                    onClick={handelOnSearch}
                >
                    search
                </Button>
            </div>

        </div>
    )
}