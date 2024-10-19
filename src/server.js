require('dotenv').config({ path: "./src/.env" });
const express = require("express");
const fs = require("fs")
const configServer = require("./config/configServer.js");
const api = require("./api/api.js");



let module_data = fs.readFileSync("./module.txt", "utf-8")

globalThis.module_data = JSON.parse(module_data)



//init app
const app = express();


//config server



configServer(app);





//use router
app.use("", api);



//run server
const PORT = Number(process.env.PORT) || 2222;

app.listen(PORT, () => {
    console.log("backend is running on port", PORT);
})