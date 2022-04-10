import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import csvtojson from "csvtojson";
import { Transform, Writable } from "stream";
import { setTimeout } from "timers/promises";

const database = process.argv[2];

async function onMessage(message) {
  const firstTimeRan = [];

  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, encoding, callback) {
        const data = JSON.parse(chunk);

        if (data.Name !== message.Name) {
          return callback();
        }

        if (firstTimeRan.includes(message.Name)) {
          return callback(null, message.Name);
        }

        firstTimeRan.push(message.Name);

        callback();
      },
    }),
    Writable({
      write(chunk, encoding, callback) {
        if (!chunk) {
          return callback();
        }

        process.send(chunk.toString());

        callback();
      },
    })
  );
}

process.on("message", onMessage);

// console.log(`I'am ready! ${process.pid}`);

// indicates that the sub-process can be killed after 5s of inactivity
await setTimeout(10000);
process.channel.unref();
