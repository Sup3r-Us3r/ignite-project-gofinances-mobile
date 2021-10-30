import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import * as AuthSession from 'expo-auth-session'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import fetchMock from 'jest-fetch-mock';

import { AuthProvider, useAuth } from './AuthContext';

fetchMock.enableMocks();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('expo-auth-session');

describe('Auth Context', () => {
  it('should be able to sign in with Google account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const googleMocked = mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any token',
      },
    });

    fetchMock.mockReturnValueOnce({
      json: () => Promise.resolve({
        id: 'any id',
        email: 'any email',
        given_name: 'John Do',
        picture: 'any photo',
      }),
    } as any);

    // Usa o act quando a função que executamos altera algum valor no estado
    await act(() => result.current.signInWithGoogle());

    mockAsyncStorage.getItem.mockReset();

    expect(result.current.user).toBeTruthy();
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const googleMocked = mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    // Usa o act quando a função que executamos altera algum valor no estado
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should catch error when logging in with Google', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
