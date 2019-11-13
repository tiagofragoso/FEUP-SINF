import { loginTypes } from "../actions/loginActions";

const initialState = {
    access_token: null,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case loginTypes.SET_LOGIN_TOKEN:
            return {
                ...state,
                error: false,
                access_token: action.payload,
            };
        case loginTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};
