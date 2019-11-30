import { createAction } from "redux-actions";

export const currentWarehouseTypes = Object.freeze({
    SET_CURRENT_WAREHOUSE: "SET_CURRENT_WAREHOUSE",
    SET_CURRENT_WAREHOUSE_LOADING: "SET_CURRENT_WAREHOUSE_LOADING",
    SET_CURRENT_WAREHOUSE_ERROR: "SET_CURRENT_WAREHOUSE_ERROR",
});

export const setCurrentWarehouse = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE);
export const setCurrentWarehouseLoading = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_LOADING);
export const setCurrentWarehouseError = createAction(currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ERROR);
