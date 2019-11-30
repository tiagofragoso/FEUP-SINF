import { createAction } from "redux-actions";

export const warehouseTypes = Object.freeze({
    SET_WAREHOUSES: "SET_WAREHOUSES",
    SET_WAREHOUSES_LOADING: "SET_WAREHOUSES_LOADING",
    SET_WAREHOUSES_ERROR: "SET_WAREHOUSES_ERROR",
});

export const setWarehouses = createAction(warehouseTypes.SET_WAREHOUSES);
export const setWarehousesLoading = createAction(warehouseTypes.SET_WAREHOUSES_LOADING);
export const setWarehousesError = createAction(warehouseTypes.SET_WAREHOUSES_ERROR);
