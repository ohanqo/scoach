import pubsub from "sweet-pubsub";
import { Snackbar, Status } from "../components/SnackbarComponent";

const show = (snackbar: Snackbar) => pubsub.emit("snackbar", snackbar);

const success = (
    title: string,
    message?: string,
    duration = 2,
    status = Status.SUCCESS,
) => show({ title, message, duration, status });

const error = (
    title: string,
    message?: string,
    duration = 2,
    status = Status.ERROR,
) => show({ title, message, duration, status });

export default { show, error, success };
