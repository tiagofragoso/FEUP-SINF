import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setSalesOrders, setSalesOrdersError, setSalesOrdersLoading } from "./salesActions";
import { setCurrentSalesOrder, setCurrentSalesOrderError, setCurrentSalesOrderLoading } from "./currentSalesOrderActions";

export const getSalesOrders = () => async (dispatch, getState) => {
    dispatch(setSalesOrdersLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders`, login.access_token);

        if (res.status !== 200) {
            console.error("getting sales orders failed:", res.status);
            dispatch(setSalesOrdersError("idk"));
            dispatch(setSalesOrdersLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setSalesOrders(data));
        dispatch(setSalesOrdersLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setSalesOrdersError("idk2"));
        dispatch(setSalesOrdersLoading(false));
    }
};

export const getSalesOrder = (id) => async (dispatch, getState) => {
    dispatch(setCurrentSalesOrderLoading(true));

    const primaveraPath = id.replace(/\./g, "/");

    const { login } = getState();
    try {
        const orderItems = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders/${config.company}/${primaveraPath}`, login.access_token);

        if (orderItems.status !== 200) {
            console.error("getting sales order failed:", orderItems.status);
            const data = await orderItems.json();
            dispatch(setCurrentSalesOrderError(data));
            dispatch(setCurrentSalesOrderLoading(false));
            return;
        }

        const orderItemsData = await orderItems.json();

        const pWaveItems = await fetch(`/sinfony-api/sales-order/${id}/picked-items`);

        if (pWaveItems.status !== 200) {
            console.error("getting picking waves items failed:", pWaveItems.status);
            const data = await pWaveItems.json();
            dispatch(setCurrentSalesOrderError(data));
            dispatch(setCurrentSalesOrderLoading(false));
            return;
        }

        const pWaveItemsData = await pWaveItems.json();

        dispatch(setCurrentSalesOrder({ order: orderItemsData, pWaveItems: pWaveItemsData }));
        dispatch(setCurrentSalesOrderLoading(false));
    } catch (err) {
        console.error("rip2", err);
        dispatch(setCurrentSalesOrderError("idk2"));
        dispatch(setCurrentSalesOrderLoading(false));
    }
};
