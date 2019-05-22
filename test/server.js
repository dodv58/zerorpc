const zerorpc = require('../middleware');

const server = new zerorpc.Server({
    "sqrt": function(args) {
        return Math.sqrt(args);
    }
});

server.bind("127.0.0.1:9999");
