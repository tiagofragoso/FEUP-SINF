import { createAction } from "redux-actions";

export const currentPickingWaveTypes = Object.freeze({
    SET_CURRENT_PICKING_WAVE: "SET_CURRENT_PICKING_WAVE",
    SET_CURRENT_PICKING_WAVE_LOADING: "SET_CURRENT_PICKING_WAVE_LOADING",
    SET_CURRENT_PICKING_WAVE_ERROR: "SET_CURRENT_PICKING_WAVE_ERROR",
    PICK_ITEM: "PICK_ITEM",
    PICK_ITEM_ERROR: "PICK_ITEM_ERROR",
});

export const setCurrentPickingWave = createAction(currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE);
export const setCurrentPickingWaveLoading = createAction(currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE_LOADING);
export const setCurrentPickingWaveError = createAction(currentPickingWaveTypes.SET_CURRENT_PICKING_WAVE_ERROR);
export const pickItem = createAction(currentPickingWaveTypes.PICK_ITEM);
export const pickItemError = createAction(currentPickingWaveTypes.PICK_ITEM_ERROR);
