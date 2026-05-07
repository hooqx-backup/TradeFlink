import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
