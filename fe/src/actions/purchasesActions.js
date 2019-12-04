import { createAction } from "redux-actions";

export const purchasesTypes = Object.freeze({
    SET_PURCHASE_ORDERS: "SET_PURCHASE_ORDERS",
    SET_PURCHASE_ORDERS_LOADING: "SET_PURCHASE_ORDERS_LOADING",
    SET_PURCHASE_ORDERS_ERROR: "SET_PURCHASE_ORDERS_ERROR",
});

export const setPurchasesOrders = createAction(purchasesTypes.SET_PURCHASE_ORDERS);
export const setPurchasesOrdersLoading = createAction(purchasesTypes.SET_PURCHASE_ORDERS_LOADING);
export const setPurchasesOrdersError = createAction(purchasesTypes.SET_PURCHASE_ORDERS_ERROR);
