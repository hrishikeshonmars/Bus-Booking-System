import React from 'react';

const SeatGrid = ({ bookedSeats, selectedSeats, onSelect }) => {
    const isBooked = (seat) => bookedSeats.includes(seat);
    const isSelected = (seat) => selectedSeats.includes(seat);

    // Helper to render a seat button
    const renderSeat = (seatStr) => {
        const booked = isBooked(seatStr);
        const selected = isSelected(seatStr);

        return (
            <button
                key={seatStr}
                disabled={booked}
                onClick={() => onSelect(seatStr)}
                className={`
          relative w-12 h-14 rounded-t-xl rounded-b-lg border-2 shadow-sm transition-all duration-200 flex items-center justify-center font-bold text-sm
          ${booked
                        ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-60"
                        : selected
                            ? "bg-blue-600 border-blue-700 text-white shadow-lg -translate-y-1 scale-105 z-10"
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
                    }
        `}
                title={booked ? "Booked" : `Select ${seatStr}`}
            >
                {/* Headrest line */}
                <div className={`absolute top-2 w-8 h-1 rounded-full opacity-20 ${selected ? 'bg-white' : 'bg-slate-400'}`}></div>
                <span className="mt-2">{seatStr}</span>
            </button>
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-md mx-auto relative overflow-hidden">
            {/* Driver Area */}
            <div className="absolute top-4 right-6 text-slate-300 transform rotate-[-90deg]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-mono uppercase tracking-widest ml-1">Driver</span>
            </div>

            <div className="mt-12 space-y-3 max-h-[600px] overflow-y-auto seat-grid-scroll pr-2">
                {/* Front Label */}
                <div className="w-full text-center mb-4">
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Front of Bus
                    </span>
                </div>

                {[...Array(15)].map((_, i) => {
                    const row = i + 1;
                    return (
                        <div key={row} className="flex items-center justify-between gap-6 px-2">
                            {/* Left Side (A, B) */}
                            <div className="flex gap-3">
                                {["A", "B"].map(col => renderSeat(`${col}${row}`))}
                            </div>

                            {/* Aisle Number */}
                            <div className="text-xs font-mono text-slate-300 font-semibold w-6 text-center">
                                {row}
                            </div>

                            {/* Right Side (C, D) */}
                            <div className="flex gap-3">
                                {["C", "D"].map(col => renderSeat(`${col}${row}`))}
                            </div>
                        </div>
                    );
                })}

                {/* Back Label */}
                <div className="w-full text-center mt-6 mb-2">
                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                        Rear
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center gap-6 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-slate-200 rounded text-center leading-none"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded shadow-sm"></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded border border-slate-300"></div>
                    <span>Booked</span>
                </div>
            </div>
        </div>
    );
};

export default SeatGrid;
