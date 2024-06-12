/**
 * Array of words to ignore during text marking.
 * @type {string[]}
 */
const ignorWords = ['or', 'and', 'OR', 'AND']


/**
 * Description placeholder
 *
 * @export
 * @param {string} keyword - The keyword to search for in the text.
 * @param {string} text - The text in which to search for the keyword.
 * @returns {string} - The text with keywords marked.
 */
export default function Mark(keyword, text) {
    try {

        /**
         * Description placeholder
         *
         * @type {string}
         */
        const srchArray = keyword.split(' ')
        return SearchArray(srchArray, text)
    } catch (error) {
        console.log(error)
        return text
    }

}

/**
* Calculates a score for the presence of keywords in the text.
* @exports
* @param {string} keyword - The keyword to search for in the text.
* @param {string} text - The text in which to search for the keyword.
* @returns {number} - The keyword score as a percentage of the text length.
*/
export function MarckScore(keyword, text) {
    try {

        /**
         * Description placeholder
         *
         * @type {number}
         */
        const scoreText = text.length

        /**
         * Description placeholder
         *
         * @type {string}
         */
        const srchArray = keyword.split(' ')

        /**
         * Description placeholder
         *
         * @type {*}
         */
        const af = SearchArray(srchArray, text, true)


        /**
         * Description placeholder
         *
         * @type {number}
         */
        let scoreKeyword = 0
        af.map((n) => {
            if (n > 0) {
                scoreKeyword = + n
            }
            return null
        })
        //console.log(scoreKeyword)
        return scoreKeyword * 100 / scoreText

    } catch (error) {
        console.warn(error)
        return -1
    }
}
/**
 * Searches for keywords in the text and marks them.
 * @param {string[]} srchArray - An array of keywords to search for.
 * @param {string} text - The text in which to search for the keywords.
 * @param {boolean} isScore - Indicates whether to return a score or marked text.
 * @returns {string|number[]} - If `isScore` is true, returns an array of scores; otherwise, returns marked text.
 */
function SearchArray(srchArray, text, isScore = false) {
     /**
      * Maps each word in srchArray to its corresponding position in the text and marks the keywords in the text.
      *
      * @param {string} word - The current word being processed from srchArray.
      * @returns {number} - The position of the keyword in the text, or 0 if the word should be ignored.
      */
    const af = srchArray.map((word) => {
        if (ignorWords.find(e => e === word)) {
            return 0
        }

        /**
         * Description placeholder
         *
         * @type {string}
         */
        const index = text.toLowerCase().indexOf(word.toLowerCase())

        /**
         * Description placeholder
         *
         * @type {string}
         */
        const end = word.length + index
        if (index < 0) {
            return 0
        }
        text = text.slice(0, end) + '</b>' + text.slice(end, text.length)
        text = text.slice(0, index) + '<b>' + text.slice(index, text.length)
        return end - index
    })
    if (isScore) {
        return af
    }
    return text
}
/*
aaeR gene; synonyms: yhcS,qseA; products: LysR-type transcriptional regulator AaeR,

*/