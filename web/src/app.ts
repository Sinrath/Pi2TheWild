import express from "express";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { GrovePi } from "../../sensor/src/sensors";
import {readmeasurement} from "../../backend/src/db2web";


const indexFilePath = path.join(__dirname, "../../../public/views/index.html");
const fileContent = fs.readFileSync(indexFilePath, "utf8");
const template = handlebars.compile(fileContent);

const sensor = new GrovePi(1);

const server = express();

server.use(express.static('public'));


server.get("/", function (req, res) {
    
    sensor.measureTemperature()
    .then((temp) => {
        sensor.measureHumidity()
        .then((humidity) => {
            let appliedValues = template({
                humidityNow: humidity,
                temperatureNow: temp
         })
         res.send(appliedValues);
     })
    })
     
    
    .catch(error => console.log(error));
    
});

server.get('/measurement', async (req,res) => {
    const measurementtest = await readmeasurement();
    res.send(measurementtest);
});

server.listen(3000, function (){
    console.log("Server listening on port 3000!");
});