/* eslint-disable no-case-declarations */
import { currentSalesOrderTypes } from "../actions/currentSalesOrderActions";

const initialState = {
    order: null,
    items: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER:
            const { order, pWaveItems } = action.payload;

            const shipped = order.documentLines.map((item) => ({
                ...item,
                quantity: item.deliveredQuantity,
            }))
                .filter((item) => item.quantity > 0);

            const { picked: pickedQuantities, not_picked: notPickedQuantities } = pWaveItems.reduce((acc, item) => {
                if (item.picking_wave.is_done) {
                    const quantity = acc.picked[item.item_key] || 0;
                    acc.picked[item.item_key] = quantity + item.quantity;
                } else {
                    const quantity = acc.not_picked[item.item_key] || 0;
                    acc.not_picked[item.item_key] = quantity + item.quantity;
                }
                return acc;
            }, { picked: {}, not_picked: {} });


            let pickedQuantitiesAfterShipping = { ...pickedQuantities };

            for (const item of shipped) {
                if (pickedQuantitiesAfterShipping[item.salesItem]) {
                    pickedQuantitiesAfterShipping =
                    { ...pickedQuantitiesAfterShipping,
                        [item.salesItem]: pickedQuantitiesAfterShipping[item.salesItem] - item.quantity };
                }
            }

            const not_shipped = order.documentLines
                .map((item) => ({
                    ...item,
                    quantity: item.quantity - item.deliveredQuantity -
                    (notPickedQuantities[item.salesItem] || 0) - (pickedQuantitiesAfterShipping[item.salesItem] || 0),
                }))
                .filter((item) => item.quantity > 0);

            const picked =  order.documentLines
                .map((item) => ({
                    ...item,
                    quantity: pickedQuantitiesAfterShipping[item.salesItem] || 0,
                }))
                .filter((item) => item.quantity > 0);

            const not_picked =  order.documentLines
                .map((item) => ({
                    ...item,
                    quantity: notPickedQuantities[item.salesItem] || 0,
                }))
                .filter((item) => item.quantity > 0);

            return {
                ...state,
                order,
                items: {
                    shipped,
                    not_shipped,
                    picked,
                    not_picked,
                },
            };
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_LOADING:
            return {
                // Spreading initialState instead of state to reset previous success or error data
                ...(action.payload ? initialState : state),
                loading: action.payload,
            };
        case currentSalesOrderTypes.SET_CURRENT_SALES_ORDER_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
