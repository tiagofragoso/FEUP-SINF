import { goodsReceiptTypes } from "../actions/goodsReceiptActions";

const initialState = {
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case goodsReceiptTypes.SET_GOODS_RECEIPT_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case goodsReceiptTypes.SET_GOODS_RECEIPT_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
