import { setPickingWaves, setPickingWavesError, setPickingWavesLoading, addNewPickingWave,
    setCreatePickingWaveError, setCreatePickingWaveLoading, setAddItemsLoading, setAddItemsError,
} from "./pickingWavesActions";
import {
    setCurrentPickingWave, setCurrentPickingWaveError, setCurrentPickingWaveLoading,
    pickItem, pickItemError, finishPickingWave, finishPickingWaveError,
} from "./currentPickingWaveActions";
import { getSalesOrder } from "./salesService";

export const getPickingWaves = () => async (dispatch) => {
    dispatch(setPickingWavesLoading(true));

    try {
        const active_waves_res = await fetch("/sinfony-api/picking-wave");
        const finished_waves_res = await fetch("/sinfony-api/picking-wave/finished");

        if (active_waves_res.status !== 200 || finished_waves_res.status !== 200) {
            console.error("getting picking waves failed:", active_waves_res.status);
            dispatch(setPickingWavesError("idk pickingWaves"));
            dispatch(setPickingWavesLoading(false));
            return;
        }

        const data = {
            active: await active_waves_res.json(),
            finished: await finished_waves_res.json(),
        };

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
        const items_res = await fetch(`/sinfony-api/picking-wave/${id}/items`);
        const info_res = await fetch(`/sinfony-api/picking-wave/${id}/info`);

        if (items_res.status !== 200 || info_res.status !== 200) {
            console.error("getting picking wave failed:", items_res.status);
            dispatch(setCurrentPickingWaveError("idk pickingWave"));
            dispatch(setCurrentPickingWaveLoading(false));
            return;
        }

        const data = {
            items: await items_res.json(),
            info: await info_res.json(),
        };

        dispatch(setCurrentPickingWave(data));
        dispatch(setCurrentPickingWaveLoading(false));
    } catch (err) {
        console.error("rip", err);
        dispatch(setCurrentPickingWaveError("idk2"));
        dispatch(setCurrentPickingWaveLoading(false));
    }
};

export const pickItemFromPickingWave = (picking_wave_id, item_id) => async (dispatch) => {
    try {
        const res = await fetch(`/sinfony-api/picking-wave/${picking_wave_id}/item/${item_id}`, {
            method: "PUT",
        });

        if (res.status !== 200) {
            console.error("Failed to pick item:", res.status);
            dispatch(pickItemError("Failed to pick item"));
            return;
        }

        dispatch(pickItem(item_id));
    } catch (err) {
        console.error("rip", err);
        dispatch(pickItemError("Failed to pick item"));
    }
};

export const finishCurrentPickingWave = (picking_wave_id) => async (dispatch) => {
    try {
        const res = await fetch(`/sinfony-api/picking-wave/${picking_wave_id}/finish`, {
            method: "PUT",
        });

        if (res.status !== 200) {
            console.error("Failed to pick item:", res.status);
            dispatch(finishPickingWaveError("Failed to finish picking wave"));
            return;
        }

        dispatch(finishPickingWave());
    } catch (err) {
        console.error("rip", err);
        dispatch(finishPickingWaveError("Failed to finish picking wave"));
    }
};

export const getPath = async (warehouse_zones) => {
    try {
        const res = await fetch(`/sinfony-api/warehouse-zone/path/calculate/${encodeURI(["01", ...warehouse_zones, "EXIT"])}`);

        if (res.status !== 200) {
            console.error("Failed to get path:", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("rip", err);
        return null;
    }
};

export const createPickingWave = ({ name, date }) => async (dispatch) => {
    dispatch(setCreatePickingWaveLoading(true));
    dispatch(setCreatePickingWaveError(false));
    try {
        const res = await fetch("/sinfony-api/picking-wave/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, due_date: date.format() }),
        });

        if (res.status !== 201) {
            console.error("Failed to create picking wave:", res.status);
            dispatch(setCreatePickingWaveError(true));
            dispatch(setCreatePickingWaveLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(addNewPickingWave(data));
        dispatch(setCreatePickingWaveLoading(false));

        return data;
    } catch (err) {
        console.error("rip", err);
        dispatch(setCreatePickingWaveError(true));
        dispatch(setCreatePickingWaveLoading(false));
    }
    return null;
};

export const addItemsToPickingWave = (picking_wave_id, sales_order_id, items) => async (dispatch) => {
    dispatch(setAddItemsLoading(true));
    dispatch(setAddItemsError(false));

    try {
        const res = await fetch(`/sinfony-api/picking-wave/${picking_wave_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
        });

        if (res.status !== 201) {
            console.error("Failed to add items to picking wave:", await res.json());
            dispatch(setAddItemsError(true));
            dispatch(setAddItemsLoading(false));
            return;
        }

        dispatch(getSalesOrder(sales_order_id));
        dispatch(setAddItemsLoading(false));

    } catch (err) {
        console.error("rip", err);
        dispatch(setAddItemsError(true));
        dispatch(setAddItemsLoading(false));
    }
};
