import { createServer } from "http";
import { BusinessError } from "./errors/businessError.js";
import { statusCodes } from "./util/httpStatusCodes.js";

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError("Age must be higher than 20");
  }

  if (hero.name?.length < 4) {
    throw new BusinessError("Name length must be higher than 4");
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      response.writeHead(statusCodes.OK);
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(error.message);
        continue;
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
    } finally {
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log("server is running"));

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "20"}'
 */
