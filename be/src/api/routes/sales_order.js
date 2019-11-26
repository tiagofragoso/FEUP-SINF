const { Router } = require("express");
const router = Router();

module.exports = (app) => {
    app.use("/sales-order", router);

    /**
     * Gets all the picking waves
     */
    router.get("/", (req, res) => {
        res.send("hello sales order!");
    });
};
