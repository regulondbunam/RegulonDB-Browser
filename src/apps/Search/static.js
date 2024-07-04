export const ACTION = {
    SEARCH: 0,
    UPDATE_RESULTS: 1
}

export const sections = {
    genes: {
        id: "gene_results",
        label: "Gene"
    },
    operons: {
        id: "operon_results",
        label: "Operon"
    },
    regulons: {
        id: "regulon_results",
        label: "Regulon"
    },
    sigmulon: {
        id: "sigmulon_results",
        label: "Sigmulon"
    },
    gu: {
        id: "gensorUnit_results",
        label: "GENSOR unit"
    }
}

export function countResults(count = {}) {
    let _count = 0
    Object.keys(count).forEach(result => {
        _count += count[result]
    });
    return _count
}