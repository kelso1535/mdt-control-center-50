
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Person } from '@/types';
import PersonSearchForm from '../person/PersonSearchForm';
import PersonResult from '../person/PersonResult';

// Mock data moved from the original component
const mockPerson: Person = {
  id: '12345',
  name: 'Braxton Jones',
  dob: '1972-3-23',
  gender: 'M',
  address: 'STRAWBERRY, LOS SANTOS',
  phone: '5836764',
  licenseClass: '[CAR] [RIDER]',
  licenseExpiry: '2023-11-13 00:00 AM',
  licenseStatus: 'CURRENT',
  demeritPoints: 0,
  flags: {
    wanted: false,
    bail: false,
    possessWeapon: false,
    violencePolice: true,
    violence: false,
  },
  weapons: {
    longarm: false,
    concealCarry: false,
    prohibOrder: false,
    handgun: false,
  },
  imageUrl: '/lovable-uploads/6c8b5332-7c77-4a3f-b514-dcc463e3d9fe.png',
  ownedVehicles: [
    {
      id: 'v12345',
      plate: 'ABC123',
      model: 'BUFFALO STX',
      color: 'BLACK',
      owner: 'Braxton Jones',
      registration: 'VALID',
      flags: {
        stolen: false,
        wanted: false
      }
    },
    {
      id: 'v67890',
      plate: 'XYZ789',
      model: 'SULTAN RS',
      color: 'BLUE',
      owner: 'Braxton Jones',
      registration: 'VALID',
      flags: {
        stolen: false,
        wanted: false
      }
    }
  ]
};

interface PeopleSearchProps {
  onPersonFound?: (person: Person | null) => void;
}

const PeopleSearch: React.FC<PeopleSearchProps> = ({ onPersonFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a name to search');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setSearchResult(mockPerson);
      if (onPersonFound) {
        onPersonFound(mockPerson);
      }
      setLoading(false);
      toast.success(`Search complete for "${searchQuery}"`);
    }, 800);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Person</h2>
      
      <PersonSearchForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
      />
      
      {searchResult && <PersonResult person={searchResult} />}
    </div>
  );
};

export default PeopleSearch;
