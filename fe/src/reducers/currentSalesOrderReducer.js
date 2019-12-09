import { currentSalesOrderTypes } from "../actions/currentSalesOrderActions";

const initialState = {
    order: null,
    items: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER:
            return {
                ...state,
                order: action.payload,
                items: {
                    shipped: action.payload.documentLines
                        .map((item) => ({
                            ...item,
                            quantity: item.deliveredQuantity,
                        }))
                        .filter((item) => item.quantity > 0),
                    not_shipped: action.payload.documentLines
                        .map((item) => ({
                            ...item,
                            quantity: item.quantity - item.deliveredQuantity,
                        }))
                        .filter((item) => item.quantity > 0),
                },
            };
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_LOADING:
            return {
                // Spreading initialState instead of state to reset previous success or error data
                ...(action.payload ? initialState : state),
                loading: action.payload,
            };
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
