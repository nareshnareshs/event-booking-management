
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import Signup from '../components/Signup';
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import BookingForm from '../components/BookingForm';
import { AuthProvider } from '../contexts/AuthContext';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/book" element={<BookingForm />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
