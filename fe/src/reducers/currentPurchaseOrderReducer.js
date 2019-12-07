import { currentPurchaseOrderTypes } from "../actions/currentPurchaseOrderActions";

const initialState = {
    order: null,
    items: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER:
            return {
                ...state,
                order: action.payload,
                items: {
                    received: action.payload.documentLines
                        .map((item) => ({ ...item, quantity: item.receivedQuantity }))
                        .filter((item) => item.quantity > 0),
                    not_received: action.payload.documentLines
                        .map((item) => ({ ...item, quantity: item.quantity - item.receivedQuantity }))
                        .filter((item) => item.quantity > 0),
                },
            };
        case currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER_LOADING:
            return {
                // Spreading initialState instead of state to reset previous success or error data
                ...(action.payload ? initialState : state),
                loading: action.payload,
            };
        case currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
