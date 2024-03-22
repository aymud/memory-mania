import { mapAPIUserData, tryFetchData } from '../apiHelper.ts';
import { IApiUser, IUser } from '../../types.ts';

describe('tryFetchData', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches data successfully', async () => {
        const mockData = { message: 'Mock data' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData)
        });

        const data = await tryFetchData('https://example.com/api');
        expect(data).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {});
    });

    it('throws an error when response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        await expect(tryFetchData('https://example.com/api')).rejects.toThrow('HTTP error! Status: 404');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {});
    });

    it('throws an error when fetch fails', async () => {
        const errorMessage = 'Network error';
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await expect(tryFetchData('https://example.com/api')).rejects.toThrow(`Error fetching data: ${errorMessage}`);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {});
    });
});

describe('mapAPIUserData', () => {
    it('maps API user data correctly to IUser', () => {
        const mockApiUser: IApiUser = {
            id: { value: '12345' },
            name: { first: 'John' },
            picture: { large: 'https://example.com/picture.jpg' }
        };
        const expectedUser: IUser = {
            id: '12345',
            firstName: 'John',
            pictureURL: 'https://example.com/picture.jpg'
        };

        const mappedUser = mapAPIUserData(mockApiUser);
        expect(mappedUser).toEqual(expectedUser);
    });
});
