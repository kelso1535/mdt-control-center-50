import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
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

  const getReasonLabel = (reason: ANPRRecord['reason']) => {
    switch (reason) {
      case 'EXPIRED_REGISTRATION':
        return 'EXPIRED REGO';
      case 'STOLEN':
        return 'STOLEN';
      case 'WANTED':
        return 'WANTED';
      case 'MANUAL_CHECK':
        return 'MANUAL CHECK';
      case 'INSURANCE_EXPIRED':
        return 'NO INSURANCE';
      case 'OWNER_WANTED':
        return 'OWNER WANTED';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          ANPR Flagged Vehicles
        </h2>
        <Button 
          variant="outline" 
          className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
          size="sm"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-1">Timestamp</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-1">Plate</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-1">Reason</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-1">Owner</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-1">Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No ANPR records found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-t border-border/30">
                  <td className="py-2 px-1 text-white">{record.timestamp}</td>
                  <td className="py-2 px-1 text-white">{record.plate}</td>
                  <td className="py-2 px-1">
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.reason === 'STOLEN' || record.reason === 'WANTED' || record.reason === 'OWNER_WANTED' 
                        ? 'bg-red-900/50 text-red-200' 
                        : 'bg-amber-800/50 text-amber-200'
                    }`}>
                      {getReasonLabel(record.reason)}
                    </span>
                  </td>
                  <td className="py-2 px-1 text-white">{record.owner}</td>
                  <td className="py-2 px-1 text-white">{record.model}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ANPR;
