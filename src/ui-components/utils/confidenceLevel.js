export function confidenceLevelLabel(confidenceLevel){
    const labels = {
        S:`<span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>`,
        C:`<span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>`,
        W:`<span style={{ color: "#0C6A87" }} >Weak</span>`
    }
    return labels[confidenceLevel] ? labels[confidenceLevel] : confidenceLevel
}