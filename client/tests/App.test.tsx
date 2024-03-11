// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App.tsx';

it('renders without crashing', () => {
    const root: HTMLElement = document.getElementById('root') ?? document.createElement('div');

    ReactDOM.createRoot(root).render(<App />);
});

// sanity check
it('one is one', () => {
    expect(1).toEqual(1);
});
