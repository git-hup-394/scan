require('dotenv').config({ path: "./src/.env" });
const express = require("express");
const fs = require("fs");
const configServer = require("./config/configServer.js");
const api = require("./api/api.js");
const axios = require("axios")

const moduleData = fs.readFileSync("./module.txt", "utf-8");
globalThis.module_ids = JSON.parse(moduleData).map(e => Number(e.module_id));

globalThis.max_age_data = 0;
globalThis.isScanning = false;
globalThis.new_module = [];

// Khởi tạo ứng dụng
const app = express();
configServer(app); // Cấu hình server
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


app.use("", api); // Định tuyến API



setInterval(async () => {
    try {
        const response = await axios.get(process.env.FONTEND_URL + "/ping");
        console.log("fontend response:", response.data);
    } catch (error) {
        console.error("Error fetching from backend:", error.message);
    }
}, Math.floor(Math.random() * 500000) + 100000);





const PORT = Number(process.env.PORT) || 2222;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
