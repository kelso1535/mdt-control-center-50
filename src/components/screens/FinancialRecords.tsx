
import React, { useState, useEffect } from 'react';
import { FinancialRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

const mockFinancialRecords: FinancialRecord[] = [
  {
    id: 'fr1',
    date: '2024-02-20',
    type: 'Fine',
    amount: 3500,
    status: 'UNPAID',
    description: 'Traffic Violation'
  },
  {
    id: 'fr2',
    date: '2024-02-19',
    type: 'Fine',
    amount: 5000,
    status: 'PAID',
    description: 'Property Damage'
  },
  {
    id: 'fr3',
    date: '2024-02-18',
    type: 'Fee',
    amount: 1000,
    status: 'UNPAID',
    description: 'Court Processing'
  }
];

const FinancialRecords: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalOutstandingDebt, setTotalOutstandingDebt] = useState(0);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setRecords(mockFinancialRecords);
      
      // Calculate total outstanding debt
      const outstandingDebt = mockFinancialRecords
        .filter(record => record.status === 'UNPAID')
        .reduce((total, record) => total + record.amount, 0);
      
      setTotalOutstandingDebt(outstandingDebt);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Financial Records</h2>
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
      
      {/* Outstanding Debt Summary */}
      <div className="bg-card/20 border border-border rounded-md p-3 mb-4 flex items-center">
        <AlertTriangle className="text-amber-500 w-5 h-5 mr-2" />
        <div>
          <span className="text-white font-medium">Total Outstanding Debt: </span>
          {loading ? (
            <span className="loading-dots inline-flex">
              <div></div>
              <div></div>
              <div></div>
            </span>
          ) : (
            <span className={`font-bold ${totalOutstandingDebt > 0 ? 'text-[#ff5555]' : 'text-green-400'}`}>
              ${totalOutstandingDebt.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-1 px-2">Date</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-2">Type</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-2">Amount</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-2">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-1 px-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-muted-foreground">
                  No financial records found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-t border-border/30">
                  <td className="py-1 px-2 text-white">{record.date}</td>
                  <td className="py-1 px-2 text-white">{record.type}</td>
                  <td className="py-1 px-2 text-white">${record.amount.toLocaleString()}</td>
                  <td className={`py-1 px-2 ${record.status === 'PAID' ? 'text-white' : 'text-[#ff5555]'}`}>
                    {record.status}
                  </td>
                  <td className="py-1 px-2 text-white">{record.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialRecords;
