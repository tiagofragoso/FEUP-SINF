import { currentPickingWaveTypes } from "../actions/currentPickingWaveActions";

const initialState = {
    items: null,
    info: null,
    loading: false,
    error: false,
    pickItemStatus: null,
    finishPickingWaveStatus: null,
};

export default (state = initialState, action) => {
    const { info } = state;

    switch (action.type) {
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE:
            return {
                ...state,
                picked_items: action.payload.items.filter((item) => item.is_picked),
                not_picked_items: action.payload.items.filter((item) => !item.is_picked),
                info: action.payload.info,
            };
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE_LOADING:
            return {
                ...(action.payload ? initialState : state),
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

            info.progress = `${picked_items.length}/${picked_items.length + not_picked_items.length}`;

            return {
                ...state,
                info,
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
            info.is_done = true;

            return {
                ...state,
                info,
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
