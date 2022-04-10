import { fork } from "child_process";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import csvtojson from "csvtojson";
import { Writable } from "stream";

const database = "./data/All_Pokemon.csv";
const backgroundTaskFile = "./src/background-task.js";
const processes = new Map();
const PROCESS_COUNT = 30;
const replications = [];

for (let index = 0; index < PROCESS_COUNT; index++) {
  const child = fork(backgroundTaskFile, [database]);

  child.on("exit", () => {
    console.log(`process ${child.pid} exited`);
    processes.delete(child.pid);
  });
  child.on("error", () => {
    console.log(`process ${child.pid} has an error`, error);
    process.exit(1);
  });

  child.on("message", (message) => {
    if (replications.includes(message)) {
      return;
    }
    console.log(`${message} is replicated`);
    replications.push(message);
  });

  processes.set(child.pid, child);
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.length) {
      index = 0;
    }
    return array[index++];
  };
}

const getProcess = roundRobin([...processes.values()]);

console.log(`starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, encoding, callback) {
      const chosenProcess = getProcess();
      chosenProcess.send(JSON.parse(chunk));
      callback();
    },
  })
);
