const express = require("express");
import { routes } from "../../common/constants";
import { mapTodos } from "../../common/helpers";

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

  return router;
};

export default getRouter;
