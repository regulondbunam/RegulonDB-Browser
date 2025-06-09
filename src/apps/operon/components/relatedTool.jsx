import React from 'react';
import { DataVerifier } from "../../../components/ui-components"
//import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Navigation from './navigation';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function RelatedTool({ relatedIds, operonData }) {

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    return (
        <div className="noPrint" >
            <Navigation idValue={relatedIds.idValue} />
            {DataVerifier.isValidArray(relatedIds.genes) && (
                //<Tool title={"Related Tools"}>
                <Tool title={"Tools"}>
                    <List>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            navigate(`/dtt/leftEndPosition=${operonData.operon.regulationPositions.leftEndPosition - 1000}&rightEndPosition=${operonData.operon.regulationPositions.rightEndPosition + 1000}`)
                        }} >
                            <p>Drawing Traces Tool</p>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            navigate(`/coexpression/${relatedIds.genes.map(g=>("geneId="+g)).join("&")}`)
                        }} >
                            <p>Gene Coexpression</p>
                        </ListItemButton>
                    </List>
                    
                </Tool>
            )}
            <Tool title={"Download Options"} >
                <ListItemButton sx={{ pl: 4 }} onClick={pdfDownloader} >
                    <ListItemIcon>
                        <PictureAsPdfIcon />
                    </ListItemIcon>
                    <p>PDF document</p>
                </ListItemButton>
            </Tool>
            <Tool title={"FeedBack"} >
                <ListItemButton sx={{ pl: 4 }} onClick={() => {
                    setOpen(!open)
                }} >
                    <p>User Feedback</p>
                </ListItemButton>
            </Tool>

            <Divider />
            <Modal
                open={open}
                onClose={() => { setOpen(!open) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "row-reverse" }} ><button onClick={() => { setOpen(!open) }} className="accent" >Close</button></div>
                    <div class="asana-embed-container"><link rel="stylesheet" href="https://form.asana.com/static/asana-form-embed-style.css" /><iframe title="feedbackForm" className="asana-embed-iframe" src="https://form.asana.com/?k=uzd6ZoyuRLFIKgmaAw1uKQ&d=1108899165642340&embed=true"></iframe><div class="asana-embed-footer"><a rel="nofollow noopener  noreferrer" target="_blank" class="asana-embed-footer-link" href="https://asana.com/es?utm_source=embedded_form"><span class="asana-embed-footer-text Typography Typography--s">Formulario desarrollado por</span><div class="asana-embed-footer-logo" role="img" aria-label="Logo de Asana"></div></a></div></div>
                </Box>
            </Modal>
        </div>
    )
}

function Tool({ title, children }) {
    const [open, setOpen] = React.useState(false);
    return (
        <List dense >
            <ListItemButton onClick={() => { setOpen(!open) }}>
                <ListItemText primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </List>
    )
}

function pdfDownloader() {
    window.print()
}
