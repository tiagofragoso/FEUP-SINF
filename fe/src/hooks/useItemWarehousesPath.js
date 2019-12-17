import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getItemWarehouse } from "../actions/warehousesService";
import { getPath } from "../actions/pickingWavesService";
import { get } from "http";

const useItemWarehousesPath = (items, get_path = true) => {
    const {
        access_token,
    } = useSelector((state) => state.login);

    const [loading, setLoading] = useState(true);
    const [zones, setZones] = useState(null);
    const [path, setPath] = useState(null);


    useEffect(() => {
        setLoading(true);

        if (!access_token || !items) {
            return;
        }

        const fetchData = async (target_items) => {
            const raw_warehouse_zones = await getItemWarehouse(target_items, access_token);
            setZones(
                raw_warehouse_zones
                    .reduce((acc, { itemKey, itemWarehouse }) => ({ ...acc, [itemKey]: itemWarehouse && itemWarehouse.warehouse }), {})
            );

            const warehouse_zones = raw_warehouse_zones.filter((entry) => entry.itemWarehouse)
                .map((entry) => entry.itemWarehouse.warehouse);

                
            if (get_path) {
                const { path } = await getPath(warehouse_zones);

                setPath(path);
            }

            setLoading(false);
        };

        const target_items = items.map(({ item_key: itemKey, quantity: desiredQuantity }) => ({ itemKey, desiredQuantity }));
        fetchData(target_items);
    }, [access_token, items]);

    return {
        loading,
        path,
        zones,
    };
};

export default useItemWarehousesPath;
