// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require('pg');

class Database {
  constructor(){
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '1234',
      port: 5432,

    });
  }
  async query(text, params) {
    return await this.pool.query(text, params);
  }
}


module.exports = new Database();