import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import { StoreContext } from "../store/context";
import TYPES from "../store/types";
import { isEmail } from "../utils/email";

const Login: React.FC = () => {
    const history = useHistory();
    const { dispatch } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

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

    useEffect(() => {
        setIsEmailValid(isEmail(email));
    }, [email]);

    return (
        <main className="w-screen h-screen py-4">
            <div className="h-full flex flex-col mx-16 justify-around">
                <header className="w-full text-center pt-8 pb-8">
                    <h2 className="antialiased text-gray-200 font-bold">
                        Sign in to Scoach
                    </h2>
                </header>

                <form>
                    <input
                        className="input text-xl text-gray-200 focus:outline-none mb-8"
                        type="email"
                        placeholder="email address"
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                    />

                    <input
                        className="hidden input text-xl focus:outline-none mb-8"
                        type="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        disabled={!isEmailValid}
                        className="block duration-500 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1"
                    >
                        Continue
                    </button>

                    <span className="text-gray-600 block text-center text-sm">
                        Does not have an account? Register
                        <span className="text-white"> here</span>
                    </span>
                </form>
            </div>
        </main>
    );
};

export default Login;
