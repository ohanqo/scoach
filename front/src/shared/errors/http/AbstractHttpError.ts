import {
    ERROR_DEFAULT_CODE,
    ERROR_DEFAULT_ERROR,
    ERROR_DEFAULT_MESSAGE,
} from "../../constants";

export default abstract class HttpError {
    public statusCode = ERROR_DEFAULT_CODE;
    public error = ERROR_DEFAULT_ERROR;
    public message = ERROR_DEFAULT_MESSAGE;
}
