import { createAction } from "redux-actions";

export const deliveryOrderTypes = Object.freeze({
    SET_DELIVERY_ORDER_LOADING: "SET_DELIVERY_ORDER_LOADING",
    SET_DELIVERY_ORDER_ERROR: "SET_DELIVERY_ORDER_ERROR",
});

export const setDeliveryOrderLoading = createAction(deliveryOrderTypes.SET_DELIVERY_ORDER_LOADING);
export const setDeliveryOrderError = createAction(deliveryOrderTypes.SET_DELIVERY_ORDER_ERROR);
