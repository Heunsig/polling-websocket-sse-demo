import express from "express";
import { data } from "./data.js";

const app = express();
app.use(express.static("public"));

const dataArr = data.split("");
let currentIndex = 0;

function getNextWord() {
  if (currentIndex >= dataArr.length) {
    currentIndex = 0;
  }
  const word = dataArr[currentIndex];
  currentIndex += 1;
  return word;
}

app.get("/data", (_, res) => {
  const word = getNextWord();
  res.json({ message: word });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
