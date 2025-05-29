
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, LogOut, Clock, DollarSign, Users, CheckCircle } from 'lucide-react';

interface Booking {
  id: string;
  eventType: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed';
  guests: number;
  budget: number;
  progress?: string;
}

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/login');
      return;
    }

    // Simulate fetching user bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        eventType: 'Wedding',
        date: '2024-07-15',
        status: 'in-progress',
        guests: 150,
        budget: 25000,
        progress: 'Venue booked, catering confirmed'
      },
      {
        id: '2',
        eventType: 'Birthday Party',
        date: '2024-06-20',
        status: 'completed',
        guests: 30,
        budget: 2000
      },
      {
        id: '3',
        eventType: 'Corporate Event',
        date: '2024-08-10',
        status: 'pending',
        guests: 80,
        budget: 8000
      }
    ];
    setBookings(mockBookings);
  }, [user, navigate]);

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

  const handlePayment = (bookingId: string) => {
    // Simulate payment process
    window.open('https://checkout.stripe.com/demo', '_blank');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">EventPro</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <Link to="/book">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your event bookings and track their progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{bookings.length}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {bookings.filter(b => b.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {bookings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                ${bookings.reduce((sum, b) => sum + b.budget, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Bookings</h2>
          
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-4">Start planning your first event!</p>
                <Link to="/book">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Booking
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-800">{booking.eventType}</CardTitle>
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
                      ${booking.budget.toLocaleString()} budget
                    </div>
                  </div>
                  
                  {booking.progress && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Progress:</strong> {booking.progress}
                      </p>
                    </div>
                  )}

                  {booking.status === 'accepted' || booking.status === 'in-progress' ? (
                    <Button 
                      onClick={() => handlePayment(booking.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Make Payment
                    </Button>
                  ) : booking.status === 'completed' ? (
                    <div className="text-green-600 font-medium">
                      ✓ Event completed successfully!
                    </div>
                  ) : (
                    <div className="text-yellow-600 font-medium">
                      ⏳ Waiting for admin review
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
