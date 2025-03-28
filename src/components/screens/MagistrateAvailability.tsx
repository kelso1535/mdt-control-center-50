
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MagistrateAvailability, CourtDate } from '@/types';
import DashedDivider from '../DashedDivider';

const mockMagistrates: MagistrateAvailability[] = [
  {
    id: 'm1',
    name: 'Judge Johnson',
    available: true,
    availableFrom: '09:00',
    availableTo: '17:00',
    courtDates: [
      {
        id: 'cd1',
        date: '2023-11-15',
        time: '10:00',
        location: 'Court Room 1',
        caseNumber: 'CR-2023-101',
        defendant: 'John Smith',
        officer: 'Officer Blake',
        status: 'SCHEDULED'
      },
      {
        id: 'cd2',
        date: '2023-11-17',
        time: '14:00',
        location: 'Court Room 2',
        caseNumber: 'CR-2023-102',
        defendant: 'Jane Doe',
        officer: 'Officer Wilson',
        status: 'SCHEDULED'
      }
    ]
  },
  {
    id: 'm2',
    name: 'Judge Peterson',
    available: false,
    courtDates: []
  },
  {
    id: 'm3',
    name: 'Judge Roberts',
    available: true,
    availableFrom: '12:00',
    availableTo: '20:00',
    courtDates: [
      {
        id: 'cd3',
        date: '2023-11-16',
        time: '15:30',
        location: 'Court Room 3',
        caseNumber: 'CR-2023-103',
        defendant: 'Mike Wilson',
        officer: 'Officer Clark',
        status: 'SCHEDULED'
      }
    ]
  }
];

const MagistrateScreen: React.FC = () => {
  const [magistrates, setMagistrates] = useState<MagistrateAvailability[]>(mockMagistrates);
  const [activeTab, setActiveTab] = useState('available');
  const [bookingForm, setBookingForm] = useState({
    magistrateId: '',
    date: '',
    time: '',
    defendant: '',
    officer: '',
    caseNumber: '',
    location: 'Court Room 1'
  });

  const handleBooking = (magistrateId: string) => {
    setBookingForm(prev => ({...prev, magistrateId }));
  };

  const submitBooking = () => {
    const { magistrateId, date, time, defendant, officer, caseNumber, location } = bookingForm;
    
    if (!magistrateId || !date || !time || !defendant || !officer) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newCourtDate: CourtDate = {
      id: `cd${Date.now()}`,
      date,
      time,
      location,
      caseNumber,
      defendant,
      officer,
      status: 'SCHEDULED'
    };
    
    setMagistrates(prev => 
      prev.map(mag => 
        mag.id === magistrateId 
          ? { ...mag, courtDates: [...mag.courtDates, newCourtDate] }
          : mag
      )
    );
    
    setBookingForm({
      magistrateId: '',
      date: '',
      time: '',
      defendant: '',
      officer: '',
      caseNumber: '',
      location: 'Court Room 1'
    });
    
    toast.success('Court date successfully booked');
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="section-header">
      <div className="section-line"></div>
      <div className="section-title">------- {title} -------</div>
      <div className="section-line"></div>
    </div>
  );

  const handleSendDiscordNotification = (courtDate: CourtDate) => {
    // In a real implementation, this would send a notification to Discord
    toast.success(`Discord notification sent for case ${courtDate.caseNumber}`);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Magistrate System</h2>
      
      <Tabs defaultValue="available" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Magistrates</TabsTrigger>
          <TabsTrigger value="booking">Court Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-2">
          <div className="bg-card border border-border rounded-md p-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            <SectionHeader title="AVAILABLE MAGISTRATES" />
            
            <div className="grid grid-cols-1 gap-4">
              {magistrates.filter(mag => mag.available).map((magistrate) => (
                <div key={magistrate.id} className="bg-card/60 border border-border/50 rounded p-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[hsl(var(--police-blue))]">{magistrate.name}</div>
                      <div className="text-sm">
                        Available: {magistrate.availableFrom} - {magistrate.availableTo}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleBooking(magistrate.id)}
                      size="sm"
                      className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
                    >
                      Book Court Date
                    </Button>
                  </div>
                </div>
              ))}
              
              {magistrates.filter(mag => mag.available).length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  No magistrates are currently available
                </div>
              )}
            </div>
            
            {bookingForm.magistrateId && (
              <>
                <DashedDivider />
                <SectionHeader title="BOOK COURT DATE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Date</label>
                      <Input 
                        type="date" 
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm(prev => ({...prev, date: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Time</label>
                      <Input 
                        type="time" 
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm(prev => ({...prev, time: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Court Room</label>
                      <Input 
                        type="text" 
                        value={bookingForm.location}
                        onChange={(e) => setBookingForm(prev => ({...prev, location: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Defendant Name</label>
                      <Input 
                        type="text" 
                        value={bookingForm.defendant}
                        onChange={(e) => setBookingForm(prev => ({...prev, defendant: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Officer Name</label>
                      <Input 
                        type="text" 
                        value={bookingForm.officer}
                        onChange={(e) => setBookingForm(prev => ({...prev, officer: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[hsl(var(--police-blue))]">Case Number</label>
                      <Input 
                        type="text" 
                        value={bookingForm.caseNumber}
                        onChange={(e) => setBookingForm(prev => ({...prev, caseNumber: e.target.value}))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={() => setBookingForm(prev => ({...prev, magistrateId: ''}))}
                    variant="outline"
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={submitBooking}
                    className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
                  >
                    Book Court Date
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="booking" className="mt-2">
          <div className="bg-card border border-border rounded-md p-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            <SectionHeader title="SCHEDULED COURT DATES" />
            
            <div className="grid grid-cols-1 gap-4">
              {magistrates.flatMap(mag => 
                mag.courtDates.map(court => ({...court, magistrateName: mag.name}))
              ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((courtDate: any) => (
                <div key={courtDate.id} className="bg-card/60 border border-border/50 rounded p-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="data-line">
                      <span>CASE #:</span>
                      <span>{courtDate.caseNumber || 'N/A'}</span>
                    </div>
                    <div className="data-line">
                      <span>MAGISTRATE:</span>
                      <span>{courtDate.magistrateName}</span>
                    </div>
                    <div className="data-line">
                      <span>DATE & TIME:</span>
                      <span>{courtDate.date} at {courtDate.time}</span>
                    </div>
                    <div className="data-line">
                      <span>LOCATION:</span>
                      <span>{courtDate.location}</span>
                    </div>
                    <div className="data-line">
                      <span>DEFENDANT:</span>
                      <span>{courtDate.defendant}</span>
                    </div>
                    <div className="data-line">
                      <span>OFFICER:</span>
                      <span>{courtDate.officer}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button 
                      onClick={() => handleSendDiscordNotification(courtDate)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Send Discord Notification
                    </Button>
                  </div>
                </div>
              ))}
              
              {magistrates.flatMap(mag => mag.courtDates).length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  No court dates are currently scheduled
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MagistrateScreen;
