
import React, { useState, useEffect } from 'react';
import { CriminalRecord } from '@/types';

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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecords(mockCriminalRecords);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold mb-2">LEAP CRIMINAL HISTORY</h2>
      
      <div className="bg-card/30 border border-border rounded-md p-2 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-1 px-1">Date</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-1">P? Amount</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-1">Offence</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-border/30">
                <td className="py-1 px-1 text-white">{record.date}</td>
                <td className="py-1 px-1">
                  <span className="text-white">{record.paid ? 'Y' : 'N'}</span>{' '}
                  <span className="text-white">${record.amount}</span>
                </td>
                <td className="py-1 px-1 text-white">{record.offense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriminalHistory;
