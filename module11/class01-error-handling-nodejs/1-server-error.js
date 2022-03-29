import http from "http";

let count = 0;

async function handler(req, res) {
  try {
    if (count % 2 === 0) {
      await Promise.reject("error inside handler");
    }

    for await (const data of req) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject("error inside for");
        }
        res.end();
      } catch (error) {
        console.log("a request error has happened", error);
        res.writeHead(500);
        res.write(JSON.stringify({ message: "internal server error" }));
        res.end();
      }
    }
  } catch (error) {
    console.log("a server error has happened", error);
    res.writeHead(500);
    res.write(JSON.stringify({ message: "internal server error" }));
    res.end();
  }
}

http.createServer(handler).listen(3000, () => console.log("running at 3000"));
