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
                        
                        /* The container */
                        .container {
                          display: block;
                          position: relative;
                          padding-left: 35px;
                          margin-bottom: 12px;
                          cursor: pointer;
                          font-size: 22px;
                          -webkit-user-select: none;
                          -moz-user-select: none;
                          -ms-user-select: none;
                          user-select: none;
                          max-width: fit-content;
                        }

                        /* Hide the browser's default checkbox */
                        .container input {
                          position: absolute;
                          opacity: 0;
                          cursor: pointer;
                          height: 0;
                          width: 0;
                        }

                        /* Create a custom checkbox */
                        .checkmark {
                          position: absolute;
                          top: 0;
                          left: 0;
                          height: 25px;
                          width: 25px;
                          background-color: #eee;
                        }

                        /* On mouse-over, add a grey background color */
                        .container:hover input ~ .checkmark {
                          background-color: #ccc;
                        }

                        /* When the checkbox is checked, add a blue background */
                        .container input:checked ~ .checkmark {
                          background-color: #2196F3;
                        }

                        /* Create the checkmark/indicator (hidden when not checked) */
                        .checkmark:after {
                          content: "";
                          position: absolute;
                          display: none;
                        }

                        /* Show the checkmark when checked */
                        .container input:checked ~ .checkmark:after {
                          display: block;
                        }

                        /* Style the checkmark/indicator */
                        .container .checkmark:after {
                          left: 9px;
                          top: 5px;
                          width: 5px;
                          height: 10px;
                          border: solid white;
                          border-width: 0 3px 3px 0;
                          -webkit-transform: rotate(45deg);
                          -ms-transform: rotate(45deg);
                          transform: rotate(45deg);
                        }

                        .plus {
                          display:inline-block;
                          width:50px;
                          height:50px;
                          position: absolute;
                            bottom: -9px;
                          background:
                            linear-gradient(#fff,#fff),
                            linear-gradient(#fff,#fff),
                            #000;
                          background-position:center;
                          background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
                          background-repeat:no-repeat;
                        }

                        .alt {
                          background:
                            linear-gradient(#000,#000),
                            linear-gradient(#000,#000);
                          background-position:center;
                          background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
                          background-repeat:no-repeat;
                        }
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
