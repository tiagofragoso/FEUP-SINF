import { createAction } from "redux-actions";

export const currentPurchaseOrderTypes = Object.freeze({
    SET_CURRENT_PURCHASE_ORDER: "SET_CURRENT_PURCHASE_ORDER",
    SET_CURRENT_PURCHASE_ORDER_LOADING: "SET_CURRENT_PURCHASE_ORDER_LOADING",
    SET_CURRENT_PURCHASE_ORDER_ERROR: "SET_CURRENT_SALES_ORDER_ERROR",
});

export const setCurrentPurchaseOrder = createAction(currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER);
export const setCurrentPurchaseOrderLoading = createAction(currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER_LOADING);
export const setCurrentPurchaseOrderError = createAction(currentPurchaseOrderTypes.SET_CURRENT_PURCHASE_ORDER_ERROR);
