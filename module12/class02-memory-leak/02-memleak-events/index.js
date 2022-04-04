import { createServer } from "http";

import Events from "events";
import { randomBytes } from "crypto";

const myEvent = new Events();

function onData() {
  randomBytes(10000);
}
myEvent.on("data", onData);
createServer((request, response) => {
  myEvent.emit("data", Date.now());
  response.end();
}).listen(3000, () => console.log("server running"));
