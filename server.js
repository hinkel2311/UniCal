scriptPath = null;

server = function () {
    var express = require('express');
    var Index = require('./index');
    var Static = require('./static');
    var API = require('./api/api.js');
    var bodyParser = require('body-parser');
    var port = 1339;
    this.router = express();

    var arguments = process.argv;
    console.log(arguments);

    for (var pos in arguments) {
        var arg = arguments[pos];
        if (arg == '-port') {
            port = arguments[parseInt(pos) + 1];
        }
        if (arg == '-sp') {
            scriptPath = arguments[parseInt(pos) + 1];
            var re = /\/$/
            if (!re.test(scriptPath)) {
                scriptPath += '/';
            }
        }

    }

    if (!scriptPath) {
        throw new Error('You must enter a script path.  -sp <path to script>');
    }
    
    
    
    this.router.use(bodyParser.urlencoded({extended: true}));
    this.router.use(bodyParser.json());

    this.index = new Index(this.router);
    this.static = new Static(this.router);
    this.api = new API(this.router);
    this.router.listen(port);

    console.log('unical node online on port ' + port);

};


new server();

module.exports = server;

