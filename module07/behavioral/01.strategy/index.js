import { ContextStrategy } from "./base/contextStrategy.js";
import { MongoDbStrategy } from "./strategies/mongoDbStrategy.js";
import { PostgresStrategy } from "./strategies/postgresStrategy.js";

const postgresConnectionString = 'postgres://carlos:123@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDbConnectionString = 'mongodb://carlos:123@localhost:27017/heroes'
const mongoDbContext = new ContextStrategy(new MongoDbStrategy(mongoDbConnectionString))
await mongoDbContext.connect()

const data = [
  {
    name: 'carlos',
    type: 'transaction'
  },
  {
    name: 'maria',
    type: 'activityLog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDbContext
}

for (const { type, name } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
