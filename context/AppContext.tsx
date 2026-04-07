import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServiceProvider } from '../mock/providers';

interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  slot: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  appointments: Appointment[];
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  bookAppointment: (provider: ServiceProvider, slot: string, date: string) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedAppointments = await AsyncStorage.getItem('appointments');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
    } catch (e) {
      console.error('Failed to load storage', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const bookAppointment = async (provider: ServiceProvider, slot: string, date: string) => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      providerId: provider.id,
      providerName: provider.name,
      providerCategory: provider.category,
      slot,
      date,
      status: 'upcoming',
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    await AsyncStorage.setItem('appointments', JSON.stringify(updated));
  };

  const cancelAppointment = async (id: string) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: 'cancelled' as const } : app
    ).filter(app => app.status !== 'cancelled'); // For simplicity, let's just remove it or keep status
    
    // Removing for clarity in list
    const filtered = appointments.filter(app => app.id !== id);
    setAppointments(filtered);
    await AsyncStorage.setItem('appointments', JSON.stringify(filtered));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        appointments,
        login,
        logout,
        bookAppointment,
        cancelAppointment,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
