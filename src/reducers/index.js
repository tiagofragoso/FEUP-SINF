import { combineReducers } from "redux";
import quoteReducer from "./quoteReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    quote: quoteReducer,
});
