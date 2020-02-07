import User from "../models/User";

export interface State {
    user?: User;
}

export const initialState: State = {
    user: undefined,
};
