const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./lib/Database");

const setup = async () => {
  const db = await new Database().init().catch(error => {
    console.error(error);
    process.exit(1);
  });

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.set("json spaces", 4);

  const DeviceModel = require("./models/devices")(db);
  const SiteModel = require("./models/sites")(db);

  require("./api/devices")(app, DeviceModel);
  require("./api/sites")(app, SiteModel);

  require("./middlewares")(app);

  const server = app
    .listen(3000, "0.0.0.0", () => {
      console.info("server listening on port: 3000");
    })
    .on("request", req => {
      console.info(req.method, req.baseUrl + req.url);
    })
    .on("error", err => {
      console.error(err);
    });

  // the current application as is does not have a clean shutdown (not a big
  // deal in a toy but a problem in a production application) This will stop
  // accepting new connections, finish off current connections and then shutdown.
  // https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html
  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Http server pool drained and server is ready for shutdown.");
      // close db connections here
    });

    const thirtySeconds = 30 * 1000;
    setTimeout(function() {
      console.error(
        "Could not drain the request pool in time, forcefully shutting down"
      );
      process.exit(1);
    }, thirtySeconds);
  });
};

setup();
