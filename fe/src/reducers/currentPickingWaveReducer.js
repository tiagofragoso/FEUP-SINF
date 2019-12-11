import { currentPickingWaveTypes } from "../actions/currentPickingWaveActions";

const initialState = {
    items: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE:
            return {
                ...state,
                items: action.payload,
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
        default:
            return state;
    }
};
