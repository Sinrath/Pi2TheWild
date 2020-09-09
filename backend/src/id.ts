import { readFileSync } from 'fs';

const data = readFileSync("/home/pi/Pi2TheWild/ID/id.txt", "utf-8");
console.log(data);
/*const getId = () =>{
    let data = readFileSync(path.join(__dirname, "../src/data.txt"));
    console.log(data);
};*/

//let ID = getId();
//console.log(ID);