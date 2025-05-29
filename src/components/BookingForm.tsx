
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Send } from 'lucide-react';
import { toast } from 'sonner';

const BookingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    eventType: '',
    date: '',
    time: '',
    guests: '',
    budget: '',
    customIdeas: '',
    extraNeeds: {
      catering: false,
      decoration: false,
      photography: false,
      music: false,
      security: false,
      transportation: false
    }
  });
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Corporate Event',
    'Anniversary',
    'Baby Shower',
    'Graduation Party',
    'Religious Ceremony',
    'Other'
  ];

  const handleExtraNeedChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      extraNeeds: {
        ...prev.extraNeeds,
        [need]: checked
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a booking request');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to save booking
      console.log('Booking submitted:', formData);
      
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking request submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please log in to book an event</p>
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-3xl text-gray-800">Book Your Event</CardTitle>
            <p className="text-gray-600">Tell us about your dream event and we'll make it happen</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-gray-700">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700">Event Type</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-700">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-gray-700">Event Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guests" className="text-gray-700">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    placeholder="e.g., 50"
                    value={formData.guests}
                    onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-gray-700">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="100"
                    placeholder="e.g., 5000"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700 mb-3 block">Extra Services Needed</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(formData.extraNeeds).map(([need, checked]) => (
                    <div key={need} className="flex items-center space-x-2">
                      <Checkbox
                        id={need}
                        checked={checked}
                        onCheckedChange={(checked) => handleExtraNeedChange(need, checked as boolean)}
                      />
                      <Label htmlFor={need} className="text-sm capitalize">
                        {need === 'photography' ? 'Photography/Videography' : need}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customIdeas" className="text-gray-700">Custom Ideas & Special Requests</Label>
                <Textarea
                  id="customIdeas"
                  placeholder="Describe any special requirements, themes, or ideas you have for your event..."
                  value={formData.customIdeas}
                  onChange={(e) => setFormData(prev => ({ ...prev, customIdeas: e.target.value }))}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                disabled={loading}
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Booking Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
