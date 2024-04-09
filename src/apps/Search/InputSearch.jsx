import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { Button, Paper } from '@mui/material'
import { PATH_SEARCH } from '.';


export function InputSearch() {
    const [value, setValue] = useState("")
    const navigate = useNavigate();

    const handelOnSearch = () => {
        navigate("/" + PATH_SEARCH.path + "/" + value)
    }
    return (
        <Paper
            elevation={0}
            sx={{ m: 1, display: 'flex', alignItems: 'center', width: "55vw", backgroundColor: "transparent" }}
        >
            <TextField
                size='small'
                sx={{
                    width: "80%",
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
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="contained" color='error'
                sx={{ width: "20%" }}
                onClick={handelOnSearch}
            >
                search
            </Button>
        </Paper>
    )
}