
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, FileText, MessageSquare, Send } from 'lucide-react';

type BookingType = 'court' | 'consultation';

interface BookingFormData {
  defendant: string;
  caseNumber: string;
  date: string;
  time: string;
  reason: string;
  contactInfo: string;
  bookingType: BookingType;
  notifyDiscord: boolean;
  notifySMS: boolean;
}

const MagistrateAvailability: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    defendant: '',
    caseNumber: '',
    date: '',
    time: '',
    reason: '',
    contactInfo: '',
    bookingType: 'court',
    notifyDiscord: true,
    notifySMS: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.defendant || !formData.date || !formData.time || !formData.reason) {
      toast.error("Please fill out all required fields");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Booking submitted:", formData);
      
      // Show success message with appropriate notification details
      let successMessage = "Magistrate booking submitted successfully.";
      if (formData.notifyDiscord) {
        successMessage += " A Discord announcement has been posted.";
      }
      if (formData.notifySMS) {
        successMessage += " SMS notifications have been sent.";
      }
      
      toast.success(successMessage);
      
      // Reset form
      setFormData({
        defendant: '',
        caseNumber: '',
        date: '',
        time: '',
        reason: '',
        contactInfo: '',
        bookingType: 'court',
        notifyDiscord: true,
        notifySMS: true
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-4">Magistrate Session Booking</h2>
      
      <div className="bg-card/30 border border-border rounded-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg text-[hsl(var(--police-blue))] mb-2">Session Type</h3>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="bookingType"
                    value="court"
                    checked={formData.bookingType === 'court'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="text-white">Court Case (20 minutes)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="bookingType"
                    value="consultation"
                    checked={formData.bookingType === 'consultation'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="text-white">Warrant Consultation (10 minutes)</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="defendant" className="block text-sm text-muted-foreground mb-1">
                  Defendant Name*
                </label>
                <Input
                  id="defendant"
                  name="defendant"
                  value={formData.defendant}
                  onChange={handleInputChange}
                  placeholder="Enter defendant name"
                  className="bg-card/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="caseNumber" className="block text-sm text-muted-foreground mb-1">
                  Case Number
                </label>
                <Input
                  id="caseNumber"
                  name="caseNumber"
                  value={formData.caseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter case number (optional)"
                  className="bg-card/50"
                />
              </div>
            </div>
            
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
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-card/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm text-muted-foreground mb-1">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Time*
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-card/50"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm text-muted-foreground mb-1">
                <FileText className="inline h-4 w-4 mr-1" />
                Reason for Session*
              </label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Describe the purpose of this session"
                className="bg-card/50"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label htmlFor="contactInfo" className="block text-sm text-muted-foreground mb-1">
                <MessageSquare className="inline h-4 w-4 mr-1" />
                Contact Information
              </label>
              <Input
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="Phone number or other contact method"
                className="bg-card/50"
              />
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="text-md text-[hsl(var(--police-blue))] mb-2">Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notifyDiscord"
                    checked={formData.notifyDiscord}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span className="text-white">Post Discord announcement</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notifySMS"
                    checked={formData.notifySMS}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span className="text-white">Send SMS notification</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90"
                disabled={loading}
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-lg text-[hsl(var(--police-blue))] mb-3">Upcoming Magistrate Sessions</h3>
        <div className="bg-card/30 border border-border rounded-md p-4">
          {/* Mock upcoming sessions - in a real implementation this would come from a database */}
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border/50">
                <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Date</th>
                <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Time</th>
                <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Type</th>
                <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Defendant</th>
                <th className="py-2 px-1 text-[hsl(var(--police-blue))]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border/30">
                <td className="py-2 px-1 text-white">2023-09-20</td>
                <td className="py-2 px-1 text-white">14:00</td>
                <td className="py-2 px-1 text-white">Court Case</td>
                <td className="py-2 px-1 text-white">John Smith</td>
                <td className="py-2 px-1">
                  <span className="px-2 py-1 bg-green-900/50 text-green-200 rounded-md text-xs">CONFIRMED</span>
                </td>
              </tr>
              <tr className="border-t border-border/30">
                <td className="py-2 px-1 text-white">2023-09-21</td>
                <td className="py-2 px-1 text-white">10:30</td>
                <td className="py-2 px-1 text-white">Warrant Consultation</td>
                <td className="py-2 px-1 text-white">Jane Doe</td>
                <td className="py-2 px-1">
                  <span className="px-2 py-1 bg-amber-800/50 text-amber-200 rounded-md text-xs">PENDING</span>
                </td>
              </tr>
              <tr className="border-t border-border/30">
                <td className="py-2 px-1 text-white">2023-09-22</td>
                <td className="py-2 px-1 text-white">16:15</td>
                <td className="py-2 px-1 text-white">Court Case</td>
                <td className="py-2 px-1 text-white">Mike Johnson</td>
                <td className="py-2 px-1">
                  <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-md text-xs">REQUESTED</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MagistrateAvailability;
