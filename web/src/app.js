"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var handlebars_1 = __importDefault(require("handlebars"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sensors_1 = require("../../sensor/src/sensors");
var indexFilePath = path_1.default.join(__dirname, "../views/index.html");
var fileContent = fs_1.default.readFileSync(indexFilePath, "utf8");
var template = handlebars_1.default.compile(fileContent);
var sensor = new sensors_1.GrovePi(1);
var server = express_1.default();
server.use(express_1.default.static('public'));
server.get("/", function (req, res) {
    sensor.measureTemperature()
        .then(function (temp) {
        var appliedValues = template({
            temperatureNow: temp
        });
        res.send(appliedValues);
    })
        .catch(function (error) { return console.log(error); });
});
server.listen(3000, function () {
    console.log("Server listening on port 3000!");
});
