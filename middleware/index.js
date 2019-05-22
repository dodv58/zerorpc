'use strict'

const zmq = require("zeromq");


function Client() {
    this.sock = null;
    this.callbacks = [];
    const _self = this;
    this.connect = function(host) {
        _self.sock = zmq.socket('req');
        _self.sock.connect('tcp://' + host);
        _self.sock.on('message', reply => {
            if(_self.callbacks.length > 0){
                const cb = _self.callbacks.shift();
                cb(reply);
            }
        })
    }
    this.invoke = function(funcName, args, cb){
        console.log(funcName + " is invoked");
        const pl = {
            func: funcName,
            args: args
        }
        _self.sock.send(JSON.stringify(pl));
        _self.callbacks.push(cb);
    }
}

function Server(context){
    this.sock = null;
    const _self = this;
    this.bind = function(host) {
        _self.sock = zmq.socket('rep');
        _self.sock.bind('tcp://' + host, function(err){
            if(err){
                console.log("bind err: " + err);
            }
            else {
                console.log("Server is running on " + host);
            }
        });
        _self.sock.on('message', (req) => {
            console.log("on message "+ req);
            const reqObj = JSON.parse(req);
            const result = _self.methods[reqObj.func](reqObj.args);
            _self.sock.send(result);
        }) 
    }
    this.methods = context;
}

exports.Client = Client
exports.Server = Server
