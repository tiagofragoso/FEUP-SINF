
const Sequelize = require("sequelize");

if (!process.env.DB_PATH) {
    throw new Error("DB Path missing");
}

const db = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH,
});

db.authenticate()
    .catch((err) => {
        throw new Error(`DB Connection failed: ${err}`);
    });

module.exports = db;
