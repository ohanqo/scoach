import React, { Context, createContext, useReducer } from "react";
import { Actions, useActions } from "./actions";
import { Mutation, reducer } from "./reducers";
import { initialState, State } from "./state";

interface StateWithActions {
    state: State;
    actions: Actions;
    dispatch: React.Dispatch<Mutation>;
}

let StoreContext: Context<StateWithActions>;

const StoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = useActions(state, dispatch);

    StoreContext = createContext<StateWithActions>({
        state: initialState,
        actions,
        dispatch,
    });

    return (
        <StoreContext.Provider value={{ state, actions, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };
