import {Client, Connect} from 'ts-postgres';
import moment from 'moment';
import {GrovePi} from "../../sensor/src/sensors";
import { readFileSync } from 'fs';
 
const client = new Client ({
    user : 'postgres',
    host : 'clt-lab-t-6172',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
    });
 
const sensor = new GrovePi(1);
 
const idNumber = readFileSync("/home/pi/Pi2TheWild/ID/id.txt", "utf-8");
 
client.connect().then( (connect: Connect) => {
    console.log(connect);   
}).catch((reason:any) => {
    console.log(reason);  
});

export const addmeasurement2db:any = async() => {
    let datum:Date = new Date();
    async function asyncGetSensorValues() {
        let temp = await sensor.measureTemperature();
        let hum = await sensor.measureHumidity();
        let press = await sensor.measureBarometricPressure(438.0);
        return {temp: temp ,humidity: hum, pressure: press }
    }
    let values; 
    do {
        values = await asyncGetSensorValues();
    } while (values.temp.value == 0.0 && values.humidity.value == 0.0 && values.pressure.localPressure <= 900)
    console.log("Here's the value: " + values.humidity); 


    let formattedDate = (moment(datum)).format('YYYY-MM-DD HH:mm');
    console.log(formattedDate);
    //Database Insertion
    let addData = "INSERT INTO measurement VALUES ("+idNumber+",'"+formattedDate+"','"+values.temp+"','"+values.humidity+"','"+values.pressure+"');";

    //let addId = "INSERT INTO device VALUES ('"+idNumber+"');";
    //console.log(addId);

    client.query(addData).then((result:any)=>{
        console.log(result);
    }).catch((reason:any)=>{
        console.log(reason);
    })

}
addmeasurement2db();