import { getDistinctUsers, shuffleArray } from '../manipulation.ts'

describe('shuffleArray', () => {
    it('should shuffle the array randomly', () => {
        const inputArray = [1, 2, 3, 4, 5]
        const shuffledArray = shuffleArray(inputArray)

        // Check if the shuffled array is not equal to the input array in terms of order.
        expect(shuffledArray).not.toEqual(inputArray)

        // Check if the shuffled array has the same elements
        expect(shuffledArray).toHaveLength(inputArray.length)
        expect(shuffledArray.sort()).toEqual(inputArray.sort())
    })
})

describe('getDistinctUsers', () => {
    it('should return an array of distinct users', () => {
        const inputUsers = [
            { name: { first: '' }, picture: { large: '', thumbnail: '1' }, id: { value: '' } },
            { name: { first: '' }, picture: { large: '', thumbnail: '2' }, id: { value: '' } },
            { name: { first: '' }, picture: { large: '', thumbnail: '1' }, id: { value: '' } },
            { name: { first: '' }, picture: { large: '', thumbnail: '3' }, id: { value: '' } },
        ]

        const numOfRandomUsers = 3
        const distinctUsers = getDistinctUsers(inputUsers, numOfRandomUsers)

        expect(distinctUsers).toHaveLength(numOfRandomUsers)

        const uniqueThumbnailSet = new Set(distinctUsers.map(user => user.picture.thumbnail))
        expect(uniqueThumbnailSet.size).toEqual(distinctUsers.length)
    })
})