import { AxiosError } from "axios";
import { ERROR_DEFAULT_MESSAGE } from "../../constants";
import HttpError from "./AbstractHttpError";

export default class DefaultHttpError extends HttpError {
    constructor(private axiosError: AxiosError) {
        super();

        if (this.axiosError.response?.status)
            this.statusCode = this.axiosError.response?.status;

        if (this.axiosError.response?.data.error)
            this.error = this.axiosError.response.data.error;

        if (typeof this.axiosError.response?.data.message === "string")
            this.message = this.axiosError.response?.data.message;

        if (this.hasValidationError())
            this.message = this.getFirstValidationErrorMessage() as string;
    }

    private hasValidationError() {
        return (
            this.axiosError.response?.data.message[0].constraints !== undefined
        );
    }

    private getFirstValidationErrorMessage() {
        return (
            Object.values(
                this.axiosError.response?.data.message[0].constraints,
            )[0] ?? ERROR_DEFAULT_MESSAGE
        );
    }
}
