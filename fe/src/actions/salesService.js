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
        console.log(data);
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

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders/${id}`, login.access_token);

        if (res.status !== 200) {
            console.error("getting sales order failed:", res.status);
            const data = await res.json();
            dispatch(setCurrentSalesOrderError(data));
            dispatch(setCurrentSalesOrderLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setCurrentSalesOrder(data));
        dispatch(setCurrentSalesOrderLoading(false));
    } catch (err) {
        console.error("rip2", err);
        dispatch(setCurrentSalesOrderError("idk2"));
        dispatch(setCurrentSalesOrderLoading(false));
    }
};
