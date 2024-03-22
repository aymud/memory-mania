import React from 'react';

import { mapAPIUserData, tryFetchData } from '../utils/apiHelper.ts';
import { getDistinctUsers } from '../utils/manipulation.ts';
import { IApiUser, IUser } from '../types.ts';

const RANDOM_USER_GENERATOR_API_URL = 'https://randomuser.me/api/';

export const useRandomUsers = (
    numOfRandomUsers: number,
    isLearningPhase: boolean,
    startLearningPhaseTimer: () => void
) => {
    const [randomUsers, setRandomUsers] = React.useState<IUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!isLearningPhase) return;

        // Note: The api can sometimes return duplicate images in a set.
        // To only show unique users, we get more users than needed.
        // then we remove any duplicates and return the correct amount of unique users needed.
        const fields = 'id,name,gender,nat,picture';
        const format = 'JSON';
        const nationality = 'CA,US,AU';
        const apiParams = `?inc=${fields}&format=${format}&nat=${nationality}&results=${numOfRandomUsers * 2}`;
        tryFetchData(RANDOM_USER_GENERATOR_API_URL + apiParams).then(data => {
            const results = data.results.map((user: IApiUser) => mapAPIUserData(user));
            setRandomUsers(getDistinctUsers(results, numOfRandomUsers));
            startLearningPhaseTimer();
            setIsLoading(false);
        });
    }, [isLearningPhase, numOfRandomUsers, startLearningPhaseTimer]);

    return { randomUsers, setRandomUsers, isLoading, setIsLoading };
};
