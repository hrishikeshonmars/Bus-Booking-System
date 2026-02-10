def seat_row(seat: str) -> int:
    # "A15" -> 15
    return int(seat[1:])

def optimize_boarding(bookings):
    return sorted(
        bookings,
        key=lambda b: max(seat_row(seat) for seat in b.seats),
        reverse=True
    )
