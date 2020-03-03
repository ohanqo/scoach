import React, { ReactNode, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Coach from "../../Coach/Coach";
import Course from "../../Course/Course";
import Overview from "../../Overview/Overview";

const NavbarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    type Props = {
        children: ReactNode;
        to: string;
    };

    const NavbarLink = ({ children, to }: Props) => {
        return (
            <Link
                to={to}
                className="no-underline text-lg block mt-4 sm:inline-block sm:mt-0 text-gray-300 mr-10 last:mr-0"
            >
                {children}
            </Link>
        );
    };

    return (
        <>
            <header className="flex flex-wrap items-center justify-between text-white mx-5 my-2">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 block"
                        src="/assets/images/logo.svg"
                        alt="Scoach logo"
                    />

                    <span className="block font-bold text-xl tracking-wide ml-2">
                        Scoach
                    </span>
                </Link>

                <div className="block sm:hidden">
                    <button
                        className="flex focus:outline-none hover:border-white items-center text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="fill-current h-6 w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div
                    className={`w-full flex-grow sm:flex sm:items-center sm:w-auto ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <div className="text-sm sm:mx-auto">
                        <NavbarLink to="/">Overview</NavbarLink>
                        <NavbarLink to="/courses">Courses</NavbarLink>
                        <NavbarLink to="/coachs">Coachs</NavbarLink>
                    </div>

                    <div>
                        <a
                            href="#"
                            className="flex items-center no-underline text-lg text-sm text-gray-300 leading-none rounded mt-4 sm:mt-0"
                        >
                            <img
                                className="bg-gray-300 h-6 w-6 rounded-full"
                                src=""
                                alt=""
                            />
                            <span className="ml-2">Profile</span>
                        </a>
                    </div>
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={Overview} />
                <Route exact path="/coachs" component={Coach} />
                <Route exact path="/courses" component={Course} />
            </Switch>
        </>
    );
};

export default NavbarComponent;
