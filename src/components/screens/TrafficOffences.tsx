
import React, { useState, useEffect } from 'react';
import { TrafficOffence } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const mockTrafficOffences: TrafficOffence[] = [
  {
    id: 'to1',
    date: '2024-02-20',
    type: 'Speeding Fine',
    amount: 250,
    details: 'Exceeded speed limit by 20km/h'
  },
  {
    id: 'to2',
    date: '2024-02-19',
    type: 'Unregistered Vehicle',
    amount: 500,
    details: 'Operating an unregistered vehicle'
  }
];

const TrafficOffences: React.FC = () => {
  const [offences, setOffences] = useState<TrafficOffence[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setOffences(mockTrafficOffences);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Infringement Notices & Fines</h2>
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
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Date</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Type</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Amount</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Details</th>
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
            ) : offences.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No traffic offences found
                </td>
              </tr>
            ) : (
              offences.map((offence) => (
                <tr key={offence.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{offence.date}</td>
                  <td className="py-2 px-2 text-white">{offence.type}</td>
                  <td className="py-2 px-2 text-white">${offence.amount}</td>
                  <td className="py-2 px-2 text-white">{offence.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficOffences;
