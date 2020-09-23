import { stringify } from 'querystring';
import {Client, Connect} from 'ts-postgres';
import { addmeasurement2db } from '../../backend/src/database';

const client = new Client ({
    user : 'postgres',
    host : 'localhost',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
});

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
        let datefromzero = row.get('datum') as string;
        let tempfromzero = row.get('temperature') as number;
        let humidityfromzero = row.get('humidity') as number;
        let pressurefromzero = row.get('pressure') as number;
        arrayId.push(idfromzero)
        arraydate.push(datefromzero)
        arraytemp.push(tempfromzero)
        arrayhumidity.push(humidityfromzero)
        arraypressure.push(pressurefromzero)
    }
    return new Measurement(arrayId, arraydate, arraytemp, arrayhumidity, arraypressure);

    } finally {
        await client.end();
}};

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
}};
  
  