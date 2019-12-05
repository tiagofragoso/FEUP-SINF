import { createAction } from "redux-actions";

export const currentWarehouseTypes = Object.freeze({
    SET_CURRENT_WAREHOUSE_INFO: "SET_CURRENT_WAREHOUSE_INFO",
    SET_CURRENT_WAREHOUSE_ITEMS: "SET_CURRENT_WAREHOUSE_ITEMS",
    SET_CURRENT_WAREHOUSE_INFO_LOADING: "SET_CURRENT_WAREHOUSE_INFO_LOADING",
    SET_CURRENT_WAREHOUSE_ITEMS_LOADING: "SET_CURRENT_WAREHOUSE_ITEMS_LOADING",
    SET_CURRENT_WAREHOUSE_ERROR: "SET_CURRENT_WAREHOUSE_ERROR",
});

export const setCurrentWarehouseInfo = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_INFO);
export const setCurrentWarehouseItems = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ITEMS);
export const setCurrentWarehouseInfoLoading = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_INFO_LOADING);
export const setCurrentWarehouseItemsLoading = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ITEMS_LOADING);
export const setCurrentWarehouseError = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ERROR);
