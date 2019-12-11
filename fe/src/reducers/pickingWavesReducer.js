import { pickingWaveTypes } from "../actions/pickingWavesActions";

const initialState = {
    pickingWaves: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case pickingWaveTypes.SET_PICKING_WAVES:
            return {
                ...state,
                pickingWaves: action.payload,
            };
        case pickingWaveTypes.SET_PICKING_WAVES_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case pickingWaveTypes.SET_PICKING_WAVES_ERROR:
            return {
                ...state,
                error: action.payload || true,
            };
        default:
            return state;
    }
};
