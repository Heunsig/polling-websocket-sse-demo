import express from "express";
import { data } from "./data.js";

const app = express();
app.use(express.static("public"));

app.get("/ping", (_, res) => {
  res.send("pong");
});

let interval = null;

// split every single character in the data
const dataArr = data.split("");
let result = [];
let i = 0;

function startPolling() {
  interval = setInterval(() => {
    if (dataArr[i] === "END") {
      clearInterval(interval);
      return;
    }

    if (i < dataArr.length) {
      result.push(dataArr[i]);
      i++;
    }
  }, 100);
}

app.get("/data", (_, res) => {
  if (!interval) {
    startPolling();
  }

  if (result.length === dataArr.length) {
    result = [];
    i = 0;
  }

  res.json({ message: result.join("") });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
