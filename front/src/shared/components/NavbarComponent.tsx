import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Coach from "../../Coach/Coach";
import Course from "../../Course/Course";
import CustomerDetail from "../../Customer/CustomerDetail/CustomerDetail";
import CustomerList from "../../Customer/CustomerList/CustomerList";
import EditProfile from "../../EditProfile/EditProfile";
import Overview from "../../Overview/Overview";
import { LS_TOKEN_KEY } from "../constants";
import { Role } from "../models/User";
import { StoreContext } from "../store/context";

const NavbarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { state } = useContext(StoreContext);
    const history = useHistory();
    const location = useLocation();

    type Props = {
        children: ReactNode;
        to: string;
    };

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location]);

    const disconnect = () => {
        localStorage.removeItem(LS_TOKEN_KEY);
        history.replace("/login");
    };

    const NavbarLink = ({ children, to }: Props) => {
        const isCurrentRoute = location.pathname === to;

        return (
            <Link
                to={to}
                className={`no-underline text-lg block mt-4 sm:inline-block sm:mt-0 text-gray-300 mr-10 opacity-75 last:mr-0 ${
                    isCurrentRoute ? "opacity-100" : ""
                }`}
            >
                {children}
            </Link>
        );
    };

    const Dropdown = (
        <div className="absolute right-0 mt-2 py-2 rounded-lg shadow-xl flex flex-col text-gray-800 bg-gray-200 w-full sm:w-40">
            <Link
                to="/profile"
                className="z-20 hover:text-primary-400 cursor-pointer transition-all duration-300 block px-4 py-2"
            >
                Edit
            </Link>
            <span
                onClick={() => disconnect()}
                className="z-20 hover:text-primary-400 cursor-pointer transition-all duration-300 block px-4 py-2"
            >
                Disconnect
            </span>
        </div>
    );

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
                        {state.user?.role === Role.CUSTOMER ? (
                            <NavbarLink to="/coachs">Coachs</NavbarLink>
                        ) : (
                            <NavbarLink to="/customers">Customers</NavbarLink>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center no-underline text-lg text-sm text-gray-300 leading-none rounded mt-4 sm:mt-0 focus:outline-none"
                        >
                            <span>{state.user?.name}</span>
                            <img
                                className="bg-gray-300 h-6 w-6 rounded ml-2 mr-1"
                                src={
                                    state.user?.picture
                                        ? `${process.env.REACT_APP_BASE_URL}/${state.user?.picture}`
                                        : "#"
                                }
                                alt=""
                            />
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                            </svg>
                        </button>

                        {isDropdownOpen ? Dropdown : null}
                    </div>
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={Overview} />
                {state.user?.role === Role.CUSTOMER ? (
                    <Route exact path="/coachs" component={Coach} />
                ) : (
                    <>
                        <Route
                            exact
                            path="/customers"
                            component={CustomerList}
                        />
                        <Route
                            exact
                            path="/customers/:id"
                            component={CustomerDetail}
                        />
                    </>
                )}
                <Route exact path="/courses" component={Course} />
                <Route exact path="/profile" component={EditProfile} />
            </Switch>
        </>
    );
};

export default NavbarComponent;
