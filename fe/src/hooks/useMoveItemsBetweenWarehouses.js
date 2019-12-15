import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStockTransferOrder } from "../actions/warehousesService";
import { removeItemsFromCurrentWarehouse } from "../actions/currentWarehouseActions";

/**
 * React Hook that abstracts the process of moving items between warehouses, providing a simplified callback to do so,
 * abstracting the Redux Store and Actions
 */
const useMoveItemsBetweenWarehouses = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {
        access_token,
    } = useSelector((state) => state.login);

    const moveItems = useCallback(
        async (sourceWarehouse, targetWarehouse, items) => {
            if (!access_token) {
                return;
            }

            setLoading(true);
            try {
                const res = await createStockTransferOrder(sourceWarehouse, targetWarehouse, items, access_token);
                const data = await res.json();
                console.log(data);
                if (res.status !== 201) {
                    setError(data);
                } else {
                    // Success, update the items in the redux store because
                    // requesting the items now would result in the stock not yet having been updated (thanks Primavera)
                    dispatch(removeItemsFromCurrentWarehouse(items));
                }
            } catch (err) {
                console.error("ripp", err);
                setError(err);
            }

            setLoading(false);
        },
        [access_token, dispatch],
    );

    return [!access_token || loading, error, moveItems];
};

export default useMoveItemsBetweenWarehouses;
