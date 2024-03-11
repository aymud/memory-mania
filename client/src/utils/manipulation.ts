// Shuffle an array randomly using the Fisher-Yates shuffle algorithm.
/* eslint-disable @typescript-eslint/no-explicit-any */
export function shuffleArray(array: any[]) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
    }
    return shuffled
}

interface UserType {
    name: {
        first: string
    }
    picture: {
        large: string
        thumbnail: string
    }
    id: {
        value: string
    }
}

export function getDistinctUsers(data: UserType[], numOfRandomUsers: number) {
    // Distinct user := unique user picture.

    const userPictures = new Set()
    const distinctUsers: UserType[] = []

    for (const user of data) {
        const picture = user.picture.thumbnail

        // Only add a user to the list if there isn't already a user with that picture.
        if (userPictures.has(picture)) {
            continue
        }
        distinctUsers.push(user)
        userPictures.add(picture)

        if (distinctUsers.length === numOfRandomUsers) {
            break
        }
    }
    return distinctUsers
}