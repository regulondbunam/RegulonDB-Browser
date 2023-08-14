import "./regulator.css"
import { DataVerifier } from "../../../../components/ui-components";
import { CitationsNote } from "../../../../components/citations/citations_note";
import { ParagraphCitations } from "../../../../components/citations";
import Conformations from "./conformations";
import EncodedFrom from "./encode";
import Products from "./products";
import { useState } from "react";
export default function Regulator({ regulator, allCitations }) {
    //console.log(regulator);
    const {
        citations,
        confidenceLevel,
        conformations,
        encodedFrom,
        // name,
        note,
        products,
        siteLength,
        symmetry,
        synonyms,
        type,
    } = regulator
    //console.log(synonyms);
    //console.log(DataVerifier.isValidArray(synonyms));
    let _confidenceLevel = ""
    if (DataVerifier.isValidString(confidenceLevel)) {
        switch (confidenceLevel) {
            case "S":
                _confidenceLevel = <span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>
                break;
            case "C":
                _confidenceLevel = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
                break;
            case "W":
                _confidenceLevel = <span style={{ color: "#0C6A87" }} >Weak</span>
                break;
            default:
                _confidenceLevel = <span>.</span>
                break;
        }
    }
    return (
        <div style={{ marginLeft: "2%", marginRight: "3%" }} >
            <div>
                {DataVerifier.isValidArray(synonyms) && (
                    <p><b>Synonyms: </b>{synonyms.map(s => (s)).join(", ")}</p>
                )}
                {DataVerifier.isValidArray(siteLength) && (
                    <p><b>Site Length; </b>{siteLength.map(s => (s)).join(", ")}</p>
                )}
                {DataVerifier.isValidArray(symmetry) && (
                    <p><b>Symmetry: </b>{symmetry.map(s => (s)).join(", ")}</p>
                )}
                {DataVerifier.isValidString(type) && (
                    <p><b>Type: </b>{type}</p>
                )}
                {DataVerifier.isValidString(confidenceLevel) && (
                    <p><b>Confidence Level:</b>{" "}{_confidenceLevel}</p>
                )}
                {encodedFrom && (
                    <EncodedFrom encodedFrom={encodedFrom} />
                )}
                {DataVerifier.isValidArray(products) && (
                    <Products products={products} />
                )}
            </div>

            {DataVerifier.isValidString(note) && (
                <>
                    <p><b>Note:</b></p>
                    <div style={{ marginLeft: "1%" }}>
                        <CNote citationsNote={CitationsNote(allCitations, note)} />
                    </div>
                </>
            )}
            {DataVerifier.isValidArray(conformations) && (
                <Conformations conformations={conformations} allCitations={allCitations} />
            )}
            {DataVerifier.isValidArray(citations) && (
                <>
                    <p><b>Citations</b></p>
                    <ParagraphCitations allCitations={allCitations} citations={citations} />
                </>
            )}
            <br />
        </div>
    )
}


function CNote({ citationsNote = "" }) {
    const characters = 1500
    const [open, setOpen] = useState(false);
    if (citationsNote.length > characters) {
        return (
            <>
                <p dangerouslySetInnerHTML={{ __html: `${open ? citationsNote : citationsNote.slice(0, characters)+"..."}` }} />
                {!open ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            position: "relative",
                            height: "40px",
                            top: "-35px",
                            background: "linear-gradient(0deg, #CADBE7 0%, rgba(255,255,255,0) 100%)",
                            alignItems: "flex-end",
                            cursor: "pointer"
                        }}
                        onClick={()=>{setOpen(!open)}}
                    >
                        <p ><b>Show more...</b></p>
                    </div>
                )
            :(
                <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            position: "relative",
                            height: "20px",
                            background: "linear-gradient(0deg, #CADBE7 0%, rgba(255,255,255,0) 100%)",
                            alignItems: "flex-end",
                            cursor: "pointer"
                        }}
                        onClick={()=>{setOpen(!open)}}
                    >
                        <p ><b>Show less</b></p>
                    </div>
            )}
            </>
        )
    }
    return (
        <p dangerouslySetInnerHTML={{ __html: citationsNote }} />
    )
}