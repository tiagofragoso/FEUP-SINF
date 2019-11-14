import { currentSalesOrderTypes } from "../actions/currentSalesOrderActions";

const initialState = {
    order: null,
    items: {
        picked: [
            {
                salesItem: "IT_123",
                description: "The quick brown fox jumps over the lazy Web API",
                quantity: 1,
                lineExtensionAmount: {
                    amount: 1001,
                },
            },

        ],
    },
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER:
            return {
                ...state,
                order: action.payload,
            };
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_LOADING:
            return {
                ...state,
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
