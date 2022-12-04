/** @argument input {string} */
export function first(input) {
    const assignmentPairs = getAssignmentPairs(input)
    let count = 0

    assignmentPairs.forEach((pair) => {
        const [first, second] = pair
        const [min1, max1] = first
        const [min2, max2] = second

        const firstIncludesSecond = min2 >= min1 && max2 <= max1
        const secondIncludesFirst = min1 >= min2 && max1 <= max2

        if (firstIncludesSecond || secondIncludesFirst) {
            ++count
        }
    })

    return count
}

/** @argument input {string} */
export function second(input) {
    const assignmentPairs = getAssignmentPairs(input)
    let count = 0

    assignmentPairs.forEach((pair) => {
        const [first, second] = pair
        const [min1, max1] = first
        const [min2, max2] = second

        const firstOverlapsSecond =
            (min2 >= min1 && min2 <= max1) || (max2 <= max1 && max2 >= min1)
        const secondOverlapsFirst =
            (min1 >= min2 && min1 <= max2) || (max1 <= max2 && max1 >= min2)

        if (firstOverlapsSecond || secondOverlapsFirst) {
            ++count
        }
    })

    return count
}

/** @argument input {string} */
function getAssignmentPairs(input) {
    const lines = input.trim().split('\n')
    const pairs = lines
        .map((line) => line.split(','))
        .map((assignmentPair) => {
            /** @type Array<Array<number>> */
            let ranges = []

            assignmentPair.forEach((assignment) => {
                const [min, max] = assignment.split('-')

                ranges.push([Number.parseInt(min), Number.parseInt(max)])
            })

            return ranges
        })

    return pairs
}
