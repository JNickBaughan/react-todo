import pg from "pg";

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1");
  }

  query(query) {
    return this._pool.query(query);
  }
}

export default new Pool();
