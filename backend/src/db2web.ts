import { stringify } from 'querystring';
import {Client, Connect} from 'ts-postgres';
import { addmeasurement2db } from './database';

const client = new Client ({
    user : 'postgres',
    host : 'clt-lab-t-6172',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
    });
 
 
/*client.connect().then( (connect: Connect) => {
    console.log(connect);   
}).catch((reason:any) => {
    console.log(reason);  
});*/

export async function readmeasurement():Promise<Measurement> {
    await client.connect();
    let readdata = "SELECT * FROM measurement;";
    try {
    const rows = client.query(readdata);
        let arrayId = new Array<number>();
        let arraydate = [];
        let arraytemp = [];
        let arrayhumidity = [];
        let arraypressure = [];
        
    for await (let row of rows) {
        let idfromzero = row.get('id') as number;
        let datefromzero = row.get('dat') as string;
        let tempfromzero = row.get('temperature') as number;
        let humidityfromzero = row.get('humidity') as number;
        let pressurefromzero = row.get('pressure') as number;
        arrayId.push(idfromzero)
        arraydate.push(datefromzero)
        arraytemp.push(tempfromzero)
        arrayhumidity.push(humidityfromzero)
        arraypressure.push(pressurefromzero)
        //console.log(row.get('dat'))
    }
    
    return new Measurement(arrayId, arraydate, arraytemp, arrayhumidity, arraypressure);

    } finally {
        await client.end();
    }

}

/*export const readmeasurement = () => {
    let readdata = "SELECT * FROM mülleimer;";
    //let deleteHighest = "DELETE FROM messungtest WHERE temperature in (SELECT temperature FROM (SELECT * FROM messungtest ORDER BY temperature DESC LIMIT 1) a);";
    //let deleteLowest = "DELETE FROM messungtest WHERE temperature in (SELECT temperature FROM (SELECT * FROM messungtest ORDER BY temperature ASC LIMIT 1) a);";
    client.query(readdata).then((result:any)=>{
        let rows = result.rows;
        let arrayId = [];
        let arraydate = [];
        let arraytemp = [];
        let arrayhumidity = [];
        let arraypressure = [];
        //let zero = rows[0];
        //let datefromzero = zero[1];
        //console.log(datefromzero);
        // let row = fangt bei index an und führt alle (rows) durch!!
        for (let row in rows){
            let idfromzero = rows[row][0]
            let datefromzero = rows[row][1]
            let tempfromzero = rows[row][2]
            let humidityfromzero = rows[row][3]
            let pressurefromzero = rows[row][4]
            arrayId.push(idfromzero)
            arraydate.push(datefromzero)
            arraytemp.push(tempfromzero)
            arrayhumidity.push(humidityfromzero)
            arraypressure.push(pressurefromzero)
            console.log(arrayId)
            console.log(arraydate)
            console.log(arraytemp)
            console.log(arrayhumidity)
            console.log(arraypressure)
        }
        return new Measurement(arrayId);
    
    }).catch((reason:any)=>{
        return reason;
})}
console.log(readmeasurement());*/

//klasse definieren
/*var für jedes array*/

class Measurement{
    arrayId:Array<number>;
    arraydate:Array<string>;
    arraytemp:Array<number>;
    arrayhumidity:Array<number>;
    arraypressure:Array<number>;

    constructor(arrayId:Array<number>, arraydate:Array<string>, arraytemp:Array<number>, arrayhumidity:Array<number>, arraypressure:Array<number> ) {
      this.arrayId = arrayId;
      this.arraydate = arraydate;
      this.arraytemp = arraytemp;
      this.arrayhumidity = arrayhumidity;
      this.arraypressure = arraypressure;
    }
    /*RecallData() {
      return "ID of the Pi: " + this.arrayId;
    }*/
  }
  

