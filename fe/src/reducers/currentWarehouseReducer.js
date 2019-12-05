import { currentWarehouseTypes } from "../actions/currentWarehouseActions";

const initialState = {
    warehouse_loading: false,
    items_loading: false,
    warehouse: null,
    items: null,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_INFO:
            return {
                ...state,
                warehouse: action.payload,
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ITEMS:
            return {
                ...state,
                items: action.payload
                    .filter((item) => item.isActive)
                    .reduce((acc, curr_item) => {
                        const curr_item_warehouse = curr_item.materialsItemWarehouses
                            .filter((materialsItemWarehouse) => materialsItemWarehouse.warehouseId === state.warehouse.id);

                        if (curr_item_warehouse.length === 0) {
                            return acc;
                        } else if (curr_item_warehouse.length === 1) {
                            return [...acc, { ...curr_item, quantity: curr_item_warehouse[0].stockBalance }];
                        } else {
                            console.error("wtf primavera, ids arent unique???");
                            return acc;
                        }
                    }, []),
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_INFO_LOADING:
            return {
                ...state,
                warehouse_loading: action.payload,
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ITEMS_LOADING:
            return {
                ...state,
                items_loading: action.payload,
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
