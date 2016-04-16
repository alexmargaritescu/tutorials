var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/users/list', function (req, res) {
    fs.readFile( __dirname + '/' + 'users.json', 'utf8',
        function (err, data) {
            console.log('Request ' + req.url);
            sleep(2000);
            console.log(data);
            res.send(data);
    });
});

server.listen(8081, function () {
    console.log('User REST app listening at http://%s:%s',
        server.address().address,
        server.address().port);
});

var sleep = function (delay) {
    var start = new Date().getTime();
    var now = start, end = start + delay;
    while (now < end) {
        var last;
        if (((now - start) % 1000) === 0) {
            if (now - start !== last) {
                console.log('Waiting...');
            }
            last = now - start;
        }
        now = new Date().getTime();
    }
};
