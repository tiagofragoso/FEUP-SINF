import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setPurchasesOrders, setPurchasesOrdersLoading, setPurchasesOrdersError } from "./purchasesActions";
// import { setCurrentSalesOrder, setCurrentSalesOrderError, setCurrentSalesOrderLoading } from "./currentSalesOrderActions";

export const getPurchaseOrders = () => async (dispatch, getState) => {
    dispatch(setPurchasesOrdersLoading(true));

    const { login } = getState();
    try {
        const res = await fetch(`/api/${config.tenant}/${config.organization}/purchases/orders`, login.access_token);

        if (res.status !== 200) {
            console.error("getting sales orders failed:", res.status);
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

// export const getSalesOrder = (id) => async (dispatch, getState) => {
//     dispatch(setCurrentSalesOrderLoading(true));

//     const { login } = getState();
//     try {
//         const res = await fetch(`/api/${config.tenant}/${config.organization}/sales/orders/${id}`, login.access_token);

//         if (res.status !== 200) {
//             console.error("getting sales order failed:", res.status);
//             const data = await res.json();
//             dispatch(setCurrentSalesOrderError(data));
//             dispatch(setCurrentSalesOrderLoading(false));
//             return;
//         }

//         const data = await res.json();
//         dispatch(setCurrentSalesOrder(data));
//         dispatch(setCurrentSalesOrderLoading(false));
//     } catch (err) {
//         console.error("rip2", err);
//         dispatch(setCurrentSalesOrderError("idk2"));
//         dispatch(setCurrentSalesOrderLoading(false));
//     }
// };
