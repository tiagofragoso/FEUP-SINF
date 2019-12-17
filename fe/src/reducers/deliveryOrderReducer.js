import { deliveryOrderTypes } from "../actions/deliveryOrderActions";

const initialState = {
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case deliveryOrderTypes.SET_DELIVERY_ORDER_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case deliveryOrderTypes.SET_DELIVERY_ORDER_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
