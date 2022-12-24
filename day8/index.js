/** @argument input {string} */
export function first(input) {
    const trees = getTrees(input)
    const { rowLength, rowCount } = trees

    let visibleCount = rowLength * 2 + rowCount * 2 - 4

    for (let y = 1; y < rowCount - 1; ++y) {
        for (let x = 1; x < rowLength - 1; ++x) {
            const visible = isVisible(trees, x, y)
            if (visible) {
                ++visibleCount
            }
        }
    }

    return visibleCount
}

/** @argument input {string} */
export function second(input) {
    const trees = getTrees(input)
    const { rowLength, rowCount } = trees

    let scores = []

    for (let y = 1; y < rowCount - 1; ++y) {
        for (let x = 1; x < rowLength - 1; ++x) {
            const score = getScenicScore(trees, x, y)
            scores.push(score)
        }
    }

    return Math.max(...scores)
}

/** @param {string} input */
function getTrees(input) {
    const lines = input.trim().split('\n')

    /** @type Array<number> */
    let trees = []

    lines.forEach((line) => {
        const values = line.split('')
        values.forEach((value) => {
            trees.push(Number.parseInt(value))
        })
    })

    return {
        list: trees,
        rowLength: lines[0].length,
        rowCount: lines.length,
    }
}

/**
 * @typedef {object} TreeList
 * @property {Array<number>} list
 * @property {number} rowLength
 * @property {number} rowCount
 */

/**
 * @param {TreeList} trees
 * @param {number} x
 * @param {number} y
 */
function getTree(trees, x, y) {
    const { list, rowLength } = trees
    return list[y * rowLength + x]
}

/**
 * @param {TreeList} trees
 * @param {number} x
 * @param {number} y
 */
function isVisible(trees, x, y) {
    const { rowLength, rowCount } = trees
    const currentHeight = getTree(trees, x, y)

    // Left
    let visibleFromLeftSide = true
    for (let i = x - 1; i >= 0; --i) {
        const otherHeight = getTree(trees, i, y)
        if (otherHeight >= currentHeight) {
            visibleFromLeftSide = false
            break
        }
    }

    // Right
    let visibleFromRightSide = true
    for (let i = x + 1; i < rowLength; ++i) {
        const otherHeight = getTree(trees, i, y)
        if (otherHeight >= currentHeight) {
            visibleFromRightSide = false
            break
        }
    }

    // Top
    let visibleFromTopSide = true
    for (let j = y - 1; j >= 0; --j) {
        const otherHeight = getTree(trees, x, j)
        if (otherHeight >= currentHeight) {
            visibleFromTopSide = false
            break
        }
    }

    // Bottom
    let visibleFromBottomSide = true
    for (let j = y + 1; j < rowCount; ++j) {
        const otherHeight = getTree(trees, x, j)
        if (otherHeight >= currentHeight) {
            visibleFromBottomSide = false
            break
        }
    }

    return (
        visibleFromLeftSide ||
        visibleFromRightSide ||
        visibleFromTopSide ||
        visibleFromBottomSide
    )
}

/**
 * @param {TreeList} trees
 * @param {number} x
 * @param {number} y
 */
function getScenicScore(trees, x, y) {
    const { rowLength, rowCount } = trees
    const currentHeight = getTree(trees, x, y)

    // Left
    let leftCount = 0
    for (let i = x - 1; i >= 0; --i) {
        ++leftCount
        const otherHeight = getTree(trees, i, y)
        if (otherHeight >= currentHeight) {
            break
        }
    }

    // Right
    let rightCount = 0
    for (let i = x + 1; i < rowLength; ++i) {
        ++rightCount
        const otherHeight = getTree(trees, i, y)
        if (otherHeight >= currentHeight) {
            break
        }
    }

    // Top
    let topCount = 0
    for (let j = y - 1; j >= 0; --j) {
        ++topCount
        const otherHeight = getTree(trees, x, j)
        if (otherHeight >= currentHeight) {
            break
        }
    }

    // Bottom
    let bottomCount = 0
    for (let j = y + 1; j < rowCount; ++j) {
        ++bottomCount
        const otherHeight = getTree(trees, x, j)
        if (otherHeight >= currentHeight) {
            break
        }
    }

    return leftCount * rightCount * topCount * bottomCount
}
