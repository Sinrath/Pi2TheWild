var {PythonShell} = require('python-shell');

export let gpsValues = (): void => {
    PythonShell.run('gpsmock.py', function (err:any) {
    if (err) throw err;
    console.log('finished');
})};