import { act, renderHook, waitFor } from '@testing-library/react';

import useTimer from '../useTimer.ts';

// Mock callback function for testing.
const mockCallback = jest.fn();

describe('useTimer hook', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('should initialize with the correct time', () => {
        const { result } = renderHook(() => useTimer(10, mockCallback));
        expect(result.current.timeRemainingInSeconds).toBe(10);
    });

    test('should start and update timer', () => {
        const startTime = 5;
        const { result } = renderHook(() => useTimer(startTime, mockCallback));

        act(() => {
            result.current.startTimer();
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            // Wait for the next tick of the event loop to allow the timer to update.
            jest.advanceTimersByTime(1000);
        });

        expect(result.current.timeRemainingInSeconds).toBe(startTime - 1);
    });

    test('should reset timer', () => {
        const { result } = renderHook(() => useTimer(5, mockCallback));

        act(() => {
            result.current.startTimer();
            jest.advanceTimersByTime(2000); // Advance timers by 2 seconds
            result.current.resetTimer();
        });

        expect(result.current.timeRemainingInSeconds).toBe(5);
    });

    test('should call callback when timer reaches 0', async () => {
        const startTimeInSeconds = 5;
        const { result } = renderHook(() => useTimer(startTimeInSeconds, mockCallback));
        const testDurationInMilliSeconds = startTimeInSeconds * 1000 + 1000; // After 0 it will call the callback.

        // At this point in time, the callback should not have been called yet.
        expect(mockCallback).not.toHaveBeenCalled();

        await act(async () => {
            result.current.startTimer();
            // Advance timer to reach 0.
            jest.advanceTimersByTime(testDurationInMilliSeconds);
        });
        await waitFor(() => expect(mockCallback).toHaveBeenCalledTimes(1), { timeout: 6500 });
    });

    test('should clear interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
        const { result, unmount } = renderHook(() => useTimer(5, mockCallback));

        act(() => {
            result.current.startTimer();
        });
        unmount();
        // Ensure clearInterval is called after unmount.
        expect(clearIntervalSpy).toHaveBeenCalled();
        // Clean up the spy.
        clearIntervalSpy.mockRestore();
    });
});
