import React, { useState, useEffect } from 'react';
import BoardingTable from '../components/BoardingTable';
import { getBoardingList } from '../services/api';

const BoardingPage = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await getBoardingList(date);
                setBookings(response.data);
            } catch (err) {
                console.error(err);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [date]);

    const totalPassengers = bookings.reduce((acc, curr) => acc + curr.seats.length, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Boarding Manifest</h1>
                    <p className="text-slate-500 mt-2 font-medium">Optimal boarding sequence to minimize delays.</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <div className="px-4 border-r border-slate-200">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Date</span>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                        />
                    </div>
                    <div className="px-4">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Passengers</span>
                        <span className="text-xl font-bold text-blue-600">{totalPassengers}</span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Calculating optimal sequence...</p>
                </div>
            ) : (
                <div className="animate-fade-in-up">
                    <BoardingTable bookings={bookings} />
                </div>
            )}
        </div>
    );
};

export default BoardingPage;
