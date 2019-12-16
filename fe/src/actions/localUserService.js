import { createAction } from "redux-actions";

import users from "../users.json";

export const localUserTypes = Object.freeze({
    CHECK_STORED_SESSION: "CHECK_STORED_SESSION",
    SET_LOCAL_USER: "SET_LOCAL_USER",
    CLEAR_LOCAL_USER: "CLEAR_LOCAL_USER",
});

export const checkStoredSession = createAction(localUserTypes.CHECK_STORED_SESSION);
const setLocalUser = createAction(localUserTypes.SET_LOCAL_USER);
export const clearLocalUser = createAction(localUserTypes.CLEAR_LOCAL_USER);

export const loginUser = ({ username, password, rememberMe }) => (dispatch) => {
    const user = users.find((user) => user.username === username);

    if (!user) {
        throw new Error("username");
    }

    if (user.password !== password) {
        throw new Error("password");
    }

    dispatch(setLocalUser({ user, rememberMe }));
};
