"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDB = void 0;
const ts_postgres_1 = require("ts-postgres");
const client = new ts_postgres_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Pi2TheWild',
    password: '1234',
    port: 5432
});
client.connect().then((connect) => {
    console.log(connect);
}).catch((reason) => {
    console.log(reason);
});
function deleteDB() {
    let deleteDataMeasurement = "DELETE FROM measurement;";
    let deleteDataGPS = "DELETE FROM coordinates";
    client.query(deleteDataMeasurement).then((result) => {
        console.log(result);
    }).catch((reason) => {
        console.log(reason);
    });
    client.query(deleteDataGPS).then((result) => {
        console.log(result);
    }).catch((reason) => {
        console.log(reason);
    });
}
exports.deleteDB = deleteDB;
;
