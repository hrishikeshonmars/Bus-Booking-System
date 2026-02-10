# Bus Ticket Booking & Boarding Optimization System
<img width="1908" height="869" alt="Screenshot 2026-02-09 230209" src="https://github.com/user-attachments/assets/4f6fd842-e76c-40f8-8881-e34bf858cfb0" />

## 📌 Project Overview
A full-stack application designed for bus conductors to manage seat bookings and optimize passenger boarding sequences. The system focuses on minimizing total boarding time by enforcing a smart boarding order based on seat location.

## 🚀 Tech Stack
- **Backend:** Python (FastAPI), SQLAlchemy (ORM), SQLite (Database)
- **Frontend:** React.js, Tailwind CSS
- **Tools:** Axios (API Client)

## 🏗️ System Design & Architecture
The application follows a clean client-server architecture:
- **FastAPI Backend:** Handles business logic, data persistence, and the boarding optimization algorithm.
- **PostgreSQL/SQLite:** Stores booking records capable of handling concurrent requests (SQLite used for this demo).
- **React Frontend:** Provides a responsive interface for booking seats and viewing the boarding list.
- **Algorithm:** A custom sorting logic runs on the backend to determine the optimal boarding sequence.

## 🧠 Boarding Optimization Algorithm
**Problem:** Passengers boarding from the front gate block the aisle for subsequent passengers. If a passenger sits in the front (e.g., A1) first, they block passengers needing to reach the back (e.g., A15), causing cumulative delays (60s per passenger).

**Solution:**
We implement a **Reverse-Order Boarding Strategy**.
1. The bus is filled from the **back (Row 15)** to the **front (Row 1)**.
2. Passengers with seats in higher row numbers board first.
3. This ensures that a passenger settling into their seat never blocks someone who needs to go further back.

**Algorithm Complexity:** `O(N log N)` due to sorting bookings by their standardized "max row index".

## ⚙️ Setup & Execution Steps

### Prerequisites
- Python 3.8+
- Node.js & npm

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install fastapi uvicorn sqlalchemy pydantic
# (Optional) If using Postgres: pip install psycopg2-binary
# For this demo, no extra driver needed for SQLite.

# Run the server
uvicorn main:app --reload --port 8000
```
API will run at: `http://localhost:8000`
Docs at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
App will open at: `http://localhost:3000`

## 🧪 Testing the Flow
1. **Book a Ticket:**
   - Go to `Booking` tab.
   - Select Date & Mobile.
   - Pick seats (try back rows first or mixed).
   - Click "Confirm Booking".
2. **View Boarding List:**
   - Go to `Boarding List` tab.
   - Select the same Travel Date.
   - Verify that bookings are sorted by **Seat Row (Descending)**.
   - Example: A passenger in Row 15 will appear before a passenger in Row 1.

## ✅ Assumptions & Constraints
1. **Boarding Time:** 60s per passenger group.
2. **Blocking:** Front passengers block back passengers.
3. **Grouping:** All passengers in a single Booking ID board together.
4. **Gate:** Only front gate usage.
5. **Walking Time:** Negligible compared to settling time.
