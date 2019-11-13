import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setSalesOrders, setSalesOrdersError, setSalesOrdersLoading } from "./salesActions";

export const getSalesOrders = () => async (dispatch, getState) => {
    dispatch(setSalesOrdersLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders`, login.access_token);

        if (res.status !== 200) {
            console.error("getting sales order failed:", res.status);
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
