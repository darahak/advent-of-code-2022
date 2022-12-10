/** @argument input {string} */
export function first(input) {
    let stacks = getStacks(input)
    const moves = getMoves(input)

    moves.forEach(({ count, origin, target }) => {
        stacks = updateStacks(stacks, count, origin, target)
    })

    let result = ''

    stacks.forEach((value) => {
        const last = value.pop()

        if (last) {
            result += last
        }
    })

    return result
}

/** @argument input {string} */
export function second(input) {
    let stacks = getStacks(input)
    const moves = getMoves(input)

    moves.forEach(({ count, origin, target }) => {
        stacks = updateStacksV2(stacks, count, origin, target)
    })

    let result = ''

    stacks.forEach((value) => {
        const last = value.pop()

        if (last) {
            result += last
        }
    })

    return result
}

/**
 * @argument {Map<string, Array<string>>} stacks
 * @argument {number} count
 * @argument {string} origin
 * @argument {string} target
 */
function updateStacks(stacks, count, origin, target) {
    const originStack = stacks.get(origin)
    const targetStack = stacks.get(target)

    for (let i = 0; i < count; ++i) {
        const value = originStack.pop()

        targetStack.push(value)
    }

    stacks.set(origin, originStack)
    stacks.set(target, targetStack)

    return stacks
}

/**
 * @argument {Map<string, Array<string>>} stacks
 * @argument {number} count
 * @argument {string} origin
 * @argument {string} target
 */
function updateStacksV2(stacks, count, origin, target) {
    let originStack = stacks.get(origin)
    let targetStack = stacks.get(target)

    const start = Math.min(originStack.length, count) * -1
    const subStack = originStack.splice(start)

    targetStack = [...targetStack, ...subStack]

    stacks.set(origin, originStack)
    stacks.set(target, targetStack)

    return stacks
}

/** @argument input {string} */
function getStacks(input) {
    const [stackText] = input.trimEnd().split('\n\n')
    const stackLines = stackText.split('\n')
    const columnsText = stackLines.pop()

    /** @type Map<string, number> */
    let indexMap = new Map()

    for (let i = 0; i < columnsText.length; ++i) {
        const char = columnsText[i]
        if (char !== ' ') {
            indexMap.set(char, i)
        }
    }

    /** @type Map<string, Array<string>> */
    let stacks = new Map()

    columnsText.split(' ').forEach((rawValue) => {
        const value = rawValue.trim()
        if (value) {
            stacks.set(value, [])
        }
    })

    for (let i = stackLines.length - 1; i >= 0; --i) {
        const line = stackLines[i]

        indexMap.forEach((value, key) => {
            const char = line.at(value)
            if (char !== ' ') {
                let stack = stacks.get(key)
                stack.push(char)
                stacks.set(key, stack)
            }
        })
    }

    return stacks
}

/** @argument input {string} */
function getMoves(input) {
    const [, movesText] = input.trimEnd().split('\n\n')
    const movesLines = movesText.split('\n')
    const template = /move (?<count>\d+) from (?<origin>\d+) to (?<target>\d+)/

    /** @type Array<{count: number, origin: string, target: string}> */
    let moves = []

    movesLines.forEach((line) => {
        const {
            groups: { count: countText, origin, target },
        } = template.exec(line)
        moves.push({ count: Number.parseInt(countText), origin, target })
    })

    return moves
}
