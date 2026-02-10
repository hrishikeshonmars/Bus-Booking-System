import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

export const createBooking = (data) => API.post("/book", data);
export const getBoardingList = (date) => API.get(`/boarding/${date}`);
// Optional: Boarded status update if we add that feature
// export const markBoarded = (id) => API.patch(`/board/${id}`);
