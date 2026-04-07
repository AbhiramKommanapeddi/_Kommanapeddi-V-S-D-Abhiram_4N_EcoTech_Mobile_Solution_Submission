import { PROVIDERS, ServiceProvider } from '../mock/providers';

/**
 * Simulated API Service
 * This layer abstracts data fetching to demonstrate how the app 
 * connects to a real backend in a production environment.
 */

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  /**
   * Fetch all service providers with optional category filtering
   */
  async getProviders(category?: string): Promise<ServiceProvider[]> {
    await delay(800); // Simulate network round-trip
    if (!category || category === 'All') {
      return PROVIDERS;
    }
    return PROVIDERS.filter(p => p.category === category);
  },

  /**
   * Fetch a single provider by ID
   */
  async getProviderById(id: string): Promise<ServiceProvider | undefined> {
    await delay(500);
    return PROVIDERS.find(p => p.id === id);
  },

  /**
   * Simulated booking endpoint
   */
  async bookAppointment(providerId: string, slot: string, date: string): Promise<{ success: boolean; bookingId: string }> {
    await delay(1200);
    // In a real app, this would send a POST request to the server
    return {
      success: true,
      bookingId: Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  }
};
