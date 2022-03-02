import { Writable, PassThrough } from "stream";
import axios from "axios";

const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
  axios({
    method: "GET",
    url: API_01,
    responseType: "stream",
  }),
  axios({
    method: "GET",
    url: API_02,
    responseType: "stream",
  }),
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, encryption, callback) {
    const data = chunk.toString().replace(/\n/, "");
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    callback();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false });
    current.on("end", () => items.every((s) => s.ended) && prev.end());
    return prev;
  }, new PassThrough());
}

const streams = merge(results).pipe(output);
