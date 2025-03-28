
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PersonSearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
}

const PersonSearchForm: React.FC<PersonSearchFormProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  loading 
}) => {
  return (
    <div className="flex space-x-2 mb-2">
      <Input
        type="text"
        placeholder="Enter name to search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <Button 
        onClick={handleSearch}
        className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Run Person Check'}
      </Button>
    </div>
  );
};

export default PersonSearchForm;
