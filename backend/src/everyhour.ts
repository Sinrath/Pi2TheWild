import { addTemp2db } from './database';

function callEverySecond() {
    addTemp2db();
};

setInterval(callEverySecond, 5000);