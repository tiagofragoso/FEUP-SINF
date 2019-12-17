import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { setDeliveryOrderLoading, setDeliveryOrderError } from "./deliveryOrderActions";
import { getSalesOrder } from "./salesService";

const getDeilveryOrderLines = (login) => fetch(
    `/api/${config.tenant}/${config.organization}/shipping/processOrders/1/1000?company=${config.company}`,
    login.access_token
);

export const createDeliveryOrder = (orderKey, items) => async (dispatch, getState) => {
    dispatch(setDeliveryOrderLoading(true));

    const { login } = getState();

    try {
        const orderLinesRes = await getDeilveryOrderLines(login);

        if (orderLinesRes.status !== 200) {
            console.error("getting processable delivery order entries failed:", orderLinesRes.status);
            dispatch(setDeliveryOrderError("idk"));
            dispatch(setDeliveryOrderLoading(false));
            return;
        }

        const orderLinesData = await orderLinesRes.json();

        const orderLines = orderLinesData.filter((v) => (
            v.sourceDocKey === orderKey && !!items[v.item]
        )).map(({ item, sourceDocKey, sourceDocLineNumber }) => ({
            SourceDocKey: sourceDocKey,
            SourceDocLineNumber: sourceDocLineNumber,
            quantity: items[item],
        }));

        const deliveryOrderRes = await fetch(
            `/api/${config.tenant}/${config.organization}/shipping/processOrders/${config.company}`,
            login.access_token,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(orderLines),
            }
        );

        if (deliveryOrderRes.status !== 201) {
            console.error("generating delivery order failed:", deliveryOrderRes.status);
            const data = await deliveryOrderRes.json();
            dispatch(setDeliveryOrderError(data));
            dispatch(setDeliveryOrderLoading(false));
            return;
        }

        dispatch(setDeliveryOrderLoading(false));
        dispatch(getSalesOrder(orderKey));

    } catch (err) {
        console.error("rip", err);
        dispatch(setDeliveryOrderError("idk2"));
        dispatch(setDeliveryOrderLoading(false));
    }
};
