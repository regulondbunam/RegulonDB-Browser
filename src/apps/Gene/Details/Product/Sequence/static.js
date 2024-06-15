export const OPTION = {
    reset: 0,
    color: 1,
    fontSize: 2,
    viewMotifs: 3,
    highlightMotif: 4,
    unHighlighMotif: 5,
}

export const handleHighlightMotif = (id, color) => {
    const spanMotif = document.getElementById("motif_" + id)
    if (spanMotif) {
        spanMotif.style.backgroundColor = color
    }
}

export const unHandleHighlightMotif = (id) => {
    const spanMotif = document.getElementById("motif_" + id)
    if (spanMotif) {
        spanMotif.style.backgroundColor = 'inherit'
    }
}