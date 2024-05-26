import express from "express";
import { startGeneratingWord, stopGeneratingWord } from "./data/index.js";

const app = express();
app.use(express.static("public"));

let box = [];
const boxProxy = new Proxy(box, {
  set: function (target, prop, value) {
    return Reflect.set(...arguments);
  },
});

app.get("/start", (_, res) => {
  startGeneratingWord((word) => {
    boxProxy.push(word);
  });

  res.status(200).send('Success');
});

app.get("/stop", (_, res) => {
  stopGeneratingWord();
  res.status(200).send('Success');
});

app.get("/data", async (_, res) => {
  const words = boxProxy.slice();
  // boxProxy.splice(0, boxProxy.length);
  boxProxy.length = 0;
  const message = words.join("");
  res.json({ message });
});

export default app;
