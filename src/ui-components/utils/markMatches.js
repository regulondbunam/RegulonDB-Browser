import DataVerifier from "./DataVerifier"

export default function markMatches(text = "", search = "") {

    let markedText = text
    let score = 0
    if (DataVerifier.isValidString(search)) {
        const words = search.split(" ")
        if (DataVerifier.isValidArray(words) && DataVerifier.isValidString(text)) {
            words.forEach((word) => {
                let matches = text.matchAll(word)
                score += [...matches].length
                markedText = markedText.replaceAll(word, "<b>" + word + "</b>")
            })
        }
    }
    return { markedText, score }
}