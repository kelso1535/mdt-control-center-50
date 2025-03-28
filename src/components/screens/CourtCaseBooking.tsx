
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon } from 'lucide-react';

interface AvailabilitySlot {
  id: string;
  magistrateId: string;
  magistrateName: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const CourtCaseBooking: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMagistrate, setSelectedMagistrate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [caseTitle, setCaseTitle] = useState<string>("");
  const [caseDetails, setCaseDetails] = useState<string>("");
  
  // Mock magistrates data
  const magistrates = [
    { id: "mag-1", name: "Judge Smith" },
    { id: "mag-2", name: "Judge Johnson" },
    { id: "mag-3", name: "Judge Thompson" },
  ];
  
  // Mock availability data
  const availabilitySlots: AvailabilitySlot[] = [
    { 
      id: "slot-1", 
      magistrateId: "mag-1", 
      magistrateName: "Judge Smith", 
      date: new Date(), 
      startTime: "09:00", 
      endTime: "10:00", 
      isBooked: false 
    },
    { 
      id: "slot-2", 
      magistrateId: "mag-1", 
      magistrateName: "Judge Smith", 
      date: new Date(), 
      startTime: "10:30", 
      endTime: "11:30", 
      isBooked: false 
    },
    { 
      id: "slot-3", 
      magistrateId: "mag-2", 
      magistrateName: "Judge Johnson", 
      date: new Date(), 
      startTime: "14:00", 
      endTime: "15:00", 
      isBooked: true
    },
    { 
      id: "slot-4", 
      magistrateId: "mag-3", 
      magistrateName: "Judge Thompson", 
      date: new Date(new Date().setDate(new Date().getDate() + 1)), 
      startTime: "11:00", 
      endTime: "12:00", 
      isBooked: false
    },
  ];
  
  // Filter available slots based on selected date and magistrate
  const filteredSlots = availabilitySlots.filter(slot => {
    const slotDate = new Date(slot.date);
    const selectedDate = date ? new Date(date) : null;
    
    const dateMatches = selectedDate && 
      slotDate.getDate() === selectedDate.getDate() && 
      slotDate.getMonth() === selectedDate.getMonth() && 
      slotDate.getFullYear() === selectedDate.getFullYear();
    
    const magistrateMatches = selectedMagistrate ? slot.magistrateId === selectedMagistrate : true;
    
    return dateMatches && magistrateMatches && !slot.isBooked;
  });
  
  const handleBookCourt = () => {
    if (!selectedSlot || !caseTitle) {
      toast({
        title: "Missing Information",
        description: "Please select a time slot and enter a case title.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally make an API call to book the court session
    const selectedSlotData = availabilitySlots.find(slot => slot.id === selectedSlot);
    
    toast({
      title: "Court Session Booked",
      description: `Case "${caseTitle}" booked with ${selectedSlotData?.magistrateName} on ${selectedSlotData?.date.toLocaleDateString()} at ${selectedSlotData?.startTime}.`,
      variant: "default",
    });
    
    // Reset form
    setSelectedSlot("");
    setCaseTitle("");
    setCaseDetails("");
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-400 mb-6">Court Case Booking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Select Magistrate & Date</CardTitle>
            <CardDescription className="text-slate-400">
              Choose an available magistrate and date for your court case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Magistrate</label>
                <Select value={selectedMagistrate} onValueChange={setSelectedMagistrate}>
                  <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-300">
                    <SelectValue placeholder="Select a magistrate" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="">All Magistrates</SelectItem>
                    {magistrates.map(magistrate => (
                      <SelectItem key={magistrate.id} value={magistrate.id}>
                        {magistrate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
                <div className="bg-slate-900 border border-slate-700 rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="text-slate-300"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Available Time Slots</CardTitle>
            <CardDescription className="text-slate-400">
              Select an available time slot
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSlots.length > 0 ? (
              <div className="space-y-2">
                {filteredSlots.map(slot => (
                  <div 
                    key={slot.id}
                    className={`p-3 rounded-md cursor-pointer border flex justify-between items-center ${
                      selectedSlot === slot.id 
                        ? 'bg-blue-900/40 border-blue-500' 
                        : 'bg-slate-900 border-slate-700 hover:bg-slate-900/80'
                    }`}
                    onClick={() => setSelectedSlot(slot.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-blue-400" />
                      <span className="text-slate-300">{slot.startTime} - {slot.endTime}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{slot.magistrateName}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <CalendarIcon className="mx-auto h-12 w-12 text-slate-600 mb-2" />
                <p>No available time slots found.</p>
                <p className="text-sm mt-1">Try selecting a different date or magistrate.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 bg-slate-800 border border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Case Information</CardTitle>
          <CardDescription className="text-slate-400">
            Enter details about the court case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Case Title</label>
              <Input 
                placeholder="Enter case title" 
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Case Details</label>
              <Textarea 
                placeholder="Enter case details" 
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-300 min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
            onClick={handleBookCourt}
            disabled={!selectedSlot || !caseTitle}
          >
            Book Court Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourtCaseBooking;
