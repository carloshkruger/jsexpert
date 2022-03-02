import { Duplex, Transform } from "stream";

let count = 0;

const server = Duplex({
  objectModel: true,
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Carlos[${count}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
  write(chunk, encoding, cb) {
    console.log(`[writable] saving ${chunk}`);
    cb();
  },
});

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

server.write("[duplex] hey this is a writable!\n");

server.push("[duplex] hey this is also a readable!\n");

server.pipe(transformToUpperCase).pipe(server);
