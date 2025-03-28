
import React, { useState, useEffect } from 'react';
import { SearchHistoryItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

// Updated mock data with proper typing
const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: 'sh1',
    timestamp: '2024-02-20 19:45',
    type: 'Person',
    query: 'John Smith'
  },
  {
    id: 'sh2',
    timestamp: '2024-02-20 19:30',
    type: 'Vehicle',
    query: 'ABC123'
  },
  {
    id: 'sh3',
    timestamp: '2024-02-20 19:15',
    type: 'Serial',
    query: 'SN123456789'
  },
  {
    id: 'sh4',
    timestamp: '2024-02-20 19:00',
    type: 'Person',
    query: 'Jane Doe'
  },
  {
    id: 'sh5',
    timestamp: '2024-02-20 18:45',
    type: 'ANPR',
    query: 'XYZ789'
  },
  {
    id: 'sh6',
    timestamp: '2024-02-20 18:30',
    type: 'Warrant',
    query: 'Emily Johnson'
  }
];

const SearchHistory: React.FC = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setHistory(mockSearchHistory);
      setLoading(false);
      toast.success('Search history refreshed');
    }, 800);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Search History</h2>
        <Button 
          variant="outline" 
          className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
          size="sm"
          onClick={loadHistory}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Timestamp</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Search Type</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Query</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No search history found
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{item.timestamp}</td>
                  <td className="py-2 px-2 text-white">{item.type}</td>
                  <td className="py-2 px-2 text-white">{item.query}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchHistory;
