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

export const addTemp2db = () => {
    let datum:Date = new Date();
    sensor.measureTemperature()
        .then((temp) => {

        let formattedDate = (moment(datum)).format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedDate);
        
        //Database Insertion
        let addDatum = "INSERT INTO measurement VALUES ("+idNumber+",'"+formattedDate+"','"+temp+"');";
        console.log(addDatum);

        //let addId = "INSERT INTO device VALUES ('"+idNumber+"');";
        //console.log(addId);

        client.query(addDatum).then((result:any)=>{
            console.log(result);
        }).catch((reason:any)=>{
            console.log(reason);
        })

    });
}