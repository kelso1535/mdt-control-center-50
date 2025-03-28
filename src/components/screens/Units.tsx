
import React, { useState, useEffect } from 'react';
import { PoliceUnit } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Phone } from 'lucide-react';

interface UnitsProps {
  mockData?: PoliceUnit[];
}

const mockUnits: PoliceUnit[] = [
  {
    callsign: "CRV-625",
    pin: "405666",
    name: "JOHNNY ENDICANE",
    updated: "19:09",
    status: "UNAVAILABLE: STATION",
    location: "Sinner St & Alley St, Mission Row",
    phone: "555-3456"
  },
  {
    callsign: "M1-202",
    pin: "931398",
    name: "ARTHUR MILLER",
    updated: "17:54",
    status: "UNAVAILABLE: BUSY",
    location: "San Andreas Ave & Palomino Ave, Little Seoul",
    phone: "555-6789"
  },
  {
    callsign: "SRU-103",
    pin: "856432",
    name: "BOBBY RIVERS",
    updated: "18:32",
    status: "PATROLLING",
    location: "Elgin Ave, Strawberry",
    phone: "555-2345"
  },
  {
    callsign: "DNR-242",
    pin: "979806",
    name: "RICK BOBBY",
    updated: "18:13",
    status: "UNAVAILABLE: BUSY",
    location: "San Andreas Ave, Pillow Hill",
    phone: "555-9012"
  },
  {
    callsign: "LYK-207",
    pin: "967222",
    name: "SHERMAN HILL",
    updated: "18:26",
    status: "ON SITE",
    location: "Elgin Ave & Olympic Fwy, Strawberry",
    phone: "555-4567"
  },
  {
    callsign: "MIL-215",
    pin: "508856",
    name: "ADAM FREEMAN",
    updated: "18:10",
    status: "UNAVAILABLE: STATION",
    location: "Sinner St & Alley St, Mission Row",
    phone: "555-8901"
  }
];

const Units: React.FC<UnitsProps> = ({ mockData }) => {
  const [units, setUnits] = useState<PoliceUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPhones, setShowPhones] = useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setUnits(mockData || mockUnits);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, [mockData]);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">UNITS</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
            size="sm"
            onClick={() => setShowPhones(!showPhones)}
          >
            <Phone className="w-4 h-4 mr-1" />
            {showPhones ? 'Hide Numbers' : 'Show Numbers'}
          </Button>
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
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">CALLSIGN</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">NAME</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">UPDATED</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">STATUS</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">LOCATION</th>
              {showPhones && <th className="text-[hsl(var(--police-blue))] py-2 px-2">PHONE</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={showPhones ? 6 : 5} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : units.length === 0 ? (
              <tr>
                <td colSpan={showPhones ? 6 : 5} className="py-8 text-center text-muted-foreground">
                  No units currently on duty
                </td>
              </tr>
            ) : (
              units.map((unit, index) => (
                <tr key={index} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{unit.callsign}</td>
                  <td className="py-2 px-2 text-white">{unit.name}</td>
                  <td className="py-2 px-2 text-white">{unit.updated}</td>
                  <td className="py-2 px-2 text-white">{unit.status}</td>
                  <td className="py-2 px-2 text-white">{unit.location}</td>
                  {showPhones && <td className="py-2 px-2 text-white">{unit.phone}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Units;
