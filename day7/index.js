/** @argument input {string} */
export function first(input) {
    const fs = getFilesystem(input)

    /** @type Map<string, number> */
    let totalSizes = new Map()

    Array.from(fs.keys()).forEach((dirPath) => {
        let sum = 0

        fs.forEach((value, key) => {
            const { size } = value

            if (key.includes(dirPath)) {
                sum += size
            }
        })

        totalSizes.set(dirPath, sum)
    })

    return Array.from(totalSizes.values())
        .filter((value) => value <= 100000)
        .reduce((previous, current) => current + previous, 0)
}

/** @argument input {string} */
export function second(input) {
    const totalDiskSpace = 70_000_000
    const minDiskSpace = 30_000_000
    const fs = getFilesystem(input)

    /** @type Map<string, number> */
    let totalSizes = new Map()

    Array.from(fs.keys()).forEach((dirPath) => {
        let sum = 0

        fs.forEach((value, key) => {
            const { size } = value

            if (key.includes(dirPath)) {
                sum += size
            }
        })

        totalSizes.set(dirPath, sum)
    })

    const outermostSize = totalSizes.get('/')
    const removalTarget = minDiskSpace - (totalDiskSpace - outermostSize)

    const candidatesForRemoval = Array.from(totalSizes.values()).filter(
        (value) => value >= removalTarget
    )

    return Math.min(...candidatesForRemoval)
}

/** @argument input {string} */
function getFilesystem(input) {
    const lines = input.trim().split('\n')
    const commands = getCommands(lines)

    /** @type Map<string, {name: string, path: Array<string>, size: number}> */
    let directories = new Map()
    /** @type Array<string> */
    let currentPath = []

    commands.forEach(({ name, args, output }) => {
        switch (name) {
            case 'cd':
                {
                    if (args === '..') {
                        currentPath.pop()
                    } else {
                        currentPath.push(args)
                    }
                }
                break
            case 'ls':
                {
                    const dirName = currentPath.at(-1)
                    let size = 0

                    output.forEach((line) => {
                        const [firstDetail] = line.split(' ')

                        if (firstDetail !== 'dir') {
                            const value = Number.parseInt(firstDetail)
                            size += value
                        }
                    })

                    const key = currentPath.join('/')
                    directories.set(key, {
                        name: dirName,
                        path: [...currentPath],
                        size,
                    })
                }
                break
        }
    })

    return directories
}

/** @argument lines {Array<string>} */
function getCommands(lines) {
    /** @type Array<{name: string, args?: string, output?: Array<string>}> */
    let commands = []
    const template = /\$ (?<commandName>\w+)(?<commandArgs>\s.*)?/

    for (let i = 0; i < lines.length /* increment depending on output */; ) {
        const line = lines[i]
        const match = template.exec(line)

        if (match && match.groups) {
            const { commandName, commandArgs } = match.groups

            switch (commandName) {
                case 'cd':
                    {
                        commands.push({
                            name: commandName,
                            args: commandArgs.trim(),
                        })

                        ++i
                    }
                    break
                case 'ls':
                    {
                        let j = 1
                        while (
                            lines[i + j] != null &&
                            !lines[i + j].startsWith('$')
                        ) {
                            ++j
                        }

                        commands.push({
                            name: commandName,
                            output: lines.slice(i + 1, i + j),
                        })

                        i += j
                    }
                    break
            }
        } else {
            ++i
        }
    }

    return commands
}
