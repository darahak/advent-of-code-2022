/** @argument input {string} */
export function first(input) {
    const compartments = getCompartments(input)
    let prioritySum = 0

    for (let i = 0; i < compartments.length; ++i) {
        const current = compartments[i]
        prioritySum += getItemPriority(getCommonItem(current))
    }

    return prioritySum
}

/** @argument input {string} */
export function second(input) {
    const compartments = getCompartments(input, 3, false)
    let prioritySum = 0

    for (let i = 0; i < compartments.length; ++i) {
        const current = compartments[i]
        prioritySum += getItemPriority(getCommonItem(current))
    }

    return prioritySum
}

/**
 * @argument input {string}
 * @argument groupBy {number}
 * @argument shouldSplit {boolean}
 */
function getCompartments(input, groupBy = 1, shouldSplit = true) {
    const lines = input.trim().split('\n')
    let compartmentGroups = []

    for (let i = 0; i < lines.length; i += groupBy) {
        let compartments = []

        for (let j = 0; j < groupBy; ++j) {
            const line = lines[i + j]
            if (shouldSplit) {
                const half = line.length / 2
                compartments.push(line.substring(0, half), line.substring(half))
            } else {
                compartments.push(line)
            }
        }

        compartmentGroups.push(compartments)
    }

    return compartmentGroups
}

/** @argument compartments {Array<string>} */
function getCommonItem(compartments) {
    const [first, ...others] = compartments

    for (let i = 0; i < first.length; ++i) {
        const item = first[i]

        for (let j = 0; j < others.length; ++j) {
            if (
                others.every((otherCompartment) =>
                    otherCompartment.includes(item)
                )
            ) {
                return item
            }
        }
    }

    return ''
}

/** @argument item {string} */
function getItemPriority(item) {
    if (item.length !== 1) {
        return 0
    }

    const refs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    return refs.indexOf(item) + 1
}
