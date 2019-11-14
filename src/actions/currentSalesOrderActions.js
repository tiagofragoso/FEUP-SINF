import { createAction } from "redux-actions";

export const currentSalesOrderTypes = Object.freeze({
    SET_CURRENT_SALES_ORDER: "SET_CURRENT_SALES_ORDER",
    SET_CURRENT_SALES_ORDER_LOADING: "SET_CURRENT_SALES_ORDER_LOADING",
    SET_CURRENT_SALES_ORDER_ERROR: "SET_CURRENT_SALES_ORDER_ERROR",
});

export const setCurrentSalesOrder = createAction(currentSalesOrderTypes.SET_CURRENT_SALES_ORDER);
export const setCurrentSalesOrderLoading = createAction(currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_LOADING);
export const setCurrentSalesOrderError = createAction(currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_ERROR);
