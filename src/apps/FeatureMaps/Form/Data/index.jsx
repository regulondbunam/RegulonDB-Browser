import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Divider, Button } from '@mui/material';
import UserData from './UserData';

export default function DataOptions({
    state,
    dispatch,
    handleToDraw
}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <h2>Select data source</h2>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="User Data" value="1" />
                       {
                        //  <Tab disabled sx={{ width: 50, textTransform: "none" }} label="RegulonDB Ecoli k12" value="2" />
                       }
                    </TabList>
                </Box>
                <TabPanel value="1"><UserData state={state} dispatch={dispatch} handleToDraw={handleToDraw} /></TabPanel>
                <TabPanel value="2">regulon selector</TabPanel>
            </TabContext>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'flex-end'}} >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToDraw}
                    style={{ marginRight: '10px' }}
                >
                    Draw
                </Button>
            </div>
        </Box>
    );
}