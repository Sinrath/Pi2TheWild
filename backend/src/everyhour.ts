import { addmeasurement2db } from './database';

function callEverySecond() {
    addmeasurement2db();
};

setInterval(callEverySecond, 60000);