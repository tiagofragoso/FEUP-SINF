import { pickingWaveTypes } from "../actions/pickingWavesActions";

const initialState = {
    pickingWaves: null,
    loading: false,
    error: false,
    createLoading: false,
    createError: false,
    addItemsLoading: false,
    addItemsError: false,
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
        case pickingWaveTypes.ADD_NEW_PICKING_WAVE:
            return {
                ...state,
                // Add new picking wave to active picking waves
                pickingWaves: { ...state.pickingWaves, active: [...state.pickingWaves.active, action.payload] },
            };
        case pickingWaveTypes.CREATE_PICKING_WAVE_LOADING:
            return {
                ...state,
                createLoading: action.payload,
            };
        case pickingWaveTypes.CREATE_PICKING_WAVE_ERROR:
            return {
                ...state,
                createError: action.payload || true,
            };
        case pickingWaveTypes.ADD_ITEMS_LOADING:
            return {
                ...state,
                addItemsLoading: action.payload,
            };
        case pickingWaveTypes.ADD_ITEMS_ERROR:
            return {
                ...state,
                addItemsError: action.payload || true,
            };
        default:
            return state;
    }
};
