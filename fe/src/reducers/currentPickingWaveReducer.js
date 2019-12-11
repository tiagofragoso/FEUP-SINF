import { currentPickingWaveTypes } from "../actions/currentPickingWaveActions";

const initialState = {
    items: null,
    loading: false,
    error: false,
    pickItemStatus: null,
    finishPickingWaveStatus: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE:
            return {
                ...state,
                picked_items: action.payload.filter((item) => item.is_picked),
                not_picked_items: action.payload.filter((item) => !item.is_picked),
            };
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        case currentPickingWaveTypes.PICK_ITEM:
            const item_key = action.payload;
            const { picked_items, not_picked_items } = state;

            for (let i = 0; i < not_picked_items.length; ++i) {
                if (not_picked_items[i].item_key === item_key) {
                    const [item] = not_picked_items.splice(i, 1);
                    picked_items.push(item);
                    break;
                }
            }

            return {
                ...state,
                picked_items,
                not_picked_items,
                pickItemStatus: {
                    status: "success",
                    message: `Successfully picked Item ${item_key}`,
                }
            };
        case currentPickingWaveTypes.PICK_ITEM_ERROR:
            return {
                ...state,
                pickItemStatus: {
                    status: "error",
                    message: action.payload,
                }
            };
        case currentPickingWaveTypes.FINISH_PICKING_WAVE:
            return {
                ...state,
                finishPickingWaveStatus: {
                    status: "success",
                    message: `Successfully finished Picking Wave`,
                }
            };
        case currentPickingWaveTypes.FINISH_PICKING_WAVE_ERROR:
                return {
                    ...state,
                    finishPickingWaveStatus: {
                        status: "error",
                        message: action.payload,
                    }
                };
        default:
            return state;
    }
};
