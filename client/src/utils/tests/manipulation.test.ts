import { getDistinctUsers, shuffleArray } from '../manipulation.ts';
import { IUser } from '../../types.ts';

describe('shuffleArray', () => {
    it('should shuffle the array randomly', () => {
        const inputArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffleArray(inputArray);

        // Check if the shuffled array is not equal to the input array in terms of order.
        expect(shuffledArray).not.toEqual(inputArray);

        // Check if the shuffled array has the same elements
        expect(shuffledArray).toHaveLength(inputArray.length);
        expect(shuffledArray.sort()).toEqual(inputArray.sort());
    });
});

describe('getDistinctUsers', () => {
    it('should return an array of distinct users', () => {
        const inputUsers: IUser[] = [
            {
                firstName: '',
                pictureURL: '1',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '2',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '1',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '3',
                id: ''
            }
        ];

        const numOfRandomUsers = 3;
        const distinctUsers = getDistinctUsers(inputUsers, numOfRandomUsers);

        expect(distinctUsers).toHaveLength(numOfRandomUsers);

        const uniqueThumbnailSet = new Set(distinctUsers.map(user => user.pictureURL));
        expect(uniqueThumbnailSet.size).toEqual(distinctUsers.length);
    });

    it('should return a smaller array than requested of distinct users', () => {
        const inputUsers: IUser[] = [
            {
                firstName: '',
                pictureURL: '1',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '2',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '1',
                id: ''
            },
            {
                firstName: '',
                pictureURL: '2',
                id: ''
            }
        ];

        const numOfRandomUsers = 3;
        const distinctUsers = getDistinctUsers(inputUsers, numOfRandomUsers);

        expect(distinctUsers).toHaveLength(2);

        const uniqueThumbnailSet = new Set(distinctUsers.map(user => user.pictureURL));
        expect(uniqueThumbnailSet.size).toEqual(distinctUsers.length);
    });
});
