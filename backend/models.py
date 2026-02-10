from sqlalchemy import Column, String, Date, Boolean, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    travel_date = Column(Date, nullable=False)
    mobile_number = Column(String, nullable=False)
    seats = Column(JSON, nullable=False)  # ["A1", "A2"]
    boarded = Column(Boolean, default=False)
