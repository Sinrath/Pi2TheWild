"use strict";
exports.__esModule = true;
var sensors_1 = require("./sensors");
var sensor = new sensors_1.GrovePi(1);
/*
 * The sensors actually don't like being queried concurrently which the code
 * below does more or less. Improving the code e.g. by accumulating an object
 * in each promise, is left as an exercise for the reader. Other interesting
 * ideas can be found in https://stackoverflow.com/q/28250680/759042.
 */
// version 1.0
sensor.measureTemperature()
    .then(function (temp) { return console.log("Temperature is " + temp); });
sensor.measureHumidity()
    .then(function (humidity) { return console.log("Humidity is " + humidity); });
new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, 1000); })
    .then(function () { return sensor.measureAirQuality(); })
    .then(function (quality) { return console.log("Air qualitiy is " + quality); });
sensor.measureBarometricPressure(438.0)
    .then(function (pressure) { return console.log("Barometric pressure is " + pressure); });
