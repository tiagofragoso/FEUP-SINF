import { salesTypes } from "../actions/salesActions";

const initialState = {
    sales_orders: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case salesTypes.SET_SALES_ORDERS:
            return {
                ...state,
                sales_orders: action.payload,
            };
        case salesTypes.SET_SALES_ORDERS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case salesTypes.SET_SALES_ORDERS_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
