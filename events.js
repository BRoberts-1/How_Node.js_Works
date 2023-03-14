const EventEmitter = require("events");
const http = require("http");

// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const myEmitter = new Sales();

// myEmitter.on("newSale", () => {
//   console.log("There was a new sale!");
// });

// myEmitter.on("newSale", () => {
//   console.log("Costume name: Jonas");
// });

// myEmitter.on("newSale", (stock) => {
//   console.log(`There are now ${stock} items left in stock.`);
// });

// myEmitter.emit("newSale", 9);

// The Http module is completely based on events, and also, most of the modules inherit from the emitter class.

//////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😇");
});

server.on("close", () => {
  console.log("Server closed.");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});

////////////////////////////////////
// Section 36 - Introduction to Streams

// Streams - Used to process (read and write) data piece by piece (ie chunks), without completing the whole read or write operation, and therefore without keeping all the data in memory.

// E.g. YouTube or Netflix - both are streamed, ie data comes in chunks, piece by piece, and you don't have to wait for the whole file to download before you watch something.

// Perfect for handling large volumes of data e.g. videos

// More efficient data processing in terms of memory (i.e. no need to keep all data in memory) and in terms of time(i.e. we don't have to wait until all the data is available)

// Four types of Streams in Node.js:
// 1) Readable Streams -Important -Streams to read ie consume data e.g http requests, fs read streams(big files). Important events: data(event emitted when there is data to consume), end(emitted when there is no more data to consume.) Important functions: pipe()-to pipe data to certain places, read()-to read the data
// 2) Writable Streams -Important -Streams to which we can write data e.g. http responses, fs write streams. Important events: drain, finish. Important functions: write(), end().
// 3) Duplex Streams -Streams that are both readable and writable e.g. net web socket(open channel between client and server to exchange data, like a porthole.)
// 4) Transform Streams -Duplex streams that transform data as it is written or read e.g. zlib Gzip creation

// All Streams are instances of the EventEmitter class i.e. can emmit event and can listen to events.

// The examples above are for Streams that are already implemented and just need to be consumed, as opposed to created and then consumed. Most work is just to consume data.
