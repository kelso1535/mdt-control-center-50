
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, Clock, FileText, CheckCircle2, X
} from 'lucide-react';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  notes: string;
}

const MagistrateAvailability: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [availabilitySlots, setAvailabilitySlots] = useState<TimeSlot[]>([
    {
      id: '1',
      date: '2023-09-20',
      startTime: '09:00',
      endTime: '12:00',
      recurring: true,
      notes: 'Regular court session hours'
    },
    {
      id: '2',
      date: '2023-09-21',
      startTime: '14:00',
      endTime: '17:00',
      recurring: false,
      notes: 'Special session for high-profile cases'
    },
    {
      id: '3',
      date: '2023-09-22',
      startTime: '10:00',
      endTime: '15:00',
      recurring: false,
      notes: ''
    }
  ]);
  
  const [newSlot, setNewSlot] = useState<Omit<TimeSlot, 'id'>>({
    date: '',
    startTime: '',
    endTime: '',
    recurring: false,
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      toast.error("Please fill out all required fields");
      setLoading(false);
      return;
    }

    // Create new availability slot
    const newAvailabilitySlot: TimeSlot = {
      ...newSlot,
      id: Date.now().toString()
    };

    // Add to state
    setAvailabilitySlots(prev => [...prev, newAvailabilitySlot]);
    
    toast.success("Availability slot added successfully");
    
    // Reset form
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
      recurring: false,
      notes: ''
    });
    
    setLoading(false);
  };
  
  const handleDeleteSlot = (id: string) => {
    setAvailabilitySlots(prev => prev.filter(slot => slot.id !== id));
    toast.success("Availability slot removed");
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-4">Manage Your Availability Calendar</h2>
      
      <div className="bg-card/30 border border-border rounded-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] mb-2">Add New Availability</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm text-muted-foreground mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date*
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newSlot.date}
                  onChange={handleInputChange}
                  className="bg-card/50"
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="startTime" className="block text-sm text-muted-foreground mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Start Time*
                  </label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={newSlot.startTime}
                    onChange={handleInputChange}
                    className="bg-card/50"
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="endTime" className="block text-sm text-muted-foreground mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    End Time*
                  </label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={newSlot.endTime}
                    onChange={handleInputChange}
                    className="bg-card/50"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm text-muted-foreground mb-1">
                <FileText className="inline h-4 w-4 mr-1" />
                Notes (Optional)
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={newSlot.notes}
                onChange={handleInputChange}
                placeholder="Add any details about this availability slot"
                className="bg-card/50"
                rows={2}
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="recurring"
                  checked={newSlot.recurring}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
                <span className="text-white">Make this a weekly recurring slot</span>
              </label>
              {newSlot.recurring && (
                <p className="text-xs text-muted-foreground mt-1">This slot will appear on your calendar every week until manually removed.</p>
              )}
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90"
                disabled={loading}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {loading ? 'Adding...' : 'Add Availability Slot'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg text-[hsl(var(--police-blue))] mb-3">Your Available Time Slots</h3>
        <div className="bg-card/30 border border-border rounded-md p-4">
          {availabilitySlots.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No availability slots set. Add some above.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border/50">
                  <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Date</th>
                  <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Time</th>
                  <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Recurring</th>
                  <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Notes</th>
                  <th className="py-2 px-1 text-[hsl(var(--police-blue))]"></th>
                </tr>
              </thead>
              <tbody>
                {availabilitySlots.map((slot) => (
                  <tr key={slot.id} className="border-t border-border/30">
                    <td className="py-2 px-1 text-white">{slot.date}</td>
                    <td className="py-2 px-1 text-white">{slot.startTime} - {slot.endTime}</td>
                    <td className="py-2 px-1 text-white">
                      {slot.recurring ? (
                        <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-md text-xs">WEEKLY</span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs">ONE-TIME</span>
                      )}
                    </td>
                    <td className="py-2 px-1 text-white">{slot.notes}</td>
                    <td className="py-2 px-1 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          <div className="mt-4 border-t border-border/30 pt-4">
            <h4 className="text-sm font-medium mb-2 text-[hsl(var(--police-blue))]">Booking Info</h4>
            <p className="text-sm text-muted-foreground">
              Police officers will be able to view these time slots and book court sessions or consultations 
              during these hours. You'll receive notifications when bookings are made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagistrateAvailability;
