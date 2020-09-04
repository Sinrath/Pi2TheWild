"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sensors_1 = require("./sensors");
var sensor = new sensors_1.GrovePi(1);
var server = express_1.default();
server.get("/", function (req, res) {
    sensor.measureTemperature()
        .then(function (temp) { return res.send("Die Temperatur ist: " + temp); });
});
server.listen(3000, function () {
    console.log("Server listening on port 3000!");
});
