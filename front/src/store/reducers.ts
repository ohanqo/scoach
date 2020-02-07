import { State } from "./state";
import TYPES from "./types";

export interface Mutation {
    type: Symbol;
    payload?: any;
}
export const reducer = (state: State, mutation: Mutation): State => {
    switch (mutation.type) {
        case TYPES.SET_USER:
            return { ...state, user: mutation.payload };
        default:
            return state;
    }
};
