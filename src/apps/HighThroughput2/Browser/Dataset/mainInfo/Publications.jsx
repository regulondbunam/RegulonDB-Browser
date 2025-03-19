import React from 'react'

export default function Publications({ publications }) {
    if (!publications) {
        return null
    }
    return (
        <div style={{ marginLeft: "3%" }}>
            {
                publications.map((publication, i) => {
                    if (!publication?.pmid) {
                        return null
                    }
                    return (
                        <div key={publication?.pmid} >
                            <div style={{ marginLeft: "5%" }}>
                                {
                                    publication?.title
                                        ? <a href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`} className="p_accent" style={{ fontSize: "14px" }} target="_blank" rel="noreferrer">{publication?.title}</a>
                                        : null
                                }
                                {
                                    publication?.authors
                                        ? <p>{
                                            publication?.authors.map(e => {
                                                return e
                                            }).join(", ")
                                        }</p>
                                        : null
                                }
                                {
                                    publication?.pmcid
                                        ? <p style={{ float: "left", marginRight: "5px" }}>PMID:
                                            <a href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`} className="p_accent" style={{ fontSize: "14px" }} target="_blank" rel="noreferrer">
                                                {publication?.pmid}
                                            </a>
                                        </p>
                                        : null
                                }
                                {
                                    publication?.pmcid
                                        ? <p style={{ float: "left", marginRight: "5px" }}>PMCID:
                                            <a href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmcid}/`} className="p_accent" style={{ fontSize: "14px" }} target="_blank" rel="noreferrer">
                                                {publication?.pmcid}
                                            </a>
                                        </p>

                                        : null
                                }
                                {
                                    publication?.doi
                                        ? <p style={{ float: "left", marginRight: "5px" }} >DOI:
                                            <a href={`https://doi.org/${publication?.doi}`} className="p_accent" style={{ fontSize: "14px" }} target="_blank" rel="noreferrer">
                                                {publication?.doi}
                                            </a></p>
                                        : null
                                }
                                {
                                    publication?.date
                                        ? <p>date: {publication?.date}</p>
                                        : null
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
