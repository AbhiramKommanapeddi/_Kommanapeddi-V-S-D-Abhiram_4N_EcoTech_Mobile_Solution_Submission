import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AppProvider, useAppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROVIDERS } from '../mock/providers';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login and save user to AsyncStorage', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(async () => {
      await result.current.login('John Doe', 'john@example.com');
    });

    expect(result.current.user).toEqual({ name: 'John Doe', email: 'john@example.com' });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
    );
  });

  it('should logout and remove user from AsyncStorage', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(async () => {
      await result.current.login('John Doe', 'john@example.com');
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should book an appointment and save to AsyncStorage', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const provider = PROVIDERS[0];
    const slot = '10:00 AM';
    const date = 'Monday, July 10';

    await act(async () => {
      await result.current.bookAppointment(provider, slot, date);
    });

    expect(result.current.appointments.length).toBe(1);
    expect(result.current.appointments[0].providerId).toBe(provider.id);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'appointments',
      expect.stringContaining(provider.id)
    );
  });

  it('should cancel an appointment', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const provider = PROVIDERS[0];

    await act(async () => {
      await result.current.bookAppointment(provider, '10:00 AM', 'Date');
    });

    const appointmentId = result.current.appointments[0].id;

    await act(async () => {
      await result.current.cancelAppointment(appointmentId);
    });

    expect(result.current.appointments.length).toBe(0);
  });
});
