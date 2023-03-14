// Section 37 - Streams in Practice
// Scenario, we need to read a large text file and send it to the client:

const fs = require("fs");
// Shortcut way to code up a server
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 - Not good, because file is so large, it takes too long to load and eats up Node.js resource and can crash. It doesn't work for production.
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams - We don't need to read the data in our file and store it in a variable like you see above. We will just read a chunk and send it to the client etc. However, there is a problem with this approach as well. We are reading the data and writing the data, and in our case, the data is being read faster than it can be written as a response to the client. This is called "back pressure". (read > written reponse)
  // Always have to use the "data" and the "end" events to read the data streamed to the user. There is another event to listen for and that is the 'error' event.
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found!");
  // });

  // Solution 3 - Is to use the pipe() function to funnel the data directly to the client(it pipes the output of a readable stream right into the input of a writable stream - it automatically fixes the backpressure by handling the speed of the data coming in vs going out.)
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); // the res is the writeable stream(or duplex or transform stream)(i.e. readableSource.pipe(writeableDestination))
});

// To start our created server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});

// Section 38 - How Requiring Modules Really Works

// The CommonJs Module System -

// Each JS file is treated as a separate module

// Node.js uses the CommonJS module system: require() exports or module.exports;

// Also the ES(EcmaScript) module system used in browser: import/export;
// These are two different module systems: 1)CommomJs for Node.js 2)ES module system for browsers.

// There have been attempts to implement ES modules into node.js using the .mjs file extension, but it hasn't caught on yet.

// Each module in Node.js has access to the require() function, where does it come from?

// What happens when we require() a module?
// 1) Resolving & Loading - Path to module is resolved and the module is loaded.
// 2) Wrapping - a process occurs that is called 'wrapping'.
// 3) Execution -
// 4) Returning Exports -
// 5) Caching -

// 1) Resolving and Loading - 3 types of modules can be loaded - 1.Core Modules e.g. require('http); 2.Developer modules e.g. require('./lib/controller'); 3. 3rd-part modules(from NPM) e.g. require('express');

// Path Resolving Steps by Node.js: How Node.js decides which module to load.
// 1) Starts with the core modules.
// 2) If begins with './' or '../' Tries to load developer module;
// 3) If no file found, then try to find folder with index.js in it;
// 4) Else, go to node_modules/ and try to find the module there

// 2) Wrapping - once the modules are loaded then it is 'wrapped' in a special function. An IIFE wraps the module by the Node.js runtime. Node.js doesn't execute the code directly, rather it is wrapped in the body of the IIFE which gives it access to many objects that are passed into this function.(exports, require, module, __filename, __dirname) These are like global variable that are injected into each and every module.
// This also keeps the top-level variables that we define in our modules private i.e. scoped only to the current module so it is not leaked to the global object.

// Here are all the objects our modules get:
// require: function to require modules;
// module: reference to the current module;
// exports: a reference to module.exports, used to export object from a module;
// __filename: absolute path of the current module's file;
// __dirname: directory name of the current module.

// 3) Execution - the code in the wrapper function gets executed by Node's runtime.

// 4) Returning Exports - require function returns exports of the required module i.e. module.exports is the returned object(important!) e.g. Module 1 requires module 2, module 2 then exports to module 1 etc.

// Use module.exports to export one single variable e.g. one class or one function (module.exports = Calculator);
// Use exports to export multiple named variables e.g. exports.add = (a, b) => a + b; and maybe a few others like exports.multiply, exports.subtract etc.
// This is how we export and import data from one module into another.
// This is why we usually assign the result of a require() function call to a new variable i.e. so we can save the returned exports.

// 5) Caching - Modules are cached after the first time they are loaded so that everything stays the same.
