import { createAction } from "redux-actions";

export const pickingWaveTypes = Object.freeze({
    SET_PICKING_WAVES: "SET_PICKING_WAVES",
    SET_PICKING_WAVES_LOADING: "SET_PICKING_WAVES_LOADING",
    SET_PICKING_WAVES_ERROR: "SET_PICKING_WAVES_ERROR",
    ADD_NEW_PICKING_WAVE: "ADD_NEW_PICKING_WAVE",
    CREATE_PICKING_WAVE_LOADING: "CREATE_PICKING_WAVE_LOADING",
    CREATE_PICKING_WAVE_ERROR: "CREATE_PICKING_WAVE_ERROR",
});

export const setPickingWaves = createAction(pickingWaveTypes.SET_PICKING_WAVES);
export const setPickingWavesLoading = createAction(pickingWaveTypes.SET_PICKING_WAVES_LOADING);
export const setPickingWavesError = createAction(pickingWaveTypes.SET_PICKING_WAVES_ERROR);
export const addNewPickingWave = createAction(pickingWaveTypes.ADD_NEW_PICKING_WAVE);
export const setCreatePickingWaveLoading = createAction(pickingWaveTypes.CREATE_PICKING_WAVE_LOADING);
export const setCreatePickingWaveError = createAction(pickingWaveTypes.CREATE_PICKING_WAVE_ERROR);
