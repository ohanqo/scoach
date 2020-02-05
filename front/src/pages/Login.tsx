import React, { useContext } from "react";
import { StoreContext } from "../store/context";
import TYPES from "../store/types";

const Login: React.FC = () => {
    const { state, dispatch, actions } = useContext(StoreContext);

    return (
        <div>
            Coucou depuis le router: {state.count}
            <button onClick={() => dispatch({ type: TYPES.INCREMENT })}>
                Ajouter depuis dispatch
            </button>
            <button onClick={() => actions.fetchCoach()}>
                Ajouter depuis action
            </button>
        </div>
    );
};

export default Login;
