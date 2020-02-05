import { State } from "./state";
import TYPES from "./types";

export interface Mutation {
    type: Symbol;
    payload?: any;
}
export const reducer = (state: State, mutation: Mutation): State => {
    switch (mutation.type) {
        case TYPES.INCREMENT:
            let { count } = state;
            return { ...state, count: count += 1 };
        default:
            return state;
    }
};
