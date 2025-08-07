import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff8a6',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


export default function Search({ onClick = () => {} }) {
    const [value, setValue] = useState("")
    let navigate = useNavigate();
    const handleSearch = () => {
        onClick()
        setTimeout(() => {
            navigate("/search/" + value);
        }, 200);
    }
    return (
        <div style={{ display: "grid", gridTemplateColumns: "70% 1% 20%", width: "70%" }}>
            <Paper
                sx={{
                    width: "100%",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit">RegulonDB TIP!</Typography>
                            Use double quotes to search for phrases like product names; <br/>
                            You can use the OR or AND operators to make your search more precise.
                        </React.Fragment>
                    }
                >
                    <SearchIcon />
                </HtmlTooltip>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Example "Putative Membrane", arac OR fimb'
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                    inputProps={{ "aria-label": "regulonDB search" }}
                    onKeyUp={(event) => {
                        if (event.key === "Enter" && value.length > 0) {
                            handleSearch()
                        }
                    }}
                />
            </Paper>
            <div></div>
            <Button sx={{ width: "100%" }} onClick={handleSearch} color="error" variant="contained">
                Search
            </Button>
        </div>
    );
}
