import { createAction } from "redux-actions";

export const goodsReceiptTypes = Object.freeze({
    SET_GOODS_RECEIPT_LOADING: "SET_GOODS_RECEIPT_LOADING",
    SET_GOODS_RECEIPT_ERROR: "SET_GOODS_RECEIPT_ERROR",
});

export const setGoodsReceiptLoading = createAction(goodsReceiptTypes.SET_GOODS_RECEIPT_LOADING);
export const setGoodsReceiptError = createAction(goodsReceiptTypes.SET_GOODS_RECEIPT_ERROR);
