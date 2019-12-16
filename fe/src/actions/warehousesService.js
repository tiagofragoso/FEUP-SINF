import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setWarehouses, setWarehousesError, setWarehousesLoading } from "./warehousesActions";
import {
    setCurrentWarehouseInfo, setCurrentWarehouseInfoLoading,
    setCurrentWarehouseItems, setCurrentWarehouseItemsLoading,
    setCurrentWarehouseError,
} from "./currentWarehouseActions";

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

export const getWarehouseDetails = (key) => async (dispatch, getState) => {
    dispatch(setCurrentWarehouseInfoLoading(true));
    dispatch(setCurrentWarehouseItemsLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/materialscore/warehouses/${key}`, login.access_token);

        if (res.status !== 200) {
            console.error("getting warehouse info failed:", res.status);
            const data = await res.json();
            dispatch(setCurrentWarehouseError(data));
            dispatch(setCurrentWarehouseInfoLoading(false));
            dispatch(setCurrentWarehouseItemsLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setCurrentWarehouseInfo(data));
        dispatch(setCurrentWarehouseInfoLoading(false));
    } catch (err) {
        console.error("rip8", err);
        dispatch(setCurrentWarehouseError("idk8"));
        dispatch(setCurrentWarehouseInfoLoading(false));
        dispatch(setCurrentWarehouseItemsLoading(false));
        return;
    }

    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/materialscore/materialsitems`, login.access_token);

        if (res.status !== 200) {
            console.error("getting materials items failed:", res.status);
            const data = await res.json();
            dispatch(setCurrentWarehouseError(data));
            dispatch(setCurrentWarehouseItemsLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setCurrentWarehouseItems(data));
        dispatch(setCurrentWarehouseItemsLoading(false));
    } catch (err) {
        console.error("rip9", err);
        dispatch(setCurrentWarehouseError("idk9"));
        dispatch(setCurrentWarehouseItemsLoading(false));
        return;
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

/**
 * Creates a Stock Transfer Order
 * @param {String} sourceWarehouse ID of the source warehouse
 * @param {String} targetWarehouse ID of the target warehouse
 * @param {Array} items items to transfer. Should be in form {id, quantity}
 */
export const createStockTransferOrder = (sourceWarehouse, targetWarehouse, items, access_token) =>
    fetch(`/api/${config.tenant}/${config.organization}/materialsmanagement/stockTransferOrders`,
        access_token,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                company: config.company,
                sourceWarehouse,
                targetWarehouse,
                UnloadingCountry: "PT",
                documentLines: items.map(({ id, quantity }) => ({ materialsItem: id, quantity })),
            }),
        });

export const getWarehousePlant = async () => {
    try {
        const res = await fetch("/sinfony-api/warehouse-zone");

        if (res.status !== 200) {
            console.error("Failed to get warehouse plant: ", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("rip", err);
        return null;
    }
};
