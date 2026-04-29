import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import useAuthStore from './store/useAuthStore';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import TrustIndicators from './components/TrustIndicators';
import AboutUs from './components/AboutUs';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import Marketplace from './components/Marketplace';
import Directory from './components/Directory';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import CompanyProfile from './pages/dashboard/CompanyProfile';
import MyListings from './pages/dashboard/MyListings';
import CreateListing from './pages/dashboard/CreateListing';

function HomePage() {
  return (
    <main>
      <Hero />
      <TrustIndicators />
      <Marketplace />
      <Directory />
      <Services />
      <AboutUs />
      <InquiryForm />
    </main>
  );
}

function App() {
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-orange selection:text-white flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/company" element={<CompanyProfile />} />
            <Route path="/dashboard/listings" element={<MyListings />} />
            <Route path="/dashboard/listings/new" element={<CreateListing />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

