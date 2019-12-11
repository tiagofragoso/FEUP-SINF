import { setPickingWaves, setPickingWavesError, setPickingWavesLoading } from "./pickingWavesActions";
import { setCurrentPickingWave, setCurrentPickingWaveError, setCurrentPickingWaveLoading } from "./currentPickingWaveActions";

export const getPickingWaves = () => async (dispatch) => {
    dispatch(setPickingWavesLoading(true));

    try {
        const active_waves_res = await fetch(`/picking-api/picking-wave`);
        const finished_waves_res = await fetch(`/picking-api/picking-wave/finished`);

        if (active_waves_res.status !== 200 || finished_waves_res.status !== 200) {
            console.error("getting picking waves failed:", active_waves_res.status);
            dispatch(setPickingWavesError("idk pickingWaves"));
            dispatch(setPickingWavesLoading(false));
            return;
        }

        const data = {
            active: await active_waves_res.json(),
            finished: await finished_waves_res.json()
        } 

        dispatch(setPickingWaves(data));
        dispatch(setPickingWavesLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setPickingWavesError("idk2"));
        dispatch(setPickingWavesLoading(false));
    }
};

export const getPickingWave = (id) => async (dispatch) => {
    dispatch(setCurrentPickingWaveLoading(true));

    try {
        const res = await fetch(`/picking-api/picking-wave/${id}/items`);

        if (res.status !== 200) {
            console.error("getting picking wave items failed:", res.status);
            dispatch(setCurrentPickingWaveError("idk pickingWave items"));
            dispatch(setCurrentPickingWaveLoading(false));
            return;
        }

        const data = await res.json();

        dispatch(setCurrentPickingWave(data));
        dispatch(setCurrentPickingWaveLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setCurrentPickingWaveError("idk2"));
        dispatch(setCurrentPickingWaveLoading(false));
    }
};
