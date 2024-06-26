import React from 'react'
import { Typography, Menu, Box, ButtonGroup, Button } from '@mui/material'
import { NavigateBefore, AutoStories, NavigateNext } from '@mui/icons-material';
import { DataVerifier } from 'ui-components/utils';

export default function Label({ label, content, phrases }) {
    const [panel, setPanel] = React.useState(null);
    const isPhrases = DataVerifier.isValidArray(phrases)

    const handlePanel = (event) => {
        event.preventDefault();
        if (isPhrases) {
            setPanel(
                panel === null
                    ? {
                        mouseX: event.clientX + 2,
                        mouseY: event.clientY - 6,
                    }
                    : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                    // Other native context menus might behave different.
                    // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                    null,
            );
        }

    };

    const handleClose = () => {
        setPanel(null);
    };

    return (
        <div>
            <Typography variant="relevantB" sx={{ mr: 1 }} >
                {label}
                {isPhrases && (
                    <sup onClick={handlePanel} >
                        <AutoStories fontSize='14px' sx={{ ":hover": { cursor: "pointer" } }} />
                    </sup>
                )}
            </Typography>
            <Typography variant="relevant" ><span dangerouslySetInnerHTML={{ __html: content }} /></Typography>
            {isPhrases && (
                <Menu
                    open={panel !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        panel !== null
                            ? { top: panel.mouseY, left: panel.mouseX }
                            : undefined
                    }
                    sx={{
                        ".MuiMenu-list": {
                            paddingTop: 0
                        }
                    }}
                >
                    <Box>
                        <PhrasePanel phrases={phrases} />
                    </Box>
                </Menu>
            )}
        </div>
    )
}


function PhrasePanel({ phrases = [] }) {
    const [inx, setInx] = React.useState(0);
    const phrase = phrases[inx];
    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#d5e2ea",

                }}
            >
                <div style={{ paddingLeft: "5px" }}>
                    <Typography variant='irrelevantB' >
                        {phrases.length < 2 ? "Phrase:" : "Phrases:"}
                    </Typography>
                </div>
                <div>
                    {phrases.length < 2 ? (
                        <></>
                    ) : (
                        <ButtonGroup
                            size="small"
                            color="secondary"
                            sx={{
                                height: 20,
                            }}
                        >
                            <Button
                                onClick={() => {
                                    if (inx > 0) {
                                        setInx(inx - 1);
                                    }
                                }}
                            >
                                <NavigateBefore />
                            </Button>
                            <Button
                                onClick={() => {
                                    if (inx < phrases.length-1) {
                                        setInx(inx + 1);
                                    }
                                }}
                            >
                                <NavigateNext />
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </div>
            <div style={{ width: "350px", height: "120px", overflow: "auto", }} >
                <Typography variant='phrase'>
                    <span dangerouslySetInnerHTML={{ __html: phrase.phrase }} />
                </Typography>
            </div>
            <div>
                <a
                    href={"https://pubmed.ncbi.nlm.nih.gov/" + phrase.pmid}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    go to article
                </a>
            </div>
        </div>
    );
}
