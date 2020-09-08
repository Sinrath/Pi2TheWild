import {Client, Connect} from 'ts-postgres'
import moment from 'moment';
import {GrovePi} from "../../sensor/src/sensors";

const client = new Client ({
    user : 'postgres',
    host : 'clt-lab-t-6172',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
    });

const sensor = new GrovePi(1);

const datum:Date = new Date();

let formattedDate = (moment(datum)).format('YYYY-MM-DD HH:mm:ss')
console.log(formattedDate)
    
let addDatum = "INSERT INTO messung (id, temperatur, datum) VALUES ("+6172+","+sensor.measureTemperature+",'"+formattedDate+"');";
console.log(addDatum);


client.connect().then( (connect: Connect) => {
    console.log(connect);
}).catch((reason:any) => {
    console.log(reason);  
});

client.query(addDatum).then((result:any)=>{
    console.log(result);
}).catch((reason:any)=>{
    console.log(reason);
})