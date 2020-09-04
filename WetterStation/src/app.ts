import express from "express";

import { GrovePi } from "./sensors";

const sensor = new GrovePi(1);

const server = express();

server.get("/", function (req, res) {
    
    sensor.measureTemperature()
    .then((temp) => res.send(`Die Temperatur ist: ${temp}`))
    .catch(error => console.log(error));

});




server.listen(3000, function (){
    console.log("Server listening on port 3000!");
});