import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import pubsub from "sweet-pubsub";
import { Snackbar, Status } from "../components/SnackbarComponent";
import AuthService from "../services/AuthService";
import { StoreContext } from "../store/context";
import TYPES from "../store/types";

const Login: React.FC = () => {
    const history = useHistory();
    const { dispatch } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        setIsLoading(true);

        try {
            const {
                user,
                access_token,
            } = await AuthService.getInstance().login(email, password);
            localStorage.setItem("access_token", access_token);
            dispatch({ type: TYPES.SET_USER, payload: user });
        } catch (error) {
            // TODO: error
        }

        setIsLoading(false);
    };

    return (
        <div>
            <input
                type="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button disabled={isLoading} onClick={() => login()}>
                Connect
            </button>
            <button onClick={() => history.push("/register")}>Register</button>

            <div
                className="bg-blue-400"
                onClick={() => {
                    const snack: Snackbar = {
                        title: "I'm the title",
                        message: "The field %s is required",
                        duration: 2,
                        status: Status.ERROR,
                    };
                    pubsub.emit("snackbar", snack);
                }}
            >
                Snackbar
            </div>
        </div>
    );
};

export default Login;
