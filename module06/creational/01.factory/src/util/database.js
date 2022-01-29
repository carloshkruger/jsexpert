class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString
  }

  async connect() {
    return this
  }

  async find() {
    return [{ name: 'Carlos' }]
  }
}

module.exports = Database