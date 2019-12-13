const { body } = require("express-validator");

const { useExpressValidators } = require("../errorHandler");

const get = useExpressValidators([
    body("username")
        .exists().withMessage("Username must be provided").bail()
        .isString().withMessage("Username must be a String"),

    body("password")
        .exists().withMessage("Password must be provided").bail()
        .isString().withMessage("Password must be a String"),
]);

module.exports = {
    get,
};
