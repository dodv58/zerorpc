rpc middleware using zeromq
============

This is a communication layer for distributed systems. 

To use the package:

Make sure you have [ZeroMQ](https://github.com/zeromq/libzmq) installed.

Servers
-------

To create a new server:

```js
var middleware = require("../middleware");
var server = new middleware.Server(context);
```

The constructor takes in a context object with the functions to expose
over RPC. Only functions that do not have a leading underscore will be
exposed.

Methods:

* `bind(endpoint)` - Binds the server to the specified ZeroMQ endpoint.
* `connect(endpoint)` - Connects the server to the specified ZeroMQ endpoint.
* `close()` - Closes the ZeroMQ socket.

Full example:

```js
var middleware = require("../middleware");

const server = new middleware.Server({
    "sqrt": function(args) {
        return Math.sqrt(args);
    }
});

server.bind("tcp://127.0.0.1:9999");

```

Clients
-------

To create a new client:

```js
var middleware = require("../middleware");
var client = new middleware.Client();
```

Methods:

* `connect(endpoint)` - Connects the client to the specified ZeroMQ endpoint.
* `close()` - Closes the ZeroMQ socket.
* `invoke(method, arguments, callback)` - Invokes a remote method.
  * `method` is the method name.
  * `arguments` are a list of arguments passed to the method as a object
  * `callback` is a method to call when there is an update. 

Full example:

```js
var middleware = require("../middleware");

var client = new middleware.Client();
client.connect("tcp://127.0.0.1:9999");


client.invoke('sqrt', 8, function(reply){
    console.log("Received from server: " + reply);
})
```
