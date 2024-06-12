import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



function Querygene({ query = [], setQuery = () => { } }) {

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const queryShowed = query.map((gene) => { return gene.label }).join("\n");
    return (<div>
        <div><Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField
                disabled
                id="outlined-multiline-static"
                label="QueryGene"
                multiline
                rows={8}
                value={queryShowed}
                onChange={handleChange}
            />
        </Box></div>

        
    </div>);
}

export default Querygene;