var { PythonShell } = require('python-shell');

export let gpsValues = (): void => {
    PythonShell.run('gps.py', function (err: any) {
        if (err) throw err;
        console.log('finished');
    }, function (err: any, output: any) {
        if (err) throw (err);
        console.log(output);
    })
};
