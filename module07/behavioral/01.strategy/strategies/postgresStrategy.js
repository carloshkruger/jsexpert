import Knex from 'knex'

export class PostgresStrategy {
  #instance

  constructor(connectionString) {
    this.connectionString = connectionString
    this.tableName = 'warriors'
  }

  async connect() {
    this.#instance = Knex({
      client: 'pg',
      connection: this.connectionString
    })

    return this.#instance.raw('select 1+1 as result')
  }

  async create(item) {
    return this.#instance.insert(item).into(this.tableName)
  }

  async read(item) {
    return this.#instance.select().from(this.tableName)
  }
}