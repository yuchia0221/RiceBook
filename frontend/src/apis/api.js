import axios from "axios";

export default axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://ricebook-backend-final.herokuapp.com/"
            : "http://localhost:4000/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
    },
    withCredentials: true,
});

export const apiImage = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://ricebook-backend-final.herokuapp.com/"
            : "http://localhost:4000/",
    headers: {
        Accept: "application/json",
        headers: { "Content-Type": "multipart/form-data" },
    },
    withCredentials: true,
});
