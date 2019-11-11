import { quoteTypes } from "../actions/quoteActions";

const initialState = {
    loading: false,
    items: [],
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case quoteTypes.ADD_QUOTE:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case quoteTypes.SET_QUOTE_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case quoteTypes.SET_QUOTE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
