const express = require("express");

export const initServer = (middlewares) => {
  let server = express();

  server.use(middlewares);

  return server;
};

export default initServer;
