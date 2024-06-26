export function confidenceLevelLabel(confidenceLevel){
    const labels = {
        S:`<span style="font-weight: bold; color: #0C6A87" >Strong</span>`,
        C:`<span style="font-weight: bold; color: #000000" >Confirmed</span>`,
        W:`<span style="color: #0C6A87" >Weak</span>`
    }
    return labels[confidenceLevel] ? labels[confidenceLevel] : confidenceLevel
}