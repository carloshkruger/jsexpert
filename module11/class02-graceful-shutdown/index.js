import { MongoClient } from "mongodb";
import { createServer } from "http";
import { promisify } from "util";

async function dbConnect() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  console.log("MongoDB is connected");
  const db = client.db("comics");

  return {
    dbCollection: { heroes: db.collection("heroes") },
    client,
  };
}

const { client, dbCollection } = await dbConnect();

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);

      await dbCollection.heroes.insertOne({
        ...hero,
        updateAt: new Date().toISOString(),
      });

      const heroes = await dbCollection.heroes.find().toArray();

      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    } catch (error) {
      console.log("a request error has happened", error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: "Internal server error" }));
    } finally {
      response.end();
    }
  }
}

// curl -i localhost:3000 -X POST --data '{"name": "Batman"}'

const server = createServer(handler).listen(3000, () =>
  console.log("server online. process: ", process.pid)
);

const onStop = async (signal) => {
  console.info(`signal received ${signal}`);

  console.log("closing http server");
  await promisify(server.close.bind(server))();
  console.log("http server has closed");

  console.log("closing mongodb server");
  await client.close();
  console.log("mongodb server has closed");

  // 0 is everything ok, 1 is error
  process.exit(0);
};

// SIGINT => CTRL + C
// SIGTERM => kill
["SIGINT", "SIGTERM"].forEach((event) => process.on(event, onStop));
