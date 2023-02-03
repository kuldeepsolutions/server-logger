require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const {
  errorLogger,
  successLogger
} = require("./middlewares/logCreator");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
// set the local time zone

app.use(
  morgan("default", {
    stream: {
      write: (message) => {
        successLogger(message);
      },
    },
  })
);
// check if the app is an error or not
app.use((req, res, next) => {
  const { statusCode } = res;
  if (statusCode >= 400) {
    morgan("default", {
      stream: {
        write: (message) => {
          errorLogger(message);
        },
      },
    });
  }
  next();
});

app.get("/", async (req, res) => {
    try {
        console.log(http.IncomingMessage.on("error", (err) => {
            console.log(err);
        }));
            
    res.status(200).send("Hello World");
  } catch (error) {
        console.log(error);
        errorLogger(error);
    res.status(500).send(error);
  }
});

// get port from environment and store in Express.
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// set the development environment
app.set("env", "development");

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
