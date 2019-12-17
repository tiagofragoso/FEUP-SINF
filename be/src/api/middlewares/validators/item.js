const item = require("../../../models/item");

const exists = async (req, res, next) => {
    const { item_id } = req.params;

    const i = await item.findByPk(item_id);
    if (!i) {
        return res.status(404).send();
    }

    if (!req.locals) {
        req.locals = {};
    }
    req.locals.i = i;

    return next();
};

module.exports = {
    exists,
};
