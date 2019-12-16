import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getItemWarehouse } from "../actions/warehousesService";
import { getPath } from "../actions/pickingWavesService";

const useItemWarehousesPath = (not_picked_items) => {
    const {
        access_token,
    } = useSelector((state) => state.login);

    const [loading, setLoading] = useState(true);
    const [path, setPath] = useState(null);


    useEffect(() => {
        setLoading(true);

        if (!access_token || !not_picked_items) {
            return;
        }

        const fetchData = async (target_items) => {
            const warehouse_zones = (await getItemWarehouse(target_items, access_token)).map((entry) => entry.itemWarehouse.warehouse);
            const { path } = await getPath(warehouse_zones);

            if (!path) {
                return;
            }

            setPath(path);
            setLoading(false);
        };

        const target_items = not_picked_items.map(({ item_key: itemKey, quantity: desiredQuantity }) => ({ itemKey, desiredQuantity }));
        fetchData(target_items);
    }, [access_token, not_picked_items]);

    return {
        loading,
        path,
    };
};

export default useItemWarehousesPath;
