const cors = require("cors");
const express = require("express");
let url = process.env.MAIN_BACKEND
const allowedOrigins = [url, 'http://localhost:5173', "http://localhost:8080"];

function configServer(app) {
    app.use(cors({
        origin: allowedOrigins,
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

module.exports = configServer;
