import { readFileSync } from 'fs';

export const gpsNow = readFileSync("/home/pi/Pi2TheWild/backend/gps.txt", "utf-8");
console.log(gpsNow);
