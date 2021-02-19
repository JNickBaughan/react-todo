import pg from "pg";

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT * FROM todos.todo");
  }
}

export default new Pool();
