
import { useState, useEffect } from 'react';
import { Person, Vehicle } from '@/types';

// Define a type for our search state
interface MDTSearchState {
  lastSearchedPerson: Person | null;
  lastSearchedVehicle: Vehicle | null;
}

// Create a simple storage mechanism
const getStoredState = (): MDTSearchState => {
  try {
    const storedState = sessionStorage.getItem('mdt-search-state');
    return storedState ? JSON.parse(storedState) : {
      lastSearchedPerson: null,
      lastSearchedVehicle: null
    };
  } catch (error) {
    console.error('Failed to parse stored MDT state:', error);
    return {
      lastSearchedPerson: null,
      lastSearchedVehicle: null
    };
  }
};

// Create a hook for sharing state between components
export const useMDTSearchState = () => {
  const [searchState, setSearchState] = useState<MDTSearchState>(getStoredState);

  // Store person search
  const storePersonSearch = (person: Person | null) => {
    setSearchState(prev => ({ ...prev, lastSearchedPerson: person }));
  };

  // Store vehicle search
  const storeVehicleSearch = (vehicle: Vehicle | null) => {
    setSearchState(prev => ({ ...prev, lastSearchedVehicle: vehicle }));
  };

  // Persist state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('mdt-search-state', JSON.stringify(searchState));
    } catch (error) {
      console.error('Failed to store MDT state:', error);
    }
  }, [searchState]);

  return {
    lastSearchedPerson: searchState.lastSearchedPerson,
    lastSearchedVehicle: searchState.lastSearchedVehicle,
    storePersonSearch,
    storeVehicleSearch
  };
};
