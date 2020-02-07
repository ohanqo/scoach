import React, { createContext, useReducer } from "react";
import { Mutation, reducer } from "./reducers";
import { initialState, State } from "./state";

interface StoreContext {
    state: State;
    dispatch: React.Dispatch<Mutation>;
}

let StoreContext = createContext<StoreContext>({
    state: initialState,
    dispatch: () => {},
});

const StoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };
