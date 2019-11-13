import config from "../config";
import { setLoginToken, setLoginError } from "./loginActions";

export const login = () => async (dispatch) => {
    const request_data = new FormData();
    request_data.append("grant_type", "client_credentials");
    request_data.append("client_id", "FEUP-SINF-GM");
    request_data.append("client_secret", config.sinfClientSecret);
    request_data.append("scope", "application");

    try {
        const res = await fetch("/login", {
            method: "POST",
            body: request_data,
        });

        if (res.status !== 200) {
            console.error(`problem in login with status ${res.status}`);
            dispatch(setLoginError());
            return;
        }

        const data = await res.json();

        // The data.expires_in field might also be interesting, but ignoring it for now
        // Later on we should probably relogin based on that
        dispatch(setLoginToken(data.access_token));
    } catch (error) {
        console.error("problem in login", error);
        dispatch(setLoginError());
    }
};
