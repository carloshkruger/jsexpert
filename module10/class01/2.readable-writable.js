import { Readable, Writable } from "stream";

const readable = Readable({
  read() {
    this.push("Hello world 1");
    this.push("Hello world 2");
    this.push("Hello world 3");
    this.push(null);
  },
});

const writable = Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());

    cb();
  },
});

readable.pipe(writable);
