const proxy = require("http-proxy-middleware");
require("dotenv-flow").config();

module.exports = (app) => {
    app.use(
        "/api",
        proxy({
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true,
            // pathRewrite: () => "",
        })
    );

    app.use(
        "/login",
        proxy({
            target: "https://identity.primaverabss.com/connect/token",
            changeOrigin: true,
            pathRewrite: { "^/login": "" },
        })
    );

    app.use(
        "/picking-api",
        proxy({
            target: process.env.PICKING_WAVES_API_URL,
            pathRewrite: { "^/picking-api": "" },
        })
    );
};
