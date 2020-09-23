var { PythonShell } = require('python-shell');

export let gpsValues = (): void => {
<<<<<<< HEAD
    PythonShell.run('gps.py', function (err: any) {
        if (err) throw err;
        console.log('finished');
    }, function (err: any, output: any) {
        if (err) throw (err);
        console.log(output);
    })
};
=======
    PythonShell.run('gps.py', function (err:any) {
    if (err) throw err;
    console.log('finished');
})};
>>>>>>> 0d6c060b644fcfa32470484e04a35b787003112a
