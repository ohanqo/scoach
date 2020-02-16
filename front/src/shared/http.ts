import axios, { AxiosError } from "axios";
import {
    ERROR_DEFAULT_MESSAGE,
    LS_TOKEN_KEY,
    SHARED_ERROR_INVALID_TOKEN,
} from "./constants";
import HttpError from "./errors/http/AbstractHttpError";
import HttpErrorFactory from "./errors/http/HttpErrorFactory";
import router from "./router";
import snackbar from "./utils/snackbar";

export const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    transformRequest: [(data, _) => JSON.stringify(data)],
});

HTTP.interceptors.response.use(
    response => response,
    error => Promise.reject(HttpErrorFactory(error)),
);

export const AUTH_HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    transformRequest: [
        (data, headers) => {
            const token = localStorage.getItem(LS_TOKEN_KEY);
            headers.Authorization = `Bearer ${token}`;

            if (data instanceof FormData) {
                return data;
            } else {
                return JSON.stringify(data);
            }
        },
    ],
});

AUTH_HTTP.interceptors.response.use(
    response => response,
    error => Promise.reject(handleAuthError(error)),
);

const handleAuthError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem(LS_TOKEN_KEY);
        router.replace("/login");
        snackbar.error(SHARED_ERROR_INVALID_TOKEN);
    }

    return HttpErrorFactory(error);
};

export async function httpWrapper(fun: () => void) {
    try {
        return await fun()
    } catch (error) {
        console.warn(error);

        if (error instanceof HttpError) {
            snackbar.error(error.message);
        } else {
            snackbar.error(ERROR_DEFAULT_MESSAGE);
        }
    }
}
