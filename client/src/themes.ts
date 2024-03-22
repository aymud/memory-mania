export interface ITheme {
    cardTextColor: string;
    backgroundColor: string;
    color: string;
    menuButtonBackgroundColor?: string;
    menuButtonHoverBackgroundColor?: string;
    buttonBorderColor: string;
    navbarBackgroundColor: string;
    navbarTextColor: string;
    menuList: string;
    menuItem: string;
    menuItemHover: string;
}

export const lightTheme: ITheme = {
    cardTextColor: 'black',
    backgroundColor: '#eee',
    color: 'black',
    menuButtonBackgroundColor: '#007bff',
    buttonBorderColor: 'black',
    navbarBackgroundColor: '#edf2f8',
    navbarTextColor: 'black',
    menuList: 'white',
    menuItem: 'black',
    menuItemHover: '#edf2f8'
};

export const darkTheme: ITheme = {
    cardTextColor: 'black',
    backgroundColor: '#1a202c',
    color: '#fff',
    menuButtonBackgroundColor: '#007bff',
    menuButtonHoverBackgroundColor: '#0056b3',
    buttonBorderColor: 'white',
    navbarBackgroundColor: '#171923',
    navbarTextColor: 'white',
    menuList: '#2d3748',
    menuItem: 'white',
    menuItemHover: '#404454'
};
