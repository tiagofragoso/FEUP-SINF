import axios from "axios";

import { addQuote, setQuoteLoading, setQuoteError } from "./quoteActions";

export const loadQuote = () => async (dispatch) => {

    dispatch(setQuoteLoading(true));

    try {
        const res = await axios.get("https://api.chucknorris.io/jokes/random");

        if (res.status !== 200) {
            dispatch(setQuoteError({
                cause: "NOT_200",
                error: res.status,
            }));

            dispatch(setQuoteLoading(false));
            return;
        }

        dispatch(addQuote(res.data.value));
        dispatch(setQuoteLoading(false));

    } catch (error) {
        dispatch(setQuoteError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setQuoteLoading(false));
    }
};
