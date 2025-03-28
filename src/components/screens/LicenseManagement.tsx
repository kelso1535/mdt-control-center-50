
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface License {
  id: string;
  name: string;
  licenseType: string;
  licenseStatus: 'VALID' | 'SUSPENDED' | 'REVOKED' | 'PROBATION';
  expiryDate: string;
  points: number;
  notes: string;
}

// Mock data for licenses
const mockLicenses: License[] = [
  {
    id: 'l1',
    name: 'Braxton Jones',
    licenseType: 'Class C - Car',
    licenseStatus: 'VALID',
    expiryDate: '2025-06-15',
    points: 2,
    notes: 'Previous speeding offense'
  },
  {
    id: 'l2',
    name: 'Sarah Thompson',
    licenseType: 'Class C - Car',
    licenseStatus: 'SUSPENDED',
    expiryDate: '2024-11-20',
    points: 12,
    notes: 'Multiple traffic violations'
  },
  {
    id: 'l3',
    name: 'Michael Peterson',
    licenseType: 'Class A - Motorcycle',
    licenseStatus: 'VALID',
    expiryDate: '2026-03-08',
    points: 0,
    notes: 'Clean record'
  },
  {
    id: 'l4',
    name: 'Jessica Williams',
    licenseType: 'Class C - Car, Class A - Motorcycle',
    licenseStatus: 'PROBATION',
    expiryDate: '2024-09-30',
    points: 8,
    notes: 'Under probation for DUI'
  },
  {
    id: 'l5',
    name: 'Robert Davis',
    licenseType: 'Class C - Car',
    licenseStatus: 'REVOKED',
    expiryDate: 'N/A',
    points: 15,
    notes: 'License revoked due to repeated DUI offenses'
  }
];

const LicenseManagement: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLicenses, setFilteredLicenses] = useState<License[]>([]);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLicenses(mockLicenses);
      setFilteredLicenses(mockLicenses);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredLicenses(licenses.filter(license => 
        license.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredLicenses(licenses);
    }
  }, [searchQuery, licenses]);

  const handleStatusChange = (licenseId: string, newStatus: 'VALID' | 'SUSPENDED' | 'REVOKED' | 'PROBATION') => {
    setLicenses(prevLicenses => 
      prevLicenses.map(license => 
        license.id === licenseId 
          ? { ...license, licenseStatus: newStatus } 
          : license
      )
    );
    
    const licenseName = licenses.find(l => l.id === licenseId)?.name;
    toast.success(`${licenseName}'s license status changed to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VALID': return 'text-green-500';
      case 'SUSPENDED': return 'text-yellow-500';
      case 'REVOKED': return 'text-red-500';
      case 'PROBATION': return 'text-orange-500';
      default: return 'text-white';
    }
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">License Management</h2>
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
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Name</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">License Type</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Expiry</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Points</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Actions</th>
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
            ) : filteredLicenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No licenses found matching your search
                </td>
              </tr>
            ) : (
              filteredLicenses.map((license) => (
                <tr key={license.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{license.name}</td>
                  <td className="py-2 px-2 text-white">{license.licenseType}</td>
                  <td className="py-2 px-2">
                    <span className={`font-medium ${getStatusColor(license.licenseStatus)}`}>
                      {license.licenseStatus}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-white">{license.expiryDate}</td>
                  <td className="py-2 px-2 text-white">
                    <span className={license.points > 8 ? 'text-red-500' : 'text-white'}>
                      {license.points}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <Select 
                      onValueChange={(value) => handleStatusChange(
                        license.id, 
                        value as 'VALID' | 'SUSPENDED' | 'REVOKED' | 'PROBATION'
                      )}
                      defaultValue={license.licenseStatus}
                    >
                      <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
                        <SelectValue placeholder="Change" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VALID">
                          <div className="flex items-center">
                            <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                            <span>VALID</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="SUSPENDED">
                          <div className="flex items-center">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                            <span>SUSPEND</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="REVOKED">
                          <div className="flex items-center">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1 text-red-500" />
                            <span>REVOKE</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="PROBATION">
                          <div className="flex items-center">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1 text-orange-500" />
                            <span>PROBATION</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LicenseManagement;
