import { createAction } from "redux-actions";

export const loginTypes = Object.freeze({
    SET_LOGIN_TOKEN: "SET_LOGIN_TOKEN",
    SET_LOGIN_ERROR: "SET_LOGIN_ERROR",
});

export const setLoginToken = createAction(loginTypes.SET_LOGIN_TOKEN);
export const setLoginError = createAction(loginTypes.SET_LOGIN_ERROR);
