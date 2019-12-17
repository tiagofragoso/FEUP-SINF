import fetch from "../utils/fetchingWithToken";
import config from "../config";
import { getPurchaseOrder } from "./purchasesService";
import { setGoodsReceiptError, setGoodsReceiptLoading } from "./goodsReceiptActions";

const getGoodsReceipt = (login) => fetch(
    `/api/${config.tenant}/${config.organization}/goodsReceipt/processOrders/1/1000?company=${config.company}`,
    login.access_token
);

export const createGoodsReceipt = (orderKey, items) => async (dispatch, getState) => {
    dispatch(setGoodsReceiptLoading(true));

    const { login } = getState();

    try {
        const orderLinesRes = await getGoodsReceipt(login);

        if (orderLinesRes.status !== 200) {
            console.error("getting processable goods receipts entries failed:", orderLinesRes.status);
            dispatch(setGoodsReceiptError("idk"));
            dispatch(setGoodsReceiptLoading(false));
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

        const goodsReceiptRes = await fetch(
            `/api/${config.tenant}/${config.organization}/goodsReceipt/processOrders/${config.company}`,
            login.access_token,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(orderLines),
            }
        );

        if (goodsReceiptRes.status !== 201) {
            console.error("creating goods receipts failed:", goodsReceiptRes.status);
            const data = await goodsReceiptRes.json();
            dispatch(setGoodsReceiptError(data));
            dispatch(setGoodsReceiptLoading(false));
            return;
        }

        dispatch(setGoodsReceiptLoading(false));
        dispatch(getPurchaseOrder(orderKey));

    } catch (err) {
        console.error("rip", err);
        dispatch(setGoodsReceiptError("idk2"));
        dispatch(setGoodsReceiptLoading(false));
    }
};
