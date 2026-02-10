import React, { useState } from 'react';
import BookingPage from './pages/BookingPage';
import BoardingPage from './pages/BoardingPage';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚌</span>
              <span className="font-bold text-xl tracking-tight text-blue-900">myPaisaa <span className="text-blue-600">Bus</span></span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeTab === 'booking'
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                Book a Seat
              </button>
              <button
                onClick={() => setActiveTab('boarding')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeTab === 'boarding'
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                Boarding List
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 flex-grow">
        {activeTab === 'booking' ? <BookingPage /> : <BoardingPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 myPaisaa Assessment. Submitted by Hrishikesh K A.</p>
      </footer>
    </div>
  );
}

export default App;
