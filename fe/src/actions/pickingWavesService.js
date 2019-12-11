import { setPickingWaves, setPickingWavesError, setPickingWavesLoading } from "./pickingWavesActions";

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
