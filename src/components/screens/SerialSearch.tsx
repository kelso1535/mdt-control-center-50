
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Serial } from '@/types';
import DashedDivider from '../DashedDivider';

const mockSerial: Serial = {
  id: 's12345',
  serial: 'WP58392',
  type: 'FIREARM',
  model: 'COMBAT PISTOL',
  owner: 'JANE DOE',
  status: 'REGISTERED',
  registeredDate: '2024-01-15',
  flags: {
    stolen: false,
    wanted: false
  }
};

const SerialSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Serial | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a serial number to search');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockSerial);
      setLoading(false);
      toast.success(`Search complete for serial "${searchQuery}"`);
    }, 800);
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="section-header">
      <div className="section-line"></div>
      <div className="section-title">------- {title} -------</div>
      <div className="section-line"></div>
    </div>
  );

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Serial Number</h2>
      
      <div className="flex space-x-2 mb-2">
        <Input
          type="text"
          placeholder="Enter serial number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Serial Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-2 mt-2 animate-slide-in">
          <SectionHeader title="SERIAL DATABASE ENTRY" />
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
            <div className="data-line">
              <span>SERIAL:</span>
              <span>{searchResult.serial}</span>
            </div>
            <div className="data-line">
              <span>TYPE:</span>
              <span>{searchResult.type}</span>
            </div>
            
            <div className="data-line">
              <span>MODEL:</span>
              <span>{searchResult.model}</span>
            </div>
            <div className="data-line">
              <span>OWNER:</span>
              <span>{searchResult.owner}</span>
            </div>
            
            <div className="data-line">
              <span>STATUS:</span>
              <span>{searchResult.status}</span>
            </div>
            <div className="data-line">
              <span>REGISTERED DATE:</span>
              <span>{searchResult.registeredDate}</span>
            </div>
          </div>
          
          <DashedDivider />
          
          <SectionHeader title="FLAGS" />
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            <div className="data-line">
              <span>STOLEN:</span>
              <span className={searchResult.flags.stolen ? 'text-destructive' : ''}>
                {searchResult.flags.stolen ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="data-line">
              <span>WANTED:</span>
              <span className={searchResult.flags.wanted ? 'text-destructive' : ''}>
                {searchResult.flags.wanted ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SerialSearch;
