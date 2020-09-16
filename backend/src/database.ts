import {Client, Connect} from 'ts-postgres';
import moment from 'moment';
import {BarometricPressure, GrovePi, Temperature} from "../../sensor/src/sensors";
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
 
export const addmeasurement2db = () => {
    let datum:Date = new Date();
    let lastTemp:Temperature;
    let lastPressure: BarometricPressure;
 
    sensor.measureTemperature()
        .then((temp:Temperature) => {
            lastTemp = temp;
            return sensor.measureBarometricPressure(438);
        })
        .then((pressure) => {
            lastPressure = pressure;
            return sensor.measureHumidity();
        })
        .then((humidity) => {
 
            let formattedDate = (moment(datum)).format('YYYY-MM-DD HH:mm');
            console.log(formattedDate);
 
            //Database Insertion
            let addData = "INSERT INTO messungtest VALUES ("+idNumber+",'"+formattedDate+"','"+lastTemp+"','"+humidity+"','"+lastPressure+"');";
            console.log(addData);
 
            //let addId = "INSERT INTO device VALUES ('"+idNumber+"');";
            //console.log(addId);
 
 
            client.query(addData).then((result:any)=>{
                console.log(result);
            }).catch((reason:any)=>{
                console.log(reason);
        })
 
 
    });
}
