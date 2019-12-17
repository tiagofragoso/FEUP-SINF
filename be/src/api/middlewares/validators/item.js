const item = require("../../../models/item");

// const get = async (req, res, next) => {
//     const { item_key, picking_wave_id, sales_order } = req.body;

//     const i = await item.findAll({
//         where: {
//             item_key,
//             picking_wave_id,
//             sales_order,
//         },
//     });
//     if (i[0]) {
//         req.locals.i = i[0];
//     }

//     return next();
// };

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
