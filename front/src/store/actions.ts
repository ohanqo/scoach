import { Mutation } from "./reducers";
import { State } from "./state";
import TYPES from "./types";

export interface Actions {
    fetchCoach: () => void;
}

export const useActions = (
    state: State,
    dispatch: React.Dispatch<Mutation>,
): Actions => {
    function fetchCoach() {
        dispatch({ type: TYPES.INCREMENT });
    }

    return {
        fetchCoach,
    };
};
