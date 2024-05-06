import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
//import Typography from "@mui/material/Typography";
//import Divider from '@mui/material/Divider';
import { Button } from '@mui/material'
import { DataVerifier } from 'ui-components/utils';
//import { PATH_GENE } from 'apps/Gene';

export function InputSearch({ handleSearch = () => { }, handleClean = ()=>{} }) {
    const [value, setValue] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    const handleOnClean =()=>{
        handleClean()
        setValue("")
        setIsSearch(false)
    }

    const handelOnSearch = () => {
        handleSearch(value)
        setIsSearch(true)
    }
    return (
        <div>
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
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                {/*
                <Button
                    size='small'
                    color='primary'
                    onClick={handelOnSearch}
                >
                    Advance Search
                </Button>
                */}
                {isSearch ? (
                    <Button
                        size='small'
                        variant="contained"
                        color='error'
                        onClick={handleOnClean}
                    >
                        clean
                    </Button>
                ) : (
                    <Button
                        size='small'
                        variant="contained"
                        color='secondary'
                        onClick={handelOnSearch}
                    >
                        search
                    </Button>
                )}

            </div>

        </div>
    )
}