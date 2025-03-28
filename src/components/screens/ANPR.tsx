
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle, Car, User } from 'lucide-react';
import { toast } from 'sonner';
import { ANPRRecord } from '@/types';

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
    officerCallsign: 'UNIT-78',
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

const ANPR: React.FC = () => {
  const [records, setRecords] = useState<ANPRRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setRecords(mockANPRRecords);
      setLoading(false);
    }, 800);
  };

  const toggleResolve = (id: string) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, resolved: !record.resolved } : record
    ));
    toast.success('ANPR record status updated');
  };

  const filteredRecords = showResolved 
    ? records 
    : records.filter(record => !record.resolved);

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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          ANPR Flagged Vehicles
        </h2>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={loadData} 
            className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]"
            size="sm"
            variant="outline"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-resolved"
              checked={showResolved}
              onChange={() => setShowResolved(!showResolved)}
              className="mr-2"
            />
            <label htmlFor="show-resolved" className="text-sm text-muted-foreground">
              Show resolved flags
            </label>
          </div>
        </div>
      </div>

      <div className="bg-card/30 border border-border rounded-md p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Timestamp</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Plate</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Reason</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Officer</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Owner</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No ANPR records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id} className={`border-t border-border/30 ${record.resolved ? 'opacity-70' : ''}`}>
                  <td className="py-2 px-2 text-white">{record.timestamp}</td>
                  <td className="py-2 px-2 text-white">{record.plate}</td>
                  <td className="py-2 px-2">{getReasonBadge(record.reason)}</td>
                  <td className="py-2 px-2 text-white">{record.officerCallsign}</td>
                  <td className="py-2 px-2 text-white">{record.owner || 'Unknown'}</td>
                  <td className="py-2 px-2">
                    <Button
                      variant={record.resolved ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => toggleResolve(record.id)}
                    >
                      {record.resolved ? 'Reopen' : 'Resolve'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {filteredRecords.length > 0 && (
        <div className="text-right text-sm mt-2 text-muted-foreground">
          {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} found
        </div>
      )}
    </div>
  );
};

export default ANPR;
