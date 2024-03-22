import { CSSProperties } from 'react';

export interface IUser {
    firstName: string;
    lastName?: string;
    pictureURL: string;
    id: string;
}

export interface IUserCard {
    id: string;
    user: IUser;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    isLevelOver: boolean;
    isLearning: boolean;
    withOpacity: boolean;
    isDragging: boolean;
    cardTransformStyle?: CSSProperties;
}

export interface IApiUser {
    name: {
        first: string;
    };
    picture: {
        large: string;
    };
    id: {
        value: string;
    };
}
