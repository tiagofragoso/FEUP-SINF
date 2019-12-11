import { purchasesTypes } from "../actions/purchasesActions";

const initialState = {
    purchase_orders: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case purchasesTypes.SET_PURCHASE_ORDERS:
            return {
                ...state,
                purchase_orders: action.payload,
            };
        case purchasesTypes.SET_PURCHASE_ORDERS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case purchasesTypes.SET_PURCHASE_ORDERS_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
