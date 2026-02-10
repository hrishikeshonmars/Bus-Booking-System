import React from 'react';

const BoardingTable = ({ bookings }) => {
    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <span className="text-4xl mb-4">🚍</span>
                <p className="text-lg font-medium">No passengers found for this date.</p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100">
                <thead>
                    <tr className="bg-slate-50">
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Seq</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Booking ID</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Seats</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Contact</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 bg-white">
                    {bookings.map((booking, index) => (
                        <tr
                            key={booking.id}
                            className="hover:bg-blue-50/50 transition-colors group"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-400' : 'bg-slate-100 text-slate-600'}
                `}>
                                    {index + 1}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded select-all">
                                    {booking.id.slice(0, 8)}...
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {booking.seats.map(seat => (
                                        <span key={seat} className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-blue-200">
                                            {seat}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                    href={`tel:${booking.mobile_number}`}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group-hover:underline decoration-blue-500 decoration-2 underline-offset-2"
                                >
                                    <span>📞</span> {booking.mobile_number}
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                    className={`
                    px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase shadow-sm transition-all
                    active:scale-95 border
                    bg-white border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600 hover:shadow-md
                  `}
                                    onClick={() => alert("Marked boarded! (Feature pending backend update)")}
                                >
                                    Mark Boarded
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardingTable;
