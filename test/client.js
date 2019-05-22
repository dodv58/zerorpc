const zerorpc = require('../middleware');

const client = new zerorpc.Client();
client.connect("localhost:9999");

client.invoke('sqrt', 8, function(reply){
    console.log("Received from server: " + reply);
})
