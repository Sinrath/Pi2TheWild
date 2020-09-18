import {Client, Connect} from 'ts-postgres';
import { callEverySecond } from './everyhour';

const client = new Client ({
    user : 'postgres',
    host : 'clt-lab-t-6172',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
    });


client.connect().then( (connect: Connect) => {
    console.log(connect);   
}).catch((reason:any) => {
    console.log(reason);  
});

export const editTemperature = () => {
        client.query("DELETE FROM mülleimer WHERE temperature in (SELECT temperature FROM (SELECT * FROM mülleimer ORDER BY temperature DESC LIMIT 1) a);").then((result:any)=>{
            console.log(result);
        })
        client.query("DELETE FROM mülleimer WHERE temperature in (SELECT temperature FROM (SELECT * FROM mülleimer ORDER BY temperature ASC LIMIT 1) a);").then((result:any)=>{
            console.log(result);
        })
        client.query("SELECT AVG(temperature) FROM mülleimer;").then((result:any)=>{
            console.log(result);
        })
        .catch((reason:any)=>{
            console.log(reason);
        });
}
editTemperature();

