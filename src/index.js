import express from "express";
import { WebSocketServer } from "ws";
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

const httpServer = app.listen(3000, () => {
  console.log("Listening on port 3000");
});


const wss = new WebSocketServer({ server: httpServer });

let interval2 = null
wss.on("connection", (ws) => {
  ws.on("close", () => {
    console.log('closed')
  })

  ws.on("message", (rawData) => {
    if (currentIndex >= dataArr.length) {
      currentIndex = 0;
    }

    const message = decode(rawData)
    if(message === "start") {
      interval2 = setInterval(() => {
        ws.send(getNextWord())
      }, 100)
    }

    if(message === "stop") {
      clearInterval(interval2)
    }
  })
});


// function to convert websocket raw data to string
function decode(data) {
  return new TextDecoder("utf-8").decode(data);
}