import { GrovePi } from "./sensors";

const sensor = new GrovePi(1);

//version 1.0

sensor.measureTemperature()
	.then((temp) => console.log(`Temperature is ${temp}`));

sensor.measureHumidity()
	.then((humidity) => console.log(`Humidity is ${humidity}`));

new Promise((resolve) => setTimeout(() => resolve(), 1000))
	.then(() => sensor.measureAirQuality())
	.then((quality) => console.log(`Air qualitiy is ${quality}`));

sensor.measureBarometricPressure(438.0)
	.then((pressure) => console.log(`Barometric pressure is ${pressure}`));
