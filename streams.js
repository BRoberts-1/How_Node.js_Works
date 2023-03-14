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
