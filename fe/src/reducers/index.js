import { combineReducers } from "redux";
import quoteReducer from "./quoteReducer";
import loginReducer from "./loginReducer";
import salesReducer from "./salesReducer";
import currentSalesOrderReducer from "./currentSalesOrderReducer";
import currentPurchaseOrderReducer from "./currentPurchaseOrderReducer";
import warehousesReducer from "./warehousesReducer";
import currentWarehouseReducer from "./currentWarehouseReducer";
import purchasesReducer from "./purchasesReducer";
import goodsReceiptReducer from "./goodsReceiptReducer";

// Multiple reducers can exist for different parts of the app
export default combineReducers({
    quote: quoteReducer,
    login: loginReducer,
    sales: salesReducer,
    purchases: purchasesReducer,
    currentSalesOrder: currentSalesOrderReducer,
    currentPurchaseOrder: currentPurchaseOrderReducer,
    goodsReceipt: goodsReceiptReducer,
    warehouses: warehousesReducer,
    currentWarehouse: currentWarehouseReducer,
});
