import {Button, Dialog, DialogTitle, LinearProgress} from "@mui/material";

export function Test(){

    return <div>
        <Button>Test</Button>

    </div>
}

export default function LoadingDialog({title= "Loading... please wait"}) {
    return <div>
        <Dialog open={true}>
            <DialogTitle>{title}</DialogTitle>
            <LinearProgress />
        </Dialog>
    </div>;
}