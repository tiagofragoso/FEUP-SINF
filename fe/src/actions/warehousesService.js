import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setWarehouses, setWarehousesError, setWarehousesLoading } from "./warehousesActions";
import { setCurrentWarehouse, setCurrentWarehouseError, setCurrentWarehouseLoading } from "./currentWarehouseActions";

export const getWarehouses = () => async (dispatch, getState) => {
    dispatch(setWarehousesLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/materialscore/warehouses`, login.access_token);

        if (res.status !== 200) {
            console.error("getting warehouses failed:", res.status);
            dispatch(setWarehousesError("idk"));
            dispatch(setWarehousesLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setWarehouses(data));
        dispatch(setWarehousesLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setWarehousesError("idk2"));
        dispatch(setWarehousesLoading(false));
    }
};

export const getWarehouseDetails = (id) => async (dispatch, getState) => {
    dispatch(setCurrentWarehouseLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders/${id}`, login.access_token);

        if (res.status !== 200) {
            console.error("getting sales order failed:", res.status);
            const data = await res.json();
            dispatch(setCurrentWarehouseError(data));
            dispatch(setCurrentWarehouseLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setCurrentWarehouse(data));
        dispatch(setCurrentWarehouseLoading(false));
    } catch (err) {
        console.error("rip2", err);
        dispatch(setCurrentWarehouseError("idk2"));
        dispatch(setCurrentWarehouseLoading(false));
    }
};
