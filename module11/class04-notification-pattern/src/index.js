import { createServer } from "http";
import HeroEntity from "./hero-entity.js";
import { statusCodes } from "./util/httpStatusCodes.js";

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data);
      const hero = new HeroEntity(parsedData);
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(hero.notification.join(", "));
        continue;
      }
      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log("server is running"));

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "20"}'
 */
