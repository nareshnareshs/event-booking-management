
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, DollarSign, CheckCircle, Clock, LogOut, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  userName: string;
  userEmail: string;
  eventType: string;
  date: string;
  guests: number;
  budget: number;
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed';
  extraNeeds: string[];
  customIdeas: string;
  progress?: string;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Simulate fetching all bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        userName: 'Sarah Johnson',
        userEmail: 'sarah@email.com',
        eventType: 'Wedding',
        date: '2024-07-15',
        guests: 150,
        budget: 25000,
        status: 'in-progress',
        extraNeeds: ['catering', 'decoration', 'photography'],
        customIdeas: 'Outdoor garden theme with fairy lights',
        progress: 'Venue booked, catering confirmed'
      },
      {
        id: '2',
        userName: 'Michael Chen',
        userEmail: 'michael@email.com',
        eventType: 'Corporate Event',
        date: '2024-08-10',
        guests: 80,
        budget: 8000,
        status: 'pending',
        extraNeeds: ['catering', 'music'],
        customIdeas: 'Professional networking event with product showcase'
      },
      {
        id: '3',
        userName: 'Emily Davis',
        userEmail: 'emily@email.com',
        eventType: 'Birthday Party',
        date: '2024-06-25',
        guests: 30,
        budget: 2000,
        status: 'accepted',
        extraNeeds: ['decoration'],
        customIdeas: 'Princess themed party for 5-year-old'
      }
    ];
    setBookings(mockBookings);
  }, [user, navigate]);

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus as any }
          : booking
      )
    );
    toast.success(`Booking ${newStatus} successfully`);
  };

  const updateBookingProgress = (bookingId: string, progress: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, progress }
          : booking
      )
    );
    toast.success('Progress updated successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings
      .filter(b => b.status === 'completed' || b.status === 'in-progress')
      .reduce((sum, b) => sum + b.budget, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">EventPro Admin</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all event bookings and track business metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Management */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Booking Requests</h2>
          
          {bookings.map((booking) => (
            <Card key={booking.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-800">
                      {booking.eventType} - {booking.userName}
                    </CardTitle>
                    <p className="text-gray-600">{booking.userEmail}</p>
                    <p className="text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {booking.guests} guests
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ${booking.budget.toLocaleString()}
                  </div>
                </div>

                {booking.extraNeeds.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Extra Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.extraNeeds.map(need => (
                        <Badge key={need} variant="secondary" className="capitalize">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {booking.customIdeas && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Custom Ideas:</p>
                    <p className="text-sm text-gray-600">{booking.customIdeas}</p>
                  </div>
                )}

                {booking.progress && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Progress:</p>
                    <p className="text-sm text-gray-600">{booking.progress}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        onClick={() => updateBookingStatus(booking.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Accept
                      </Button>
                      <Button 
                        onClick={() => updateBookingStatus(booking.id, 'rejected')}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {booking.status === 'accepted' && (
                    <Button 
                      onClick={() => updateBookingStatus(booking.id, 'in-progress')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Start Planning
                    </Button>
                  )}

                  {booking.status === 'in-progress' && (
                    <Button 
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Mark Complete
                    </Button>
                  )}

                  <Button 
                    onClick={() => setSelectedBooking(booking)}
                    variant="outline"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
