import express from "express";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { GrovePi } from "../../sensor/src/sensors";
import { readmeasurement } from "./db2web";
import { deleteDB } from './button';
import { gpsNow } from "./readingGPS";


const indexFilePath = path.join(__dirname, "../../../public/views/index.html");
const fileContent = fs.readFileSync(indexFilePath, "utf8");
const template = handlebars.compile(fileContent);

const sensor = new GrovePi(1);

const server = express();

server.use(express.static('public'));

server.get("/", function (req, res) {

    sensor.measureBarometricPressure(438)
        .then((pressure) => {
            sensor.measureTemperature()
                .then((temp) => {
                    sensor.measureHumidity()
                        .then((humidity) => {
                            let appliedValues = template({
                                pressureNow: pressure,
                                humidityNow: humidity,
                                temperatureNow: temp,
                                gpsNow
                            })
                            res.send(appliedValues);
                        })
                })
        })
        .catch(error => console.log(error));
});

server.get('/measurement', async (req, res) => {
    const measurementtest = await readmeasurement();
    res.send(measurementtest);
});

server.get('/buttonscript', async (req, res) => {
    const deletiontest = deleteDB();
    res.send(deletiontest);
});

server.listen(3000, function () {
    console.log("Server listening on port 3000!");
});