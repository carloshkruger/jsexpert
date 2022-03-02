// process.stdin
//   .pipe(process.stdout)
//   .on("data", (msg) => console.log("data", msg.toString()));

// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from "http";
import { createReadStream, readFileSync } from "fs";

http
  .createServer((req, res) => {
    // BAD PRACTICE
    // const file = readFileSync("big.file").toString();
    // res.write(file);
    // res.end();

    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => console.log("server running"));

// curl http://localhost:3000 -o output.txt
