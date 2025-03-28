
import { Warrant } from '@/types';

// Mock data for warrants in development mode
const mockWarrants: Warrant[] = [
  {
    id: 'w1',
    name: 'John Smith',
    status: 'ACTIVE',
    count: 3
  },
  {
    id: 'w2',
    name: 'Jane Doe',
    status: 'ACTIVE',
    count: 1
  },
  {
    id: 'w3',
    name: 'Mike Johnson',
    status: 'ACTIVE',
    count: 2
  },
  {
    id: 'w4',
    name: 'Sarah Williams',
    status: 'ACTIVE',
    count: 4
  },
  {
    id: 'w5',
    name: 'Robert Brown',
    status: 'ACTIVE',
    count: 2
  }
];

// Function to fetch mock warrants with optional delay to simulate network
export const fetchWarrants = async (): Promise<Warrant[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Log for debugging
  console.info('Using mock warrant data (dev mode or fetch failed)');
  
  // Return mock data
  return [...mockWarrants];
};

// Function to add a new warrant (mock implementation)
export const addWarrant = async (warrant: Omit<Warrant, 'id'>): Promise<Warrant> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create a new warrant with an ID
  const newWarrant: Warrant = {
    ...warrant,
    id: `w${mockWarrants.length + 1}`
  };
  
  // Add to mock data (in a real app this would be persisted)
  mockWarrants.push(newWarrant);
  
  // Return the new warrant
  return newWarrant;
};

export default {
  fetchWarrants,
  addWarrant
};
