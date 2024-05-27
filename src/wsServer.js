import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { rawData } from "./data/index.js";
import { decode } from "./utils/index.js";
import { WordGenerator } from "./wordGenerator.js";

const wordGenerator = new WordGenerator(rawData);

const wsApp = express();
const wsHttpServer = createServer(wsApp);
const wss = new WebSocketServer({ server: wsHttpServer });

const handleConnectionClose = () => {
  console.log("closed");
};

const handleMessage = async (rawData) => {
  const message = decode(rawData);

  if (message === "start") {
    wordGenerator.start();
  }

  if (message === "stop") {
    wordGenerator.stop();
  }
};

wss.on("connection", (ws) => {
  ws.on("close", handleConnectionClose);
  ws.on("message", handleMessage);
  wordGenerator.onBoxUpdated((word) => {
    ws.send(word);
  });
});

export default wsHttpServer;
