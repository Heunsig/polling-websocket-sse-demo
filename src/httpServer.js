import express from "express";
import { rawData } from "./data/index.js";
import { WordGenerator } from "./wordGenerator.js";

const wordGenerator = new WordGenerator(rawData);

const app = express();
app.use(express.static("public"));

app.get("/start", (_, res) => {
  wordGenerator.start();
  res.status(200).send("Success");
});

app.get("/stop", (_, res) => {
  wordGenerator.stop();
  res.status(200).send("Success");
});

app.get("/data", async (_, res) => {
  const message = wordGenerator.getWordsFromBox()
  res.json({ message });
});

export default app;
