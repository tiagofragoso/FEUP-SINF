import { createAction } from "redux-actions";

export const quoteTypes = Object.freeze({
    SET_QUOTE_LOADING: "SET_QUOTE_LOADING",
    ADD_QUOTE: "ADD_QUOTE",
    SET_QUOTE_ERROR: "SET_QUOTE_ERROR",
});

export const setQuoteLoading = createAction(quoteTypes.SET_QUOTE_LOADING);
export const addQuote = createAction(quoteTypes.ADD_QUOTE);
export const setQuoteError = createAction(quoteTypes.SET_QUOTE_ERROR);
