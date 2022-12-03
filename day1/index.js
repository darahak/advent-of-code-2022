/** @argument input {string} */
export function first(input) {
    const totalCaloriesPerElf = getCaloriesPerElf(input)

    return Math.max(...totalCaloriesPerElf)
}

/** @argument input {string} */
export function second(input) {
    const totalCaloriesPerElf = getCaloriesPerElf(input)
    const top3 = totalCaloriesPerElf.sort((a, b) => b - a).slice(0, 3)
    
    return top3.reduce((previous, current) => previous + current, 0)
}

function getCaloriesPerElf(input) {
    const lineGroups = input.trim().split('\n\n')
    const batches = lineGroups.map((group) => group.split('\n'))

    let sums = []

    batches.forEach((batch) => {
        let sum = 0
        batch.forEach((input) => {
            const value = Number.parseInt(input)
            sum += value
        })
        sums.push(sum)
    })

    return sums
}