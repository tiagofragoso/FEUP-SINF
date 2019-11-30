import { currentWarehouseTypes } from "../actions/currentWarehouseActions";

const initialState = {
    warehouse: null,
    items: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE:
            return {
                ...state,
                warehouse: "test",
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
