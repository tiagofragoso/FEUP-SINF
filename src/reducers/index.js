import { combineReducers } from "redux";
import quoteReducer from "./quoteReducer";
import loginReducer from "./loginReducer";
import salesReducer from "./salesReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    quote: quoteReducer,
    login: loginReducer,
    sales: salesReducer,
});
