const { Router } = require("express");
const router = Router();

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the picking waves
     */
    router.get("/", (req, res) => {
        res.send("hello picking wave!");
    });
};
