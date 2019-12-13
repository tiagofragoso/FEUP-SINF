const { Router } = require("express");
const router = Router();
const users = require("../../users.json");
const user_validators = require("../middlewares/validators/user");

module.exports = (app) => {
    app.use("/login", router);

    /**
     * Gets all the in progress Picking Waves
     */
    router.post("/", user_validators.get, (req, res) => {
        const { username, password } = req.body;

        for (const user of users) {
            if (user.username === username && user.password === password) {
                return res.status(200).send();
            }
        }

        return res.status(404).json({
            reason: "Credentials do not match any existing user",
        });
    });
};
