import { Client, Connect } from 'ts-postgres';
import moment from 'moment';
import { GrovePi } from "../../sensor/src/sensors";
import { readFileSync } from 'fs';
import { gpsValues } from './gpsvalues ';
import { gpsNow } from '../../web/src/readingGPS'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Pi2TheWild',
    password: '1234',
    port: 5432
});

const sensor = new GrovePi(1);

export const idNumber = readFileSync("/home/pi/Pi2TheWild/ID/id.txt", "utf-8");

client.connect().then((connect: Connect) => {
    console.log(connect);
}).catch((reason: any) => {
    console.log(reason);
});

export const addmeasurement2db: any = async () => {
    let datum: Date = new Date();
    async function asyncGetSensorValues() {
        let temp = await sensor.measureTemperature();
        let hum = await sensor.measureHumidity();
        let press = await sensor.measureBarometricPressure(438.0);
        return { temp: temp, humidity: hum, pressure: press }
    }
    let values;
    do {
        values = await asyncGetSensorValues();
    } while (values.temp.value == 0.0 && values.humidity.value == 0.0 || values.pressure.localPressure <= 800)
    //console.log("Here's the value: " + values.humidity);

    gpsValues();
    console.log(gpsValues);

    let formattedDate = (moment(datum)).format('YYYY-MM-DD HH:mm');
    console.log(formattedDate);

    let deleteGPS = "DELETE FROM coordinates;";
    let addGPS = "INSERT INTO coordinates VALUES (" + idNumber + ", '" + formattedDate + "', '" + gpsNow + "');";
    let addData = "INSERT INTO measurement VALUES (" + idNumber + ",'" + formattedDate + "','" + values.temp + "','" + values.humidity + "','" + values.pressure + "');";

    client.query(addData).then((result: any) => {
        console.log(result);
    }).catch((reason: any) => {
        console.log(reason);
    })
    client.query(deleteGPS).then((result: any) => {
        console.log(result);
    }).catch((reason: any) => {
        console.log(reason);
    })
    client.query(addGPS).then((result: any) => {
        console.log(result);
    }).catch((reason: any) => {
        console.log(reason);
    })
}
addmeasurement2db()
