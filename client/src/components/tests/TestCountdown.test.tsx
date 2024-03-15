// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import TestCountdown from '../TestCountdown.tsx';

jest.mock('../../utils/apiHelper.ts', () => ({
    tryFetchData: jest.fn().mockResolvedValue([{ fact: 'Mock fact' }])
}));

describe('TestCountdown Component', () => {
    const handleTestCountdownMock = jest.fn();
    const durationSeconds = 2;

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('renders the countdown timer and fun fact', async () => {
        render(<TestCountdown handleTestCountdown={handleTestCountdownMock} duration_seconds={durationSeconds} />);

        expect(screen.getByText('Recall begins in')).toBeInTheDocument();
        expect(screen.getByText('Skip')).toBeInTheDocument();

        await act(async () => {
            jest.advanceTimersByTime(durationSeconds * 1000);
        });
        await waitFor(() => expect(screen.getByText('Did you know ... Mock fact')).toBeInTheDocument());
    });

    test('clicking the skip button resets the timer and triggers handleTestCountdown', async () => {
        render(<TestCountdown handleTestCountdown={handleTestCountdownMock} duration_seconds={durationSeconds} />);
        await act(async () => {
            fireEvent.click(screen.getByText('Skip'));
        });
        await waitFor(() => expect(handleTestCountdownMock).toHaveBeenCalled());
    });

    test('when timer expires it triggers handleTestCountdown', async () => {
        render(<TestCountdown handleTestCountdown={handleTestCountdownMock} duration_seconds={durationSeconds} />);
        await act(async () => {
            jest.advanceTimersByTime(durationSeconds * 1000);
        });
        await waitFor(() => expect(handleTestCountdownMock).toHaveBeenCalledTimes(1), { timeout: 4000 });
    });
});
