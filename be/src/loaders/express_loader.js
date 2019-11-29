const api_routes = require("../api");
const express = require("express");
const cors_middleware = require("../api/middlewares/cors");

module.exports = (app) => {
    // Health check endpoint
    app.get("/", (_, res) => res.status(200).json({ "online": true }));

    app.use(express.json());

    // Cors middleware to accept request from all origins
    app.use(cors_middleware());

    // Register API Routes
    app.use(api_routes());
};
