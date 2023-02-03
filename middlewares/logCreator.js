const fs = require("fs");
const { type } = require("os");
const path = require("path");

// create a write stream (in append mode)
exports.successLogger = (message) => {
  const messageData = message.split("-").join("").split('"').join("");
  const dateTime = message
    .split("-")
    .join("")
    .split('"')[0]
    .split("[")[1]
    .split("]")[0];

  const newDate = new Date(dateTime).toLocaleString();
  const newMessage = messageData.replace(dateTime, newDate);
  fs.writeFileSync(
    path.join(__dirname, "../logs/successLog.log"),
    newMessage + "\n",
    { flag: "a" }
  );
};

exports.errorLogger = (message) => {
   
    if (typeof message === "object") {
    fs.writeFileSync(
      path.join(__dirname, "../logs/errorLog.log"),
      message + "\n",
      { flag: "a" }
    );
  } else {
    const messageData = message.split("-").join("").split('"').join("");

    const dateTime = message
      .split("-")
      .join("")
      .split('"')[0]
      .split("[")[1]
      .split("]")[0];

    const newDate = new Date(dateTime).toLocaleString();
    const newMessage = messageData.replace(dateTime, newDate);
    fs.writeFileSync(
      path.join(__dirname, "../logs/errorLog.log"),
      newMessage + "\n",
      { flag: "a" }
    );
  }
};
