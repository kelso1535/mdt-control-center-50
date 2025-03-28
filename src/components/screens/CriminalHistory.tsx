
import React, { useState, useEffect } from 'react';
import { CriminalRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const mockCriminalRecords: CriminalRecord[] = [
  {
    id: 'cr1',
    date: '19/10/2023',
    paid: false,
    amount: 3500,
    offense: 'CHARGE: Engage in a Police Pursuit / Evade Police'
  },
  {
    id: 'cr2',
    date: '19/10/2023',
    paid: false,
    amount: 3500,
    offense: 'CHARGE: Assault Police'
  },
  {
    id: 'cr3',
    date: '19/10/2023',
    paid: true,
    amount: 1,
    offense: 'CHARGE: Right to Trial'
  },
  {
    id: 'cr4',
    date: '19/10/2023',
    paid: false,
    amount: 5000,
    offense: 'CHARGE: Kidnapping'
  },
  {
    id: 'cr5',
    date: '03/10/2023',
    paid: false,
    amount: 20000,
    offense: 'CHARGE: Attempted Murder (Police)'
  },
  {
    id: 'cr6',
    date: '03/10/2023',
    paid: false,
    amount: 2000,
    offense: 'CHARGE: Armed Robbery'
  },
  {
    id: 'cr7',
    date: '21/03/2023',
    paid: true,
    amount: 1,
    offense: 'CHARGE: Right to Trial'
  },
  {
    id: 'cr8',
    date: '21/03/2023',
    paid: true,
    amount: 3500,
    offense: 'CHARGE: Engage in a Police Pursuit / Evade Police'
  },
  {
    id: 'cr9',
    date: '21/03/2023',
    paid: true,
    amount: 20000,
    offense: 'CHARGE: Attempted Murder (Police)'
  },
  {
    id: 'cr10',
    date: '21/03/2023',
    paid: true,
    amount: 1000,
    offense: 'CHARGE: Contempt of Court'
  },
  {
    id: 'cr11',
    date: '21/03/2023',
    paid: true,
    amount: 2000,
    offense: 'CHARGE: Possess weapon (firearm) without legal authority'
  },
  {
    id: 'cr12',
    date: '21/03/2023',
    paid: true,
    amount: 2000,
    offense: 'CHARGE: Discharge weapon in a public place'
  }
];

const CriminalHistory: React.FC = () => {
  const [records, setRecords] = useState<CriminalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setRecords(mockCriminalRecords);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">LEAP CRIMINAL HISTORY</h2>
        <div className="flex gap-2">
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
      
      <div className="bg-card/30 border border-border rounded-md p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Date</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Paid</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Amount</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Offense</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No criminal records found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{record.date}</td>
                  <td className="py-2 px-2 text-white">{record.paid ? 'Y' : 'N'}</td>
                  <td className="py-2 px-2 text-white">${record.amount}</td>
                  <td className="py-2 px-2 text-white">{record.offense}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriminalHistory;
