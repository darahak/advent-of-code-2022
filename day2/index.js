/** @argument input {string} */
export function first(input) {
    const games = getGames(input)

    let totalScore = 0

    games.forEach((game) => {
        const [elf, me] = game
        const score = getScoreV1(elf, me)

        totalScore += score
    })

    return totalScore
}

/** @argument input {string} */
export function second(input) {
    const games = getGames(input)

    let totalScore = 0

    games.forEach((game) => {
        const [elf, me] = game
        const score = getScoreV2(elf, me)

        totalScore += score
    })

    return totalScore
}

/** @argument input {string} */
function getGames(input) {
    const lines = input.trim().split('\n')
    return lines.map((line) => line.split(' '))
}

/**
 * @argument elf {string}
 * @argument me {string}
 */
function getScoreV1(elf, me) {
    const scores = [0, 3, 6]

    const opponent = {
        rock: 'A',
        paper: 'B',
        scissors: 'C',
    }

    // Outcome order: lose, draw, win
    const self = {
        rock: {
            value: 'X',
            outcomes: [opponent.paper, opponent.rock, opponent.scissors],
        },
        paper: {
            value: 'Y',
            outcomes: [opponent.scissors, opponent.paper, opponent.rock],
        },
        scissors: {
            value: 'Z',
            outcomes: [opponent.rock, opponent.scissors, opponent.paper],
        },
    }

    switch (me) {
        case self.rock.value:
            return scores[self.rock.outcomes.indexOf(elf)] + 1
        case self.paper.value:
            return scores[self.paper.outcomes.indexOf(elf)] + 2
        case self.scissors.value:
            return scores[self.scissors.outcomes.indexOf(elf)] + 3
    }

    return 0
}

/**
 * @argument elf {string}
 * @argument me {string}
 */
function getScoreV2(elf, me) {
    const scores = [0, 3, 6]
    const r = 1,
        p = 2,
        s = 3

    // Outcome order: lose, draw, win
    const opponent = {
        rock: {
            value: 'A',
            outcomes: [s, r, p],
        },
        paper: {
            value: 'B',
            outcomes: [r, p, s],
        },
        scissors: {
            value: 'C',
            outcomes: [p, s, r],
        },
    }

    const self = ['X', 'Y', 'Z']
    const index = self.indexOf(me)

    switch (elf) {
        case opponent.rock.value:
            return scores[index] + opponent.rock.outcomes[index]
        case opponent.paper.value:
            return scores[index] + opponent.paper.outcomes[index]
        case opponent.scissors.value:
            return scores[index] + opponent.scissors.outcomes[index]
    }

    return 0
}
