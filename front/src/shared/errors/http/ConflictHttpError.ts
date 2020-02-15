import { AxiosError } from "axios";
import { ERROR_DEFAULT_MESSAGE } from "../../constants";
import HttpError from "./AbstractHttpError";

export default class ConflictHttpError extends HttpError {
    public statusCode = 409;
    public error = "Conflict";
    public message = ERROR_DEFAULT_MESSAGE;

    constructor(private axiosError: AxiosError) {
        super();

        if (this.hasAnErrorMessage()) {
            this.message = this.potentialErrorMessage()!!;
        }
    }

    private hasAnErrorMessage(): boolean {
        return typeof this.potentialErrorMessage() === "string";
    }

    private potentialErrorMessage(): string | undefined {
        return this.axiosError.response?.data.message;
    }
}
