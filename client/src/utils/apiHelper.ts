import { IApiUser, IUser } from '../types.ts';

interface ErrorType {
    message: string;
}

export async function tryFetchData(apiUrl: string, options: NonNullable<unknown> = {}) {
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        const typedError = error as ErrorType;
        throw new Error(`Error fetching data: ${typedError.message}`);
    }
}

export function mapAPIUserData(apiResult: IApiUser): IUser {
    return {
        id: apiResult.id.value,
        firstName: apiResult.name.first,
        pictureURL: apiResult.picture.large
    };
}
