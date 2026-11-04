import { Link } from "react-router-dom";

function EncodedFrom({ encodedFrom, organismId }) {
    return (
        <div>
            {encodedFrom.genes.length > 0 || encodedFrom.operon.length > 0 ? (
                <p><b>Encoded By</b></p>
            ) : (<div />)}
            <div style={{ marginLeft: "1%" }} >
                {encodedFrom.genes.length > 0 && (
                    <div>
                        <p><b>{encodedFrom.genes.length > 1 ? "Genes:" : "Gene:"}</b>{" "}
                            {encodedFrom.genes.map(gene => {
                                return (
                                    <Link key={gene.gene_id} to={`/gene/${gene._id}?organism=${encodeURIComponent(organismId)}`} style={{marginRight: "9px"}}  >
                                        <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                                    </Link>
                                )
                            })}
                        </p>
                    </div>
                )}
                {encodedFrom.operon.length > 0 && (
                    <div>
                        <p><b>{encodedFrom.operon.length > 1 ? "Operons:": "Operon:"}</b>{" "}
                        {encodedFrom.operon.map(operon => {
                                return (
                                    <Link key={operon.operon_id} to={`/operon/${operon._id}?organism=${encodeURIComponent(organismId)}`} style={{marginRight: "9px"}} >
                                        <span dangerouslySetInnerHTML={{ __html: operon.name }} />
                                    </Link>
                                )
                            })}
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default EncodedFrom;