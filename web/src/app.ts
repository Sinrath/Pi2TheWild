import express from "express";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { GrovePi } from "../../sensor/src/sensors";


const indexFilePath = path.join(__dirname, "../views/index.html");
const fileContent = fs.readFileSync(indexFilePath, "utf8");
const template = handlebars.compile(fileContent);

const sensor = new GrovePi(1);

const server = express();


server.get("/", function (req, res) {
    
    sensor.measureTemperature()
    .then((temp) => {
        let appliedValues = template({
            temperatureNow: temp
        })
        console.log(appliedValues);
        res.send(appliedValues);
    })
    
        .catch(error => console.log(error));

    
});


server.listen(3000, function (){
    console.log("Server listening on port 3000!");
});