import { AnyJson } from 'ts-postgres';
import { addmeasurement2db } from './database';

let intervalMeasurement: NodeJS.Timeout;

export let callEverySecond = (finished: () => void ): void => {
     intervalMeasurement = setInterval(() => {
        addmeasurement2db();
    }, 1800000);
}; 

let finished = (): void => {
    console.log('Measurement sucessfully made!');
    clearInterval(intervalMeasurement);
}

callEverySecond(finished);
