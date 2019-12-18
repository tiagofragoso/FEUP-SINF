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
                            if (curr_item_warehouse[0].stockBalance === 0) {
                                return acc;
                            } else {
                                return [...acc, { ...curr_item, quantity: curr_item_warehouse[0].stockBalance }];
                            }
                        } else {
                            console.error("wtf primavera, ids arent unique???");
                            return acc;
                        }
                    }, []),
            };
        case currentWarehouseTypes.REMOVE_ITEMS_FROM_CURRENT_WAREHOUSE:
            return {
                ...state,
                items: state.items.map((item) => {
                    const movedItemEntry = action.payload.find((movedItem) => item.itemKey === movedItem.id);
                    if (!movedItemEntry) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity - movedItemEntry.quantity,
                    };
                }).filter((item) => item.quantity > 0),
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_INFO_LOADING:
            return {
                ...state,
                // Spreading initialState instead of state to reset previous success or error data
                error: (action.payload ? initialState.error : state.error),
                warehouse: (action.payload ? initialState.warehouse : state.warehouse),
                warehouse_loading: action.payload,
            };
        case currentWarehouseTypes.SET_CURRENT_WAREHOUSE_ITEMS_LOADING:
            return {
                ...state,
                // Spreading initialState instead of state to reset previous success or error data
                error: (action.payload ? initialState.error : state.error),
                items: (action.payload ? initialState.items : state.items),
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
