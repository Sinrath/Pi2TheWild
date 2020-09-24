import { Client, Connect } from 'ts-postgres';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Pi2TheWild',
    password: '1234',
    port: 5432
});

client.connect().then((connect: Connect) => {
    console.log(connect);
}).catch((reason: any) => {
    console.log(reason);
});

export function deleteDB(): void {
    let deleteDataMeasurement = "DELETE FROM measurement;"
    let deleteDataGPS = "DELETE FROM coordinates"
    client.query(deleteDataMeasurement).then((result: any) => {
        console.log(result);
    }).catch((reason: any) => {
        console.log(reason);
    })
    client.query(deleteDataGPS).then((result: any) => {
        console.log(result);
    }).catch((reason: any) => {
        console.log(reason);
    })
};

