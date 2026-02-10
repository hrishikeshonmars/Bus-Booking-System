from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Booking, Base
from schemas import BookingCreate
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for simplicity in assessment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/book")
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):

    # Rule 1: max 6 seats
    if len(data.seats) > 6:
        raise HTTPException(400, "Max 6 seats allowed")

    # Rule 2: same mobile, same day limit
    existing = db.query(Booking).filter(
        Booking.travel_date == data.travel_date,
        Booking.mobile_number == data.mobile_number
    ).all()

    booked_seats = sum(len(b.seats) for b in existing)
    if booked_seats + len(data.seats) > 6:
        raise HTTPException(400, "Seat limit exceeded for this mobile")

    # Rule 3: seat availability
    all_bookings = db.query(Booking).filter(
        Booking.travel_date == data.travel_date
    ).all()

    occupied = set()
    for b in all_bookings:
        occupied.update(b.seats)

    for seat in data.seats:
        if seat in occupied:
            raise HTTPException(400, f"Seat {seat} already booked")

    booking = Booking(**data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


@app.get("/boarding/{travel_date}")
def boarding_list(travel_date: date, db: Session = Depends(get_db)):
    bookings = db.query(Booking).filter(
        Booking.travel_date == travel_date
    ).all()

    from services.boarding_optimizer import optimize_boarding
    return optimize_boarding(bookings)
