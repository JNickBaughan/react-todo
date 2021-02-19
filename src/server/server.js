const express = require("express");
const bodyParser = require("body-parser");

import pool from "./pool";
import { mapTodos } from "../helpers";

let PORT = process.env.port || 3000;
if (PORT === 3000) {
  require("dotenv").config();
}

const todos = [
  {
    id: 1,
    todo: "Clean attic",
    complete: false
  },
  {
    id: 2,
    todo: "add shelves in attic",
    complete: false,
    parent: 1
  },
  {
    id: 3,
    todo: "add shelves beside attic vent",
    complete: false,
    parent: 2
  },
  {
    id: 4,
    todo: "add shelves by attic door",
    complete: false,
    parent: 2
  },
  {
    id: 5,
    todo: "move old clothes",
    complete: false,
    parent: 1
  },
  {
    id: 6,
    todo: "finish Kitchen renovations",
    complete: false
  },
  {
    id: 7,
    todo: "tile backsplash",
    complete: false,
    parent: 6
  },
  {
    id: 8,
    todo: "paint wall",
    complete: false,
    parent: 6
  }
];

pool
  .connect({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD
  })
  .then((t) => {
    let server = express();
    const middlewares = [
      express.static("dist"),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true })
    ];

    server.use(middlewares);

    server.get("/todos", (_, res) => {
      res.send(mapTodos([...todos]));
    });

    server.get("/", (_, res) => {
      return res.send(`<!DOCTYPE html>
                        <style>
                        html,body{ width: 98vw; height: 96vh; font-family: Verdana, sans-serif;  }
                        #root{ height: 100%; }
                        </style>
                        <html>
                          <head></head>
                          <body>
                          ${JSON.stringify(t.rows)}
                          <div id="root" />
                            <script src="/bundle.js"></script>
                          </body>
                        </html>
                      `);
    });

    server.listen(PORT, function () {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch((e) => console.log(JSON.stringify(e)));
