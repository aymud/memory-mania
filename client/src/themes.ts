export interface Theme {
    backgroundColor: string;
    color: string;
    menuButtonBackgroundColor?: string;
    menuButtonHoverBackgroundColor?: string;
    buttonBorderColor: string;
    navbarBackgroundColor: string;
}

export const lightTheme: Theme = {
    backgroundColor: '#eee',
    color: 'black',
    menuButtonBackgroundColor: '#007bff',
    buttonBorderColor: 'black',
    navbarBackgroundColor: 'black'
};

export const darkTheme: Theme = {
    backgroundColor: '#0b2434',
    color: '#fff',
    menuButtonBackgroundColor: '#007bff',
    menuButtonHoverBackgroundColor: '#0056b3',
    buttonBorderColor: 'white',
    navbarBackgroundColor: '#0b2434'
};
