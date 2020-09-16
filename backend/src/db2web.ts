import {Client, Connect} from 'ts-postgres';
import { readRowData } from 'ts-postgres/dist/src/protocol';
import { ResultRow } from 'ts-postgres/dist/src/result';

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
 
export const readdatemeasurement = () => {
    let readdata = "SELECT * FROM mülleimer;"; //average temp of the last 7 days
    client.query(readdata).then((result:any)=>{
        let rows = result.rows;
        let arraydate = [];
        //let zero = rows[0];
        //let datefromzero = zero[1];
        //console.log(datefromzero);
        // let row = fangt bei index an und führt alle (rows) durch!!
        for (let row in rows){
            let datefromzero = rows[row][1]
            arraydate.push(datefromzero)
            console.log(arraydate)
        }
    }).catch((reason:any)=>{
        return reason;
})}
console.log(readdatemeasurement());
