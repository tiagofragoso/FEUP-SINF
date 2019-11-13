import { createAction } from "redux-actions";

export const salesTypes = Object.freeze({
    SET_SALES_ORDERS: "SET_SALES_ORDERS",
    SET_SALES_ORDERS_LOADING: "SET_SALES_ORDERS_LOADING",
    SET_SALES_ORDERS_ERROR: "SET_SALES_ORDERS_ERROR",
});

export const setSalesOrders = createAction(salesTypes.SET_SALES_ORDERS);
export const setSalesOrdersLoading = createAction(salesTypes.SET_SALES_ORDERS_LOADING);
export const setSalesOrdersError = createAction(salesTypes.SET_SALES_ORDERS_ERROR);
