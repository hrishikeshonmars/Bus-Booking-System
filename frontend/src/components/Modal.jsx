import React from 'react';

const Modal = ({ show, onClose, booking }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40 transition-opacity">
            <div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm transform transition-all scale-100 animate-bounce-short border border-white/20 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
                    <p className="text-slate-500 text-sm mt-1">Your seats have been reserved successfully.</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-6 border border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Booking ID</span>
                        <span className="font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm text-xs">
                            {booking.id?.slice(0, 8)}...
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Date</span>
                        <span className="font-bold text-slate-800">{booking.travel_date}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Mobile</span>
                        <span className="font-bold text-slate-800">{booking.mobile_number}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Seats Reserved</div>
                        <div className="flex flex-wrap gap-2">
                            {booking.seats?.map(seat => (
                                <span key={seat} className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                    {seat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-black hover:shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default Modal;
