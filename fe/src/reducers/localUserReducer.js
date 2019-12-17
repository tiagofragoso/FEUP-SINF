import { localUserTypes } from "../actions/localUserService";

const initialState = Object.freeze({
    loading: false,
    user: null,
    error: false,
});

export const LOCALSTORAGE_KEY = "sinfony-user-ls-key";

export default (state = initialState, action) => {
    switch (action.type) {
        case localUserTypes.CLEAR_LOCAL_USER:
            localStorage.removeItem(LOCALSTORAGE_KEY);
            return initialState;
        case localUserTypes.SET_LOCAL_USER:
            if (action.payload.rememberMe) {
                localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(action.payload.user));
            }
            return {
                ...state,
                user: action.payload.user,
            };
        case localUserTypes.CHECK_STORED_SESSION: {
            const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            if (user) {
                return {
                    ...state,
                    user,
                };
            } else {
                return state;
            }
        }
        default:
            return state;
    }
};
