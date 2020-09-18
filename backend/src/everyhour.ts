import { AnyJson } from 'ts-postgres';
import { addmeasurement2db } from './database';
/*
function callEverySecond() {
    addmeasurement2db();
};

setInterval(callEverySecond, 10000);
*/
let intervalMeasurement: NodeJS.Timeout;

export let callEverySecond = (finished: () => void ): void => {
    let counter = 1;
    setTimeout(finished, 300000);
    //finished();

    intervalMeasurement = setInterval(() => {
        addmeasurement2db();
        counter++;
    }, 60000);
}; 

let finished = (): void => {
    console.log('Measurement sucessfully made!');
    clearInterval(intervalMeasurement);
}

callEverySecond(finished);
