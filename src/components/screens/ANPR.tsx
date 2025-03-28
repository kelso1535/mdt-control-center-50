
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCcw, AlertTriangle, MapPin, Clock, Car, User } from 'lucide-react';
import { toast } from 'sonner';
import { ANPRRecord } from '@/types';

interface ANPRProps {
  callsign?: string;
}

// Mock ANPR records
const mockANPRRecords: ANPRRecord[] = [
  {
    id: 'anpr1',
    timestamp: '2023-09-15 14:32',
    plate: 'ABC123',
    reason: 'EXPIRED_REGISTRATION',
    officerCallsign: 'UNIT-23',
    resolved: false,
    location: 'Main St & 5th Ave',
    owner: 'John Smith',
    model: 'Sentinel'
  },
  {
    id: 'anpr2',
    timestamp: '2023-09-15 15:45',
    plate: 'XYZ789',
    reason: 'STOLEN',
    officerCallsign: 'UNIT-45',
    resolved: true,
    location: 'Highway 1, Mile 35',
    notes: 'Vehicle recovered, suspect apprehended',
    owner: 'Jane Williams',
    model: 'Sultan RS'
  },
  {
    id: 'anpr3',
    timestamp: '2023-09-15 16:15',
    plate: 'LMN456',
    reason: 'MANUAL_CHECK',
    officerCallsign: 'UNIT-12',
    resolved: false,
    location: 'Downtown PD',
    notes: 'Suspicious vehicle in high crime area',
    owner: 'Robert Johnson',
    model: 'Buffalo'
  },
  {
    id: 'anpr4',
    timestamp: '2023-09-14 09:23',
    plate: 'QWE321',
    reason: 'OWNER_WANTED',
    officerCallsign: 'Unknown',
    resolved: false,
    location: 'Beach Blvd',
    owner: 'Mike Davis',
    model: 'Futo'
  },
  {
    id: 'anpr5',
    timestamp: '2023-09-14 18:02',
    plate: 'RTY654',
    reason: 'INSURANCE_EXPIRED',
    officerCallsign: 'UNIT-32',
    resolved: false,
    location: 'Vinewood Hills',
    owner: 'Alice Cooper',
    model: 'Dominator'
  }
];

const ANPR: React.FC<ANPRProps> = ({ callsign = 'Unknown' }) => {
  const [records, setRecords] = useState<ANPRRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, [callsign]);

  const loadData = () => {
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // Filter records for the current officer callsign
      const officerRecords = mockANPRRecords.filter(record => 
        // Include records that don't have an officer assigned (shown as "Unknown")
        // or records that match the current officer's callsign
        record.officerCallsign === callsign || record.officerCallsign === 'Unknown'
      );
      setRecords(officerRecords);
      setLoading(false);
    }, 800);
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate search API call
    setTimeout(() => {
      const filtered = mockANPRRecords.filter(record => 
        (record.officerCallsign === callsign || record.officerCallsign === 'Unknown') && 
        (
          record.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (record.owner && record.owner.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      setRecords(filtered);
      setLoading(false);
      
      if (filtered.length === 0) {
        toast.info('No ANPR records found matching your search');
      }
    }, 600);
  };

  const getReasonBadge = (reason: ANPRRecord['reason']) => {
    switch (reason) {
      case 'EXPIRED_REGISTRATION':
        return <span className="px-2 py-1 bg-amber-800/50 text-amber-200 rounded-md text-xs">EXPIRED REGO</span>;
      case 'STOLEN':
        return <span className="px-2 py-1 bg-rose-900/50 text-rose-200 rounded-md text-xs">STOLEN</span>;
      case 'WANTED':
        return <span className="px-2 py-1 bg-red-900/50 text-red-200 rounded-md text-xs">WANTED</span>;
      case 'MANUAL_CHECK':
        return <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-md text-xs">MANUAL CHECK</span>;
      case 'INSURANCE_EXPIRED':
        return <span className="px-2 py-1 bg-orange-800/50 text-orange-200 rounded-md text-xs">NO INSURANCE</span>;
      case 'OWNER_WANTED':
        return <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded-md text-xs">OWNER WANTED</span>;
      default:
        return <span className="px-2 py-1 bg-gray-800/50 text-gray-200 rounded-md text-xs">UNKNOWN</span>;
    }
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        ANPR Flagged Vehicles
      </h2>

      <div className="flex space-x-2 mb-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by plate or owner..."
          className="bg-background"
        />
        <Button 
          onClick={handleSearch} 
          className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90"
        >
          Search
        </Button>
        <Button 
          onClick={loadData} 
          size="icon" 
          variant="outline"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">
          {records.length} record{records.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loading-spinner"></div>
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No ANPR records found
        </div>
      ) : (
        <div className="space-y-2">
          {records.map(record => (
            <div 
              key={record.id} 
              className="bg-card/30 border border-border rounded-md p-3"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-[hsl(var(--police-blue))]" />
                  <span className="text-white font-bold mr-2">{record.plate}</span>
                  {getReasonBadge(record.reason)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground mr-1">Time:</span>
                  <span className="text-white">{record.timestamp}</span>
                </div>
                
                {record.model && (
                  <div className="flex items-center text-sm">
                    <Car className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground mr-1">Vehicle:</span>
                    <span className="text-white">{record.model}</span>
                  </div>
                )}
              </div>
              
              {record.owner && (
                <div className="flex items-center text-sm mb-1">
                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground mr-1">Owner:</span>
                  <span className="text-white">{record.owner}</span>
                </div>
              )}
              
              {record.notes && (
                <div className="text-sm mt-2 border-t border-border/30 pt-2">
                  <span className="text-muted-foreground">Notes: </span>
                  <span className="text-white">{record.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ANPR;
