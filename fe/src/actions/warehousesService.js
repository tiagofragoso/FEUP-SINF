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

/**
 * Gets the warehouse that each given item belongs to
 *
 * @param {Array} items Array of Objects with shape {itemKey: CLARINET, desiredQuantity: 5}
 * @param {String} access_token
 */
export const getItemWarehouse = async (items, access_token) => {
    const res = await fetch(`/api/${config.tenant}/${config.organization}/materialscore/materialsitems`, access_token);

    const data = await res.json();

    if (res.status !== 200) {
        console.error("getting materials items failed:", res.status, data);
        throw new Error("Getting materials items failed");
    }

    const result = items.map(({ itemKey, desiredQuantity }) => {
        const materialItem = data.find((item) => item.itemKey === itemKey);
        if (!materialItem) {
            return null;
        }

        const warehouses = materialItem.materialsItemWarehouses
            .filter((warehouse) =>
                warehouse.warehouse !== "01"
                && warehouse.warehouse !== "EXIT"
                && warehouse.stockBalance >= desiredQuantity
            );

        console.log("filtered warehouses", warehouses);

        let itemWarehouse = null;

        if (warehouses.length === 1) {
            itemWarehouse = warehouses[0];
        } else if (warehouses.length === 0) {
            itemWarehouse = null;
        } else {
            console.warn("things might not be working as expected");
            itemWarehouse = warehouses[0];
        }

        return {
            itemKey,
            desiredQuantity,
            itemWarehouse,
        };
    });

    return result;
};
