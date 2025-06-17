import { Link } from "react-router-dom"
import {DataVerifier } from "../../../ui-components"
import { ParagraphCitations, NoteCitations } from "../../citations";
import { Divider } from "@mui/material";
import IsPropertyPhrases from "../../phrases";

export default function Genes({
    allCitations,
    firstGene,
    genes = [],
    tuId,
    confidenceLevel,
    strand,
    note,
    citations,
    propertiesPhrase
}) {

    //let orderGenes = genes.reverse()
    //console.log(genes);
/*
ordenados desde el primer gene
    genes.sort((a,b)=>{
        return a.leftEndPosition - b.rightEndPosition
    })
*/
let _confidenceLevel
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
        <div>
            <div style={{ marginLeft: "5px" }}>
            <p><IsPropertyPhrases property="strand" propertiesPhrase={propertiesPhrase} />{" "+strand}</p>
                <div onMouseEnter={()=>{
                    let drawGene = document.getElementById("draw_"+tuId+"_"+firstGene._id)
                    if(drawGene){
                        drawGene.style.border = "1px solid #5095ff;"
                        console.log(drawGene);
                    }
                }} >
                    {DataVerifier.isValidArray(genes) && (
                    <p><b>Genes:</b>{" "}
                        {genes.map(gene => <Link key={"link_gene_tu_" + gene._id} style={{ marginRight: "5px" }} to={"/gene/" + gene._id} ><b>{gene.name}</b></Link>)}
                    </p>
                )}
                </div>
                {/*{DataVerifier.isValidNumber(firstGene.distanceToPromoter) && (
                    <p><b>Distance from TSS to first gene:</b>{" " + firstGene.distanceToPromoter + " bp"}</p>
                )}*/}
                {DataVerifier.isValidString(confidenceLevel) && (
                        <p><b>Confidence Level:</b>{" "}{_confidenceLevel}</p>
                    )}
                {DataVerifier.isValidString(note) && (
                    <div>
                        <p><IsPropertyPhrases property="note" propertiesPhrase={propertiesPhrase} /></p>
                        <p dangerouslySetInnerHTML={{ __html: NoteCitations(allCitations, note) }} />
                    </div>
                )}
                {DataVerifier.isValidArray(citations) && (
                    <p><b>References and Evidence:</b><br /><ParagraphCitations citations={citations} allCitations={allCitations} /></p>
                )}
                <br />
                <Divider />
                
                
            </div>

        </div>
    )
}