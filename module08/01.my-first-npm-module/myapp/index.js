import FluentSQLBuilder from "@carloshkruger/fluentsql";

import database from './database/data.json'

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['name'])
  .limit(3)
  .build()

console.log({ result })