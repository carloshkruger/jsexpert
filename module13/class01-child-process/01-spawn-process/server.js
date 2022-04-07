import { createServer } from "http";
import { randomUUID } from "crypto";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

async function handle(request, response) {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(request, createWriteStream(fileName));

  response.end("upload with success");
}

createServer(handle).listen(3000, () => console.log("server online"));
