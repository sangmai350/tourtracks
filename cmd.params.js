var params = {};
process.argv.slice(3).forEach(function (arg) {
    let flag = arg.split('=')[0];
    let value = arg.split('=')[1];
    let name = flag.replace('--', '');

    params[name] = value;
});

module.exports = params;