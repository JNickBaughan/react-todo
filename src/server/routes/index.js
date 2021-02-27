const express = require("express");
import { routes } from "../../common/constants";

const getRouter = (pool) => {
  const router = express.Router();

  router.get(routes.GET_TODOS, (_, res) => {
    pool
      .query("SELECT * FROM todos.todo")
      .then((results) => {
        return res.send(results.rows);
      })
      .catch((e) => {
        console.dir(JSON.stringify(e));
        return res.send([]);
      });
  });

  if (process.env.test) {
    router.post(routes.TEST_SEED, (_, res) => {
      pool
        .query(
          `INSERT INTO todos.todo(
               id, complete, todo)
               VALUES (1, false, 'clean kitchen');`
        )
        .then(() => {
          pool.query(
            `INSERT INTO todos.todo(
               id, complete, todo, parent)
               VALUES (2, false, 'do dishes', 1);`
          );
          res.status(200).send("OK");
        });
    });

    router.post(routes.TEST_CLEANUP, (_, res) => {
      pool
        .query(`DELETE FROM todos.todo`)
        .then((results) => {
          return res.send(results.rows);
        })
        .catch((e) => {
          console.dir(JSON.stringify(e));
          return res.send([]);
        });
    });
  }

  return router;
};

export default getRouter;
