import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWarehouses } from "../actions/warehousesService";

/**
 * Hook that returns the application's warehouses, abstracting the redux store and actions
 */
const useWarehouses = () => {
    const dispatch = useDispatch();
    const {
        warehouses, loading, error,
    } = useSelector((state) => state.warehouses);
    const {
        access_token,
    } = useSelector((state) => state.login);

    // If no sales orders have been loaded, then load them
    useEffect(() => {
        // Can't request info from api before the login is ready
        if (!access_token) {
            return;
        }

        dispatch(getWarehouses());
    }, [access_token, dispatch]);

    return [warehouses, !access_token || loading, error];
};

export default useWarehouses;
