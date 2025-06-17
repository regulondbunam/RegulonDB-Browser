import React, {useState} from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PhrasePanel({ phrases = [] }) {
    const [inx, setInx] = useState(0);
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
                <div>
                    <p>
                        <b>{phrases.length < 2 ? "Phrase" : "Phrases"}</b>
                    </p>
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
                                <NavigateBeforeIcon />
                            </Button>
                            <Button
                                onClick={() => {
                                    if (inx < phrases.length-1) {
                                        setInx(inx + 1);
                                    }
                                }}
                            >
                                <NavigateNextIcon />
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </div>
            <div>
                <p
                    style={{
                        fontFamily: "Times New Roman, Times, serif",
                        fontStyle: "italic",
                    }}
                    dangerouslySetInnerHTML={{ __html: phrase.phrase }}
                />
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