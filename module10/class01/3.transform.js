import { Readable, Transform } from "stream";
import { createWriteStream } from "fs";

const readable = Readable({
  read() {
    for (let i = 0; i < 1e4; i++) {
      const person = {
        id: Date.now() + i,
        name: `Carlos-${i}`,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;

    cb(null, "id,name\n".concat(chunk));
  },
});

const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;

    cb(null, result);
  },
});

readable.pipe(mapFields).pipe(mapHeaders).pipe(createWriteStream("my.csv"));
