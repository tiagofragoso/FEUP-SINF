import { createAction } from "redux-actions";

export const pickingWaveTypes = Object.freeze({
    SET_PICKING_WAVES: "SET_PICKING_WAVES",
    SET_PICKING_WAVES_LOADING: "SET_PICKING_WAVES_LOADING",
    SET_PICKING_WAVES_ERROR: "SET_PICKING_WAVES_ERROR",
});

export const setPickingWaves = createAction(pickingWaveTypes.SET_PICKING_WAVES);
export const setPickingWavesLoading = createAction(pickingWaveTypes.SET_PICKING_WAVES_LOADING);
export const setPickingWavesError = createAction(pickingWaveTypes.SET_PICKING_WAVES_ERROR);
