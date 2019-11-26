require("dotenv-flow").config();
const express = require("express");
const app = express();
const express_loader = require("./express_loader");

const DEFAULT_PORT = 3000;

const port = process.env.PORT || DEFAULT_PORT;

express_loader(app);
app.listen(port, () =>
    console.log(`Started listening on port ${port}...`),
);
