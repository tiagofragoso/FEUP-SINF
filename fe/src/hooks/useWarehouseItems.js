import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWarehouseDetails } from "../actions/warehousesService";

/**
 * React Hook that returns the requested warehouse's items (via its key, passed as argument),
 * abstracting the redux store and actions
 */
const useWarehouseItems = (warehouse_key) => {
    const dispatch = useDispatch();
    const {
        warehouse, warehouse_loading,
        items, items_loading,
        error,
    } = useSelector((state) => state.currentWarehouse);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // useEffect with empty dependencies array functions simillarly to componentDidMount
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        dispatch(getWarehouseDetails(warehouse_key));
    }, [access_token, dispatch, warehouse_key]);

    const data = {
        warehouse: { data: warehouse, loading: !access_token || warehouse_loading },
        items: { data: items, loading: !access_token || items_loading },
        error,
    };

    return data;
};

export default useWarehouseItems;
