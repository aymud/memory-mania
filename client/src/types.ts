import { CSSProperties } from 'react';

export interface User {
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

export interface IUserCard {
    id: string;
    user: User;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    isLevelOver: boolean;
    isLearning: boolean;
    withOpacity: boolean;
    isDragging: boolean;
    cardTransformStyle?: CSSProperties;
}
