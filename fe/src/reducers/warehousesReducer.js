import { warehouseTypes } from "../actions/warehousesActions";

const initialState = {
    warehouses: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case warehouseTypes.SET_WAREHOUSES:
            return {
                ...state,
                warehouses: action.payload.filter((warehouse) => warehouse.isActive),
            };
        case warehouseTypes.SET_WAREHOUSES_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case warehouseTypes.SET_WAREHOUSES_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
