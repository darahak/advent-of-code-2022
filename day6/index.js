/** @argument input {string} */
export function first(input) {
    return getMarkerIndex(input.trim())
}

/** @argument input {string} */
export function second(input) {
    return getMarkerIndex(input.trim(), 14)
}

/**
 * @argument {string} input
 * @argument {number} [bufferLength]
 */
function getMarkerIndex(input, bufferLength = 4) {
    for (let i = 0; i < input.length; ++i) {
        const end = i + bufferLength
        const data = input.substring(i, end)
        const letters = data.split('')
        const filteredLetters = [...new Set(letters)]

        if (filteredLetters.length === letters.length) {
            return end
        }
    }

    return -1
}
