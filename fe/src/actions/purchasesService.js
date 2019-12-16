import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setPurchasesOrders, setPurchasesOrdersLoading, setPurchasesOrdersError } from "./purchasesActions";
import { setCurrentPurchaseOrder, setCurrentPurchaseOrderError, setCurrentPurchaseOrderLoading } from "./currentPurchaseOrderActions";

export const getPurchaseOrders = () => async (dispatch, getState) => {
    dispatch(setPurchasesOrdersLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/purchases/orders`, login.access_token);

        if (res.status !== 200) {
            console.error("getting purchase orders failed:", res.status);
            dispatch(setPurchasesOrdersError("idk"));
            dispatch(setPurchasesOrdersLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setPurchasesOrders(data));
        dispatch(setPurchasesOrdersLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setPurchasesOrdersError("idk2"));
        dispatch(setPurchasesOrdersLoading(false));
    }
};

export const getPurchaseOrder = (id) => async (dispatch, getState) => {
    dispatch(setCurrentPurchaseOrderLoading(true));

    const primaveraPath = id.replace(/\./g, "/");

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/purchases/orders/${config.company}/${primaveraPath}`, login.access_token);

        if (res.status !== 200) {
            console.error("getting purchase order failed:", res.status);
            const data = await res.json();
            dispatch(setCurrentPurchaseOrderError(data));
            dispatch(setCurrentPurchaseOrderLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setCurrentPurchaseOrder(data));
        dispatch(setCurrentPurchaseOrderLoading(false));
    } catch (err) {
        console.error("rip2", err);
        dispatch(setCurrentPurchaseOrderError("idk2"));
        dispatch(setCurrentPurchaseOrderLoading(false));
    }
};
