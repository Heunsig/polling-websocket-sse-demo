import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { startGeneratingWord } from "./data/index.js";
import { decode } from "./utils/index.js";

const wsApp = express();
const wsHttpServer = createServer(wsApp);
const wss = new WebSocketServer({ server: wsHttpServer });

const handleConnectionClose = () => {
  console.log("closed");
};

const handleMessage = async (rawData) => {
  const message = decode(rawData);

  if (message === "start") {
    startGeneratingWord(() => {
      ws.send(word);
    });
  }

  if (message === "stop") {
    stopGeneratingWord();
  }
};

wss.on("connection", (ws) => {
  ws.on("close", handleConnectionClose);
  ws.on("message", handleMessage);
});

export default wsHttpServer;
