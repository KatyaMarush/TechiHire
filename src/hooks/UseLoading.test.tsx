import { renderHook, act } from '@testing-library/react-hooks';
import UseLoading from './UseLoading';

describe('useLoading Hook', () => {
  test('initial state of isLoading is false', () => {
    const { result } = renderHook(() => UseLoading());
    expect(result.current.isLoading).toBe(false);
  });

  test('startLoading sets isLoading to true', () => {
    const { result } = renderHook(() => UseLoading());

    // Call startLoading
    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);
  });

  test('stopLoading sets isLoading back to false', () => {
    const { result } = renderHook(() => UseLoading());

    // Call startLoading first
    act(() => {
      result.current.startLoading();
    });

    // Then call stopLoading
    act(() => {
      result.current.stopLoading();
    });

    expect(result.current.isLoading).toBe(false);
  });
});
