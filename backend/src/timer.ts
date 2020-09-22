import { AnyJson } from 'ts-postgres';
import { addmeasurement2db } from './database';

let intervalMeasurement: NodeJS.Timeout;

export let callEverySecond = (finished: () => void ): void => {
    let counter = 1;
    setTimeout(finished, 40000   );
    
    intervalMeasurement = setInterval(() => {
        addmeasurement2db();
        counter++;
    }, 30000);
}; 

let finished = (): void => {
    console.log('Measurement sucessfully made!');
    clearInterval(intervalMeasurement);
}

callEverySecond(finished);
