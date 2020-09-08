import {Client, Connect} from 'ts-postgres'

const client = new Client ({
    user : 'postgres',
    host : 'clt-lab-t-6172',
    database : 'Pi2TheWild',
    password: '1234',
    port : 5432
    });

const datum:Date = new Date();
console.log(datum)
    
client.connect().then( (connect: Connect) => {
    console.log(connect);
}).catch((reason:any) => {
    console.log(reason);  
});

let queryMessung = 'select * from messung;';

client.query(queryMessung).then((result:any)=>{
    console.log(result);
}).catch((reason:any)=>{
    console.log(reason);
})

