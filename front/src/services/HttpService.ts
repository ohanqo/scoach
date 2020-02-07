import axios from "axios";

export const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const AUTH_HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    transformRequest: [
        (data, headers) => {
            headers.Authorization = `Bearer ${localStorage.getItem(
                "access_token",
            )}`;

            return data;
        },
    ],
});
