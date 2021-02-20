const express = require("express");
const bodyParser = require("body-parser");
import initServer from "./init-server";
import getRouter from "./routes";
import Pool from "./db/pool";

let PORT = process.env.port || 3000;
if (PORT === 3000) {
  require("dotenv").config();
}

const dbConfig = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  database: process.env.db,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD
};
Pool.connect(dbConfig).then(() => {
  const router = getRouter(Pool);

  const middlewares = [
    express.static("dist"),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    router
  ];

  let server = initServer(middlewares);

  server.get("/", (_, res) => {
    return res.send(`<!DOCTYPE html>
                        <style>
                        html,body{ width: 98vw; height: 96vh; font-family: Verdana, sans-serif;  }
                        #root{ height: 100%; }
                        </style>
                        <html>
                          <head></head>
                          <body>
                          <div id="root" />
                            <script src="/bundle.js"></script>
                          </body>
                        </html>
                      `);
  });

  server.listen(PORT, function () {
    console.log(`server listening on port: ${PORT}`);
  });
});
