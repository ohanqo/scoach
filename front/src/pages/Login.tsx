import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
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
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef(null);

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

    useEffect(() => {
        setIsPasswordValid(password.length > 5);
    }, [password]);

    useEffect(() => {
        if (isShowingPassword) {
            gsap.timeline()
                .to("#email", { xPercent: "-100", opacity: "0" }, ".25")
                .fromTo(
                    "#password",
                    { opacity: "0" },
                    { xPercent: "-100", opacity: "100%" },
                    "-=.20",
                )
                .then(() => {
                    (passwordRef as any)?.current?.focus();
                });
        } else {
            gsap.timeline()
                .to("#password", { xPercent: "100", opacity: "0" }, ".25")
                .to("#email", { xPercent: "0", opacity: "100%" }, "-=.20")
                .then(() => {
                    (emailRef as any)?.current?.focus();
                });
        }
    }, [isShowingPassword]);

    return (
        <main className="w-screen h-screen py-4">
            <div className="h-full flex flex-col mx-16 justify-around">
                <header className="w-full text-center pt-8 pb-8">
                    <img
                        src="/assets/images/logo.svg"
                        alt="SCOACH Logo"
                        className="h-24 mx-auto mb-2"
                    />
                    <h2 className="antialiased text-gray-200 font-bold">
                        Sign in to Scoach
                    </h2>
                </header>

                <form>
                    <div className="flex relative overflow-hidden">
                        <input
                            id="email"
                            className="input flex-parent relative text-xl text-gray-200 focus:outline-none mb-8"
                            type="email"
                            placeholder="email address"
                            key="email"
                            onChange={e => setEmail(e.target.value)}
                            ref={emailRef}
                            autoFocus
                        />

                        <div
                            id="password"
                            className="flex relative flex-parent border-b border-gray-600 mb-8"
                        >
                            <input
                                className="input border-none text-xl text-gray-200 focus:outline-none"
                                type="password"
                                placeholder="password"
                                key="password"
                                onChange={e => setPassword(e.target.value)}
                                ref={passwordRef}
                            />
                            <button
                                className="whitespace-no-wrap text-sm text-gray-200 focus:outline-none"
                                onClick={e => {
                                    e.preventDefault();
                                    setIsShowingPassword(false);
                                }}
                            >
                                go back
                            </button>
                        </div>
                    </div>

                    {isShowingPassword ? (
                        <button
                            disabled={!isPasswordValid}
                            className="block duration-500 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none"
                            key="emailButton"
                            onClick={e => {
                                e.preventDefault();
                                // call
                            }}
                        >
                            Let's go
                        </button>
                    ) : (
                        <button
                            disabled={!isEmailValid}
                            className="block duration-500 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none"
                            key="emailButton"
                            onClick={e => {
                                e.preventDefault();
                                setIsShowingPassword(true);
                            }}
                        >
                            Continue
                        </button>
                    )}

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
