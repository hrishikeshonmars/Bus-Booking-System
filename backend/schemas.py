from pydantic import BaseModel
from datetime import date
from typing import List

class BookingCreate(BaseModel):
    travel_date: date
    mobile_number: str
    seats: List[str]

class BookingResponse(BookingCreate):
    id: str
    boarded: bool
