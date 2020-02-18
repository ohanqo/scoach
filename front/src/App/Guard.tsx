import React, { useContext, useEffect, useState } from "react";
import { LS_TOKEN_KEY } from "../shared/constants";
import { AUTH_HTTP } from "../shared/http";
import User from "../shared/models/User";
import router from "../shared/router";
import { StoreContext } from "../shared/store/context";
import TYPES from "../shared/store/types";

const Guard: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(StoreContext);

    useEffect(() => {
        const tryToGetUser = async () => {
            try {
                const response = await AUTH_HTTP.get<User>("me");
                const user = response.data;
                context.dispatch({ type: TYPES.SET_USER, payload: user });
                setIsLoading(false);
            } catch (error) {}
        };

        const token = localStorage.getItem(LS_TOKEN_KEY);

        if (token) {
            if (context.state.user) {
                setIsLoading(false);
            } else {
                tryToGetUser();
            }
        } else {
            router.replace("login");
        }
    }, [context]);

    return <>{isLoading ? null : children}</>;
};

export default Guard;
