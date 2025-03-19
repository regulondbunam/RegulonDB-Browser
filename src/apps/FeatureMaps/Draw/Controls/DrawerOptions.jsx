import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Map, Features, Tracks, Annotations  } from '../../Form/DrawOptions';


export default function DrawerOptions(props) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <Divider />
            <List>
                <Map {...props} />
                <Tracks {...props} />
                <Features {...props} />
                <Annotations {...props} />
            </List>
        </Box>
    );

    return (
        <>
            <Button onClick={toggleDrawer(true)} variant="contained" size='small' endIcon={<ChevronRightIcon />} >
                Draw Options
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
