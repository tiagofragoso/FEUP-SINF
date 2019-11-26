import { addQuote, setQuoteLoading, setQuoteError } from "./quoteActions";

export const loadQuote = () => async (dispatch) => {

    dispatch(setQuoteLoading(true));

    try {
        const res = await fetch("https://api.chucknorris.io/jokes/random");

        if (res.status !== 200) {
            dispatch(setQuoteError({
                cause: "NOT_200",
                error: res.status,
            }));

            dispatch(setQuoteLoading(false));
            return;
        }

        const data = await res.json();

        dispatch(addQuote(data.value));
        dispatch(setQuoteLoading(false));

    } catch (error) {
        dispatch(setQuoteError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setQuoteLoading(false));
    }
};
