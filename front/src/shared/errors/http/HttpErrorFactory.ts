import { AxiosError } from "axios";
import HttpError from "./AbstractHttpError";
import ConflictHttpError from "./ConflictHttpError";
import DefaultHttpError from "./DefaultHttpError";

export default function HttpErrorFactory(error: AxiosError): HttpError {
    const statusCode = error.response?.status;

    switch (statusCode) {
        case 409:
            return new ConflictHttpError(error);
        default:
            return new DefaultHttpError(error);
    }
}
