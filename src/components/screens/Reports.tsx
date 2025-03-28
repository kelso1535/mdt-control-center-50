
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCcw, File, AlertTriangle, FileText } from 'lucide-react';
import DashedDivider from '../DashedDivider';

type Report = {
  id: string;
  subject: string;
  type: 'Field' | 'Risk' | 'Incident' | 'Criminal' | 'Warrant';
  date: string;
  time: string;
  officer: string;
  summary: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  charges?: string[];
  pins?: string[];
  details?: string;
  warrantDetails?: string;
};

const mockReports: Report[] = [
  {
    id: 'W-2023-0451',
    subject: 'SIFF ELLIS-BAKER',
    type: 'Warrant',
    date: '25/09/2022',
    time: '19:38 PM',
    officer: 'Jimmy Cooks',
    summary: 'ACTIVE CRIMINAL WARRANT',
    severity: 'High',
    warrantDetails: 'Outstanding Warrant for Questioning - SIFF ELLIS-BAKER- Unconfirmed ID',
    charges: [
      'Engage in a police pursuit/ Evade police'
    ],
    pins: [
      'Exceed Speed Limit over 45km/h'
    ],
    details: "Warrant Details:\nResponded to a illegal drug selling call in Mirror Park next to Taxi depot, K9 200 arrived and saw 1 vehicle, mazda RX7 silver in color on scene regoff MVU 473 occupied x1 male. K9 200 code 4'd the male and questioned him, the male says he was just meeting a friend. K9 200 didn't believe him so asked him to step out the vehicle, as the K9 sniff him. The male complied and stepped out, as K9 200 was getting his dog out of the vehicle, a jeep wrangler comes and hits K9 200's car, then the male got in the RX7 and took off at high rates of speed. The RX7 was not marked stolen. Please inform mr.Baker that he is responsible for all crimes committed in his vehicle when its not marked stolen."
  },
  {
    id: 'R-2023-0183',
    subject: 'Braxton Jones',
    type: 'Field',
    date: '23/05/2022',
    time: '14:22 PM',
    officer: 'Officer Wilson',
    summary: 'Subject found in possession of suspicious materials during routine stop.',
    severity: 'Medium'
  },
  {
    id: 'R-2023-0602',
    subject: 'Braxton Jones',
    type: 'Incident',
    date: '04/11/2023',
    time: '22:15 PM',
    officer: 'Officer Martinez',
    summary: 'Subject involved in altercation with law enforcement at local bar.',
    severity: 'High'
  }
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="section-header">
      <div className="section-line"></div>
      <div className="section-title">{title}</div>
      <div className="section-line"></div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold">Police Reports</h2>
        <Button 
          variant="outline" 
          className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/10" 
          size="sm"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
      
      <div className="bg-card border border-[hsl(var(--police-blue))]/30 rounded-md">
        {loading ? (
          <div className="p-8 text-center">
            <div className="loading-dots inline-flex">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center text-white">
            No reports found
          </div>
        ) : (
          <div className="p-2 font-mono">
            {reports.map((report) => (
              <div key={report.id} className="mb-6 text-white text-sm">
                <SectionHeader title="WARRANTS" />
                
                <div className="mb-2 text-white">
                  <span>DATE: {report.date} {report.time} - {report.summary} - Entered by: {report.officer}</span>
                </div>
                
                {report.warrantDetails && (
                  <div className="mb-2 text-white">
                    <span>WARRANT DETAILS: {report.warrantDetails}</span>
                  </div>
                )}
                
                {report.charges && report.charges.length > 0 && (
                  <div className="mb-3 text-white">
                    <div>List of Charges:</div>
                    {report.charges.map((charge, index) => (
                      <div key={index} className="pl-2">- {charge}</div>
                    ))}
                  </div>
                )}
                
                {report.pins && report.pins.length > 0 && (
                  <div className="mb-3 text-white">
                    <div>Pins:</div>
                    {report.pins.map((pin, index) => (
                      <div key={index} className="pl-2">- {pin}</div>
                    ))}
                  </div>
                )}
                
                <div className="mb-2 text-white">
                  <div>REPORT: Preliminary Details</div>
                  <div>Time: {report.time} APPROX</div>
                  <div>Date: {report.date}</div>
                </div>
                
                {report.details && (
                  <div className="whitespace-pre-line text-white">
                    {report.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
