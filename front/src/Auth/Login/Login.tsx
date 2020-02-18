import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { LS_TOKEN_KEY } from "../../shared/constants";
import { httpWrapper } from "../../shared/http";
import { StoreContext } from "../../shared/store/context";
import TYPES from "../../shared/store/types";
import { isEmail } from "../../shared/utils/validations";
import AuthService from "../AuthService";

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

        httpWrapper(async () => {
            const {
                user,
                access_token,
            } = await AuthService.getInstance().login(email, password);
            localStorage.setItem(LS_TOKEN_KEY, access_token);
            dispatch({ type: TYPES.SET_USER, payload: user });
            history.replace("/");
        });

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
                .to(
                    "#email",
                    { xPercent: "-100", opacity: "0", ease: "power3.inOut" },
                    ".25",
                )
                .fromTo(
                    "#password",
                    { opacity: "0" },
                    { xPercent: "-100", opacity: "100%", ease: "power3.inOut" },
                    "-=.20",
                )
                .then(() => {
                    (passwordRef as any)?.current?.focus();
                });
        } else {
            gsap.timeline()
                .to(
                    "#password",
                    { xPercent: "100", opacity: "0", ease: "power3.inOut" },
                    ".25",
                )
                .to(
                    "#email",
                    { xPercent: "0", opacity: "100%", ease: "power3.inOut" },
                    "-=.20",
                )
                .then(() => {
                    (emailRef as any)?.current?.focus();
                });
        }
    }, [isShowingPassword]);

    const handleEmailKeyUp = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.key === "Enter" && isEmailValid && !isShowingPassword) {
            setIsShowingPassword(true);
        }
    };

    const handlePasswordKeyUp = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.key === "Enter" && isPasswordValid && isShowingPassword) {
            login();
        }
    };

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
                            onKeyUp={(event: any) => handleEmailKeyUp(event)}
                            onKeyDown={(event: any) =>
                                event.which === 9 && event.preventDefault()
                            }
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
                                onKeyUp={(event: any) => {
                                    handlePasswordKeyUp(event);
                                }}
                                ref={passwordRef}
                            />
                            <button
                                type="button"
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
                            type="button"
                            disabled={!isPasswordValid || isLoading}
                            className="block duration-300 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none"
                            key="emailButton"
                            onClick={e => {
                                e.preventDefault();
                                login();
                            }}
                        >
                            {isLoading ? (
                                <i className="fas fa-circle-notch fa-spin" />
                            ) : (
                                "Let's go"
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={!isEmailValid}
                            className="block duration-300 ease-in-out capitalize text-gray-200 text-xl px-4 py-2 rounded-lg bg-primary-400 disabled:opacity-25 mb-16 w-full opacity-100 transition-all transform hover:-translate-y-1 focus:outline-none"
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
                        <span
                            className="text-white cursor-pointer"
                            onClick={() => history.push("/register")}
                        >
                            {" "}
                            here
                        </span>
                    </span>
                </form>
            </div>
        </main>
    );
};

export default Login;
