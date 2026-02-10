import React, { useState, useEffect } from 'react';
import SeatGrid from '../components/SeatGrid';
import Modal from '../components/Modal';
import { createBooking, getBoardingList } from '../services/api';

const BookingPage = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [mobile, setMobile] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch booked seats when date changes
    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await getBoardingList(date);
                // response.data is array of bookings
                const seats = response.data.flatMap(b => b.seats);
                setBookedSeats(seats);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            }
        };
        if (date) fetchBookedSeats();
    }, [date]);

    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prev => prev.filter(s => s !== seat));
        } else {
            if (selectedSeats.length >= 6) {
                alert("Maximum 6 seats allowed per booking.");
                return;
            }
            setSelectedSeats(prev => [...prev, seat]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!mobile.match(/^[0-9]{10}$/)) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }
        if (selectedSeats.length === 0) {
            setError("Please select at least one seat");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                travel_date: date,
                mobile_number: mobile,
                seats: selectedSeats
            };

            const response = await createBooking(payload);
            setConfirmedBooking(response.data);
            setShowModal(true);

            // Refresh booked seats
            setBookedSeats(prev => [...prev, ...selectedSeats]);
            setSelectedSeats([]);
            setMobile('');
        } catch (err) {
            setError(err.response?.data?.detail || "Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Column: Form & Info */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="text-blue-600">📍</span> Trip Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Travel Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Passenger Mobile</label>
                                <div className="flex rounded-lg shadow-sm">
                                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-sm font-mono font-medium">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="98765 43210"
                                        className="rounded-none rounded-r-lg bg-white border border-slate-200 text-slate-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full p-3 font-mono text-lg tracking-wide placeholder:text-slate-300 transition-all"
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Selected Seats Card */}
                            <div className={`p-4 rounded-xl border-2 border-dashed transition-all ${selectedSeats.length > 0 ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-500">Selected Seats</span>
                                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-slate-500 shadow-sm">{selectedSeats.length}/6</span>
                                </div>

                                {selectedSeats.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSeats.map(seat => (
                                            <span key={seat} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm animate-pulse-short">
                                                {seat}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm italic">No seats selected yet.</p>
                                )}
                            </div>

                            {error && (
                                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500 shadow-sm" role="alert">
                                    <span className="font-bold">Error:</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 text-lg
                      ${loading
                                        ? 'bg-slate-400 cursor-not-allowed scale-100'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:-translate-y-1 hover:shadow-xl active:scale-95'}
                  `}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                        <h3 className="font-bold text-blue-900 mb-2">🚌 Boarding Policy</h3>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside opacity-80">
                            <li>Max 6 seats per booking per day.</li>
                            <li>Please arrive 10 mins before boarding.</li>
                            <li>Boarding starts from the rear seats.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Seat Map */}
                <div className="lg:col-span-7 pl-6">
                    <div className="sticky top-24">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Select Your Seats</h2>
                            <p className="text-slate-500">Front of the bus is at the top</p>
                        </div>
                        <SeatGrid
                            bookedSeats={bookedSeats}
                            selectedSeats={selectedSeats}
                            onSelect={handleSeatSelect}
                        />
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                booking={confirmedBooking || {}}
            />
        </div>
    );
};

export default BookingPage;
